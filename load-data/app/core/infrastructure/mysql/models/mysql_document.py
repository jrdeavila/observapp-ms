from sqlalchemy import ForeignKey, String
from core.domain.entities.category import SubCategory
from core.domain.entities.document import Document
from core.infrastructure.mysql.models.mysql_base import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.infrastructure.mysql.models.mysql_category import (
    MySQLSubCategoryModel,
)


class MySQLDocumentModel(Base):
    __tablename__ = "documentos"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(100), name="nombre")
    description: Mapped[str] = mapped_column(String(255), name="descripcion")
    source: Mapped[str] = mapped_column(String(100), name="fuente")
    status: Mapped[str] = mapped_column(String(20), name="estado")
    quantity: Mapped[int] = mapped_column(name="cantidad")
    type: Mapped[str] = mapped_column(String(20), name="tipo")
    status: Mapped[str] = mapped_column(String(20), name="estado")
    image: Mapped[str] = mapped_column(String(255), name="imagen")
    pdf: Mapped[str] = mapped_column(String(255), name="url")

    subcategory_id: Mapped[int] = mapped_column(
        ForeignKey("subcategoria.id"), name="idsubcategoria"
    )

    foreign_subcategory_model: Mapped["MySQLSubCategoryModel"] = relationship(
        "MySQLSubCategoryModel",
        foreign_keys=[subcategory_id],
    )

    def __repr__(self) -> str:
        return f"MySQLDocumentModel(id={self.id!r}, title={self.title!r}, description={self.description!r}, source={self.source!r}, status={self.status!r}, quantity={self.quantity!r}, isbn={self.isbn!r})"

    def to_document(self) -> "Document":
        return to_document(self)


def to_document(model: MySQLDocumentModel) -> Document:
    return Document(
        id=model.id,
        title=model.title,
        description=model.description,
        source=model.source,
        status=model.status,
        quantity=model.quantity,
        image=model.image,
        pdf=model.pdf,
        subcategory=(
            model.foreign_subcategory_model.to_subcategory()
            if model.foreign_subcategory_model
            else SubCategory.empty()
        ),
    )
