class ILoadDataRepo:
  async def load(self, name: str, data: list[dict]) -> None:
    raise NotImplementedError()
  
  async def get_databases(self) -> list[str]:
    raise NotImplementedError()
  
  async def get_database(self, name: str) -> list[dict]:
    raise NotImplementedError()
  
  async def exists_database(self, name: str) -> bool:
    raise NotImplementedError()
  
  async def delete_database(self, name: str) -> None:
    raise NotImplementedError()