from sqlalchemy import Engine, select
from sqlalchemy.orm import Session

from core.domain.entities.category import Category
from core.domain.repositories.category_repo import CategoryRepo
from core.infrastructure.mysql.models.mysql_category import (
    MySQLCategoryModel,
)


class MySQLCategoryRepo(CategoryRepo):
    _engine: Engine

    def __init__(self, engine: Engine) -> None:
        self._engine = engine

    async def get_categories(self) -> list[Category]:
        session = Session(self._engine)
        stmt = select(MySQLCategoryModel)
        items = session.scalars(stmt)
        return [item.to_category() for item in items]

    async def get_category(self, category_id: int) -> Category | None:
        session = Session(self._engine)
        stmt = select(MySQLCategoryModel).where(MySQLCategoryModel.id == category_id)
        item = session.scalar(stmt)
        return item.to_category() if item else None
