from typing import Union
from core.domain.entities.document import Document


class DocumentRepo:
    async def get_documents(
        self,
        query: Union[str, None] = None,
    ) -> list[Document]:
        raise NotImplementedError()
