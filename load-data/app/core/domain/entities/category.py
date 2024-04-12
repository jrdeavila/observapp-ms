from typing import List
from pydantic import BaseModel, Field


class SubCategory(BaseModel):
    id: int = Field(
        ...,
        title="SubCategory ID",
        description="The ID of the subcategory",
    )
    name: str = Field(
        ..., title="SubCategory Name", description="The name of the subcategory"
    )
    code: str = Field(
        ..., title="SubCategory Code", description="The code of the subcategory"
    )

    category_id: int = Field(
        ...,
        title="Category ID",
        description="The ID of the category",
    )

    @classmethod
    def empty(cls) -> "SubCategory":
        return cls(id=0, name="No asignado", code="NA", category_id=0)


class Category(BaseModel):
    id: int = Field(
        ...,
        title="Category ID",
        description="The ID of the category",
    )
    name: str = Field(
        ..., title="Category Name", description="The name of the category"
    )
    code: str = Field(
        ..., title="Category Code", description="The code of the category"
    )

    subcategories: List[SubCategory]
