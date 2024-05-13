from pydantic import BaseModel
from datetime import datetime


class DatabaseInfo(BaseModel):
  name: str
  records: int
  columns: int
  created_at: datetime