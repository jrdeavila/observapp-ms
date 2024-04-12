from typing import List
from core.domain.entities.category import Category, SubCategory
from core.infrastructure.mysql.models.mysql_base import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, String


class MySQLCategoryModel(Base):
    __tablename__ = "categoria"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30), name="nombre")
    code: Mapped[str] = mapped_column(String(10), name="codigo")
    subcategories: Mapped[List["MySQLSubCategoryModel"]] = relationship(
        "MySQLSubCategoryModel",
    )

    def __repr__(self) -> str:
        return f"MySQLCategoryModel(id={self.id!r}, name={self.name!r}, code={self.code!r})"

    def to_category(self) -> "Category":
        return to_category(self)


class MySQLSubCategoryModel(Base):
    __tablename__ = "subcategoria"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30), name="nombre")
    code: Mapped[str] = mapped_column(String(10), name="codigo")
    category_id: Mapped[int] = mapped_column(
        ForeignKey(
            "categoria.id",
        ),
        name="idcategoria",
    )

    def __repr__(self) -> str:
        return f"MySQLSubCategoryModel(id={self.id!r}, name={self.name!r}, code={self.code!r}, category_id={self.category_id!r})"

    def to_subcategory(self) -> "SubCategory":
        return to_subcategory(self)


def to_subcategory(model: MySQLSubCategoryModel) -> SubCategory:
    return SubCategory(
        id=model.id,
        name=model.name,
        code=model.code,
        category_id=model.category_id,
    )


def to_category(model: MySQLCategoryModel) -> Category:
    return Category(
        id=model.id,
        name=model.name,
        code=model.code,
        subcategories=[item.to_subcategory() for item in model.subcategories],
    )
