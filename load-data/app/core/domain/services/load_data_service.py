from core.domain.entities.database_info import DatabaseInfo


class ILoadDataService:
   async def load(self, name: str, separator: str, data: bytes) -> dict:
      raise NotImplementedError() 
    
   async def get_databases(self) -> list[DatabaseInfo]:
      raise NotImplementedError()
   
   async def get_database(self, name: str) -> list[dict]:
      raise NotImplementedError()
    
   async def delete_database(self, name: str) -> None:
      raise NotImplementedError()
    

