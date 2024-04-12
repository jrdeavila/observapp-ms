from typing import Union
from pydantic import BaseModel, Field

from core.domain.entities.category import Category, SubCategory


class Document(BaseModel):
    id: int = Field(
        ...,
        title="Document ID",
        description="The unique identifier of the document",
    )
    title: str = Field(
        ...,
        title="Document Title",
        description="The title of the document",
    )
    description: str = Field(
        ...,
        title="Document Description",
        description="The description of the document",
    )
    source: str = Field(
        ...,
        title="Document Source",
        description="The source of the document",
    )
    status: str = Field(
        ...,
        title="Document Status",
        description="The status of the document",
    )

    quantity: int = Field(
        ...,
        title="Document Quantity",
        description="The quantity of the document",
    )

    subcategory: Union[SubCategory, None] = Field(
        ...,
        title="Document Subcategory",
        description="The subcategory of the document",
    )

    image: str = Field(
        ...,
        title="Document Image",
        description="The image of the document",
    )

    pdf: str = Field(
        ...,
        title="Document PDF",
        description="The PDF of the document",
    )
