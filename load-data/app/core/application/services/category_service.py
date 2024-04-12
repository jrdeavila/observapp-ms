from core.application.exceptions.message_exception import ResourceNotFound
from core.application.services.background_task_service import BackgroundTaskService
from core.application.services.cache_service import CacheService
from core.domain.entities.category import Category
from core.domain.repositories.category_repo import CategoryRepo
from core.domain.services.category_service import CategoryService


class CategoryServiceImpl(CategoryService):
    _category_repo: CategoryRepo
    _background_task_service: BackgroundTaskService
    _cache_service: CacheService

    def __init__(
        self,
        category_repo: CategoryRepo,
        background_task_service: BackgroundTaskService,
        cache_service: CacheService,
    ) -> None:
        self._category_repo = category_repo
        self._background_task_service = background_task_service
        self._cache_service = cache_service

    async def get_categories(self) -> list[Category]:
        items = await self._cache_service.get_collection_docs("categories", "all")
        if not items:
            items = await self._category_repo.get_categories()
            self.__refresh_cache__(items)
        else:
            self.__refresh_cache__([Category(**item) for item in items])
        return items

    async def get_category(self, category_id: int) -> Category:
        category = await self._cache_service.get_collection_doc(
            "categories", "all", f"{category_id}"
        )
        if not category:
            category = await self._category_repo.get_category(category_id)
        if not category:
            raise ResourceNotFound(message="Category Not Found")

        self.__refresh_cache_item__(category)

        return category

    def __refresh_cache__(self, items: list[Category]) -> None:
        data = [item.model_dump() for item in items]
        self._background_task_service.submit_task(self.__save_cache_categories__, data)

    async def __save_cache_categories__(self, items: list[dict]) -> None:
        await self._cache_service.save_collection_docs("categories", items, "all")

    def __refresh_cache_item__(self, item: Category) -> None:
        self._background_task_service.submit_task(self.__save_cache_category__, item)

    async def __save_cache_category__(self, item: Category) -> None:
        await self._cache_service.save_collection_doc(
            "categories", "all", item.id, item.model_dump()
        )
