import asyncio
import concurrent.futures
import os

from redis import Redis
from sqlalchemy import Engine

from core.application.services.background_task_service import BackgroundTaskService
from core.application.services.cache_service import CacheService
from core.application.services.category_service import CategoryServiceImpl
from core.application.services.document_service import DocumentServiceImpl
from core.domain.repositories.category_repo import CategoryRepo
from core.domain.repositories.document_repo import DocumentRepo
from core.domain.services.category_service import CategoryService
from core.domain.services.document_service import DocumentService
from core.infrastructure.mysql.engine import get_mysql_engine
from core.infrastructure.mysql.repositories.mysql_category_repo import MySQLCategoryRepo
from core.infrastructure.mysql.repositories.mysql_document_repo import MySQLDocumentRepo
from core.infrastructure.redis.services.redis_cache_service import RedisCacheService
from core.infrastructure.singleton.container import SingletonContainer


async def configure_singleton():

    SingletonContainer.register(BackgroundTaskService, BackgroundTaskService())

    SingletonContainer.register(
        Redis,
        Redis(
            host=os.getenv("REDIS_HOST", "localhost"),
            port=os.getenv("REDIS_PORT", 6379),
        ),
    )
    SingletonContainer.register(
        CacheService,
        RedisCacheService(SingletonContainer.resolve(Redis)),
    )

    SingletonContainer.register(Engine, get_mysql_engine())
    SingletonContainer.register(
        CategoryRepo, MySQLCategoryRepo(SingletonContainer.resolve(Engine))
    )
    SingletonContainer.register(
        CategoryService,
        CategoryServiceImpl(
            category_repo=SingletonContainer.resolve(CategoryRepo),
            background_task_service=SingletonContainer.resolve(BackgroundTaskService),
            cache_service=SingletonContainer.resolve(CacheService),
        ),
    )
    SingletonContainer.register(
        DocumentRepo, MySQLDocumentRepo(SingletonContainer.resolve(Engine))
    )
    SingletonContainer.register(
        DocumentService,
        DocumentServiceImpl(
            document_repo=SingletonContainer.resolve(DocumentRepo),
            cache_service=SingletonContainer.resolve(CacheService),
            background_task_service=SingletonContainer.resolve(BackgroundTaskService),
        ),
    )

    print("Singletons configured")
