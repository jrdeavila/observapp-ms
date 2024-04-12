import sys
from core.application.services.background_task_service import BackgroundTaskService
from core.application.services.cache_service import CacheService
from core.domain.entities.document import Document
from core.domain.repositories.document_repo import DocumentRepo
from core.domain.services.document_service import DocumentService


class DocumentServiceImpl(DocumentService):
    _document_repo: DocumentRepo
    _cache_service: CacheService
    _background_task_service: BackgroundTaskService

    def __init__(
        self,
        document_repo: DocumentRepo,
        cache_service: CacheService,
        background_task_service: BackgroundTaskService,
    ) -> None:
        self._document_repo = document_repo
        self._cache_service = cache_service
        self._background_task_service = background_task_service

    async def get_documents(self, query: str | None = None) -> list[Document]:
        items = await self._cache_service.get_collection_docs(
            "documents", query if query else "all"
        )
        if not items:
            items = await self._document_repo.get_documents(query)
            self.__refresh_cache__(items, query)
        else:
            self.__compare_cache__([Document(**item) for item in items], query)
        return items

    def __compare_cache__(self, items: list[Document], query: str | None) -> bool:
        self._background_task_service.submit_task(
            self.__compare_cache_documents__, items, query
        )

    async def __compare_cache_documents__(
        self, items: list[Document], query: str | None
    ) -> None:
        db_items = await self._document_repo.get_documents(query)
        for item in items:
            if item not in db_items:
                self.__refresh_cache__(db_items, query)
                break

    def __refresh_cache__(self, items: list[Document], query: str | None) -> None:
        data = [item.model_dump() for item in items]
        self._background_task_service.submit_task(
            self.__save_cache_documents__, data, query
        )

    async def __save_cache_documents__(
        self, items: list[dict], query: str | None
    ) -> None:
        await self._cache_service.save_collection_docs(
            "documents", items, query if query else "all"
        )
