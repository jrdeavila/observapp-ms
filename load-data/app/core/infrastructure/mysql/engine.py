import os
from sqlalchemy import Engine, create_engine


def get_mysql_engine() -> Engine:

    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_HOST = os.getenv("DB_HOST")
    # DB_PORT = os.getenv("DB_PORT")
    DB_NAME = os.getenv("DB_NAME")
    engine = create_engine(
        f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
    )
    return engine
