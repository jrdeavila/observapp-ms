from core.application.exceptions.database_exception import DatabaseAlreadyExistsException, DatabaseNotFoundException
from core.application.services.background_task_service import BackgroundTaskService
from core.domain.repositories.load_data_repo import ILoadDataRepo
from core.domain.services.load_data_service import ILoadDataService
from pymongo.client_session import ClientSession
from pymongo.database import Database
import pandas as pd
import io


class LoadDataServiceImpl(ILoadDataService):
  _repo: ILoadDataRepo
  _background_task_service: BackgroundTaskService


  def __init__(self, repo: ILoadDataRepo, background_task_service: BackgroundTaskService):
    self._background_task_service = background_task_service
    self._repo = repo

  async def load(self, name: str, separator: str, data: bytes) -> dict:
    str_obj = io.StringIO(data.decode('utf-8'))
    df = pd.read_csv(str_obj, encoding='utf-8', delimiter=separator)
    records = df.to_dict(orient='records')
    self._background_task_service.submit_task(self.__load_data__, name, records)
    return {
      "message": "Data has been loaded successfully.",
    }
  
  async def get_databases(self) -> list[str]:
    return await self._repo.get_databases()
  
  async def get_database(self, name: str) -> list[dict]:
    return await self._repo.get_database(name)
  
  async def delete_database(self, name: str) -> None:
    exist = await self._repo.exists_database(name)
    if not exist:
      raise DatabaseNotFoundException(name)
    await self._repo.delete_database(name)
    
  
  
  async def __load_data__(self, name: str, data: list[dict]) -> None:
    exist = await self._repo.exists_database(name)
    if exist:
      raise DatabaseAlreadyExistsException(name)
    await self._repo.load(name, data)
  
    