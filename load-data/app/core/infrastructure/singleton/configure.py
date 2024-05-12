
import os
from core.application.services.background_task_service import BackgroundTaskService

from core.application.services.load_data_service import LoadDataServiceImpl
from core.domain.repositories.load_data_repo import ILoadDataRepo
from core.domain.services.load_data_service import ILoadDataService
from core.infrastructure.mongo.repositories.mongo_load_data_repo import MongoLoadDataRepo
from core.infrastructure.singleton.container import SingletonContainer
from pymongo.client_session import ClientSession
from pymongo.database import Database
from pymongo import MongoClient


async def configure_singleton():
    MONGO_URI = os.getenv("MONGO_URI")

    SingletonContainer.register(BackgroundTaskService, BackgroundTaskService())
    SingletonContainer.register(MongoClient, MongoClient(
        MONGO_URI,
    ))
    SingletonContainer.register(ClientSession, SingletonContainer.resolve(MongoClient).start_session())
    SingletonContainer.register(Database, SingletonContainer.resolve(MongoClient).get_database("load-data"))

    SingletonContainer.register(ILoadDataRepo, MongoLoadDataRepo(
        database=SingletonContainer.resolve(Database),
        session=SingletonContainer.resolve(ClientSession)
    ))

    SingletonContainer.register(ILoadDataService, LoadDataServiceImpl(
        repo=SingletonContainer.resolve(ILoadDataRepo),
        background_task_service=SingletonContainer.resolve(BackgroundTaskService)
    )) 

    print("Singletons configured")
