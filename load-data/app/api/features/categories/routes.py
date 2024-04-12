from fastapi import APIRouter, Depends

from core.domain.entities.category import Category
from core.domain.services.category_service import CategoryService
from core.infrastructure.singleton.container import SingletonContainer


router = APIRouter(prefix="/categories", tags=["Categories"])


def get_category_service() -> CategoryService:
    return SingletonContainer.resolve(CategoryService)


@router.get("", response_model=list[Category])
async def get_categories(
    category_service: CategoryService = Depends(get_category_service),
):
    return await category_service.get_categories()


@router.get("/{category_id}", response_model=Category)
async def get_category(
    category_id: int,
    category_service: CategoryService = Depends(get_category_service),
):
    return await category_service.get_category(category_id)
