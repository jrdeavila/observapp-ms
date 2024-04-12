from typing import Union
from fastapi import APIRouter, Depends
from fastapi_pagination import Page, add_pagination, paginate, Params

from core.domain.entities.document import Document
from core.domain.services.document_service import DocumentService
from core.infrastructure.singleton.container import SingletonContainer
from fastapi_pagination.utils import disable_installed_extensions_check


router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


def get_document_service() -> DocumentService:
    return SingletonContainer.resolve(DocumentService)


@router.get("", response_model=Page[Document])
async def get_documents(
    query: Union[None, str] = None,
    document_service: DocumentService = Depends(get_document_service),
):
    return paginate(
        await document_service.get_documents(
            query=query,
        )
    )


disable_installed_extensions_check()
add_pagination(router)
