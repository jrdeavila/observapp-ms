from typing import Union


class CacheService:
    async def get_collection_docs(self, collection_name: str, query: str) -> list[dict]:
        raise NotImplementedError()

    async def save_collection_docs(
        self, collection_name: str, docs: list[dict], query: str
    ) -> bool:
        raise NotImplementedError()

    async def get_collection_doc(
        self, collection_name: str, query: str, doc_id: str
    ) -> Union[dict, None]:
        raise NotImplementedError()

    async def save_collection_doc(
        self, collection_name: str, query: str, doc_id: str, doc: dict
    ) -> bool:
        raise NotImplementedError()
