from core.domain.entities.category import Category


class CategoryService:
    async def get_categories(self) -> list[Category]:
        raise NotImplementedError()

    async def get_category(self, category_id: int) -> Category:
        raise NotImplementedError()
