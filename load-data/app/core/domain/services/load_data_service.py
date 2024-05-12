class ILoadDataService:
   async def load(self, name: str, separator: str, data: bytes) -> dict:
      raise NotImplementedError() 
    
   async def get_databases(self) -> list[str]:
      raise NotImplementedError()
   
   async def get_database(self, name: str) -> list[dict]:
      raise NotImplementedError()
    
   async def delete_database(self, name: str) -> None:
      raise NotImplementedError()
    

