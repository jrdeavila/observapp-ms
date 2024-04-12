from typing import Union
from core.domain.entities.category import Category


class CategoryRepo:
    async def get_category(self, category_id: int) -> Union[Category, None]:
        raise NotImplementedError("Method not implemented")

    async def get_categories(self) -> list[Category]:
        raise NotImplementedError("Method not implemented")
