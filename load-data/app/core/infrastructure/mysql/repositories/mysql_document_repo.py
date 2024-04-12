from sqlalchemy import Engine, select
from sqlalchemy.orm import Session
from core.domain.entities.document import Document
from core.domain.repositories.document_repo import DocumentRepo
from core.infrastructure.mysql.models.mysql_document import MySQLDocumentModel


class MySQLDocumentRepo(DocumentRepo):
    _engine: Engine

    def __init__(self, engine: Engine) -> None:
        self._engine = engine

    async def get_documents(self, query: str | None = None) -> list[Document]:
        session = Session(self._engine)
        stmt = (
            select(MySQLDocumentModel)
            .where(MySQLDocumentModel.type == "VIRTUAL")
            .where(MySQLDocumentModel.status != "ELIMINADO")
            .where(MySQLDocumentModel.subcategory_id != None)
            .where(MySQLDocumentModel.title.like(f"%{query}%") if query else True)
            .order_by(MySQLDocumentModel.id.desc())
        )
        items = session.scalars(stmt)
        return [item.to_document() for item in items]
