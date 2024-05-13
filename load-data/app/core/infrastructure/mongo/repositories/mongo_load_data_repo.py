from core.domain.entities.database_info import DatabaseInfo
from core.domain.repositories.load_data_repo import ILoadDataRepo
from pymongo.database import Database
from pymongo.client_session import ClientSession


class MongoLoadDataRepo(ILoadDataRepo):
  _database: Database
  _session: ClientSession


  def __init__(self, database: Database, session: ClientSession):
    self._database = database
    self._session = session

  async def load(self, name: str, data: list[dict]) -> None:
    self._database.get_collection(name).insert_many(data, session=self._session)
  
  async def get_databases(self) -> list[DatabaseInfo]:
    collections = self._database.list_collections(
      session=self._session
    )

    return [
      DatabaseInfo(
        name=collection["name"],
        records=self._database.get_collection(collection["name"]).count_documents(
          {},
          session=self._session
        ),
        columns=len(
          [ key for key in self._database.get_collection(collection["name"]).find_one(
          {},
          session=self._session
        ).keys() if key != "_id"
            ]),
        created_at=self._database.get_collection(collection["name"]).find_one(
          {},
          session=self._session
        )["_id"].generation_time,
        
      ) for collection in collections
     ]
    
    
    
  async def get_database(self, name: str) -> list[dict]:
    docs = self._database.get_collection(name).find(
      session=self._session 
    )
    return [
      {
        **{key: doc[key] for key in doc if key != "_id"},
      } for doc in docs
    ]

    

  
  async def exists_database(self, name: str) -> bool:
    return name in self._database.list_collection_names(
      session=self._session
    )
  
  async def delete_database(self, name: str) -> None:
    self._database.drop_collection(name, session=self._session)
    