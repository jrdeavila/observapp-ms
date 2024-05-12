from contextlib import asynccontextmanager
from sqlalchemy import Engine
import uvicorn
import concurrent.futures
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, RedirectResponse

from core.application.exceptions.message_exception import MessageException
from core.application.services.background_task_service import BackgroundTaskService
from core.infrastructure.singleton.configure import configure_singleton
from api.features.load_data.routes import router as load_data_router
from core.infrastructure.singleton.container import SingletonContainer

# --------------------------- Variables ---------------------------
is_dev = True

# -----------------------------------------------------------------
# -------------------------- Life Cycle ---------------------------


@asynccontextmanager
async def lifespan(app: FastAPI):
    await configure_singleton()
    task_service = SingletonContainer.resolve(BackgroundTaskService)
    task_thread = concurrent.futures.ThreadPoolExecutor()
    task_thread.submit(task_service.run)
    yield
    task_service.stop()


# --------------------------- Main App ----------------------------

app = FastAPI(title="ObservApp Load Data API", lifespan=lifespan, root_path="/api/v1" )




# -----------------------------------------------------------------


# ------------------------- Middlewares ---------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------------------------------------

# ------------------------- Include Routers -----------------------


app.include_router(load_data_router)

@app.get("/")
async def api_v1():
    return {"message": "Welcome to Library Service API"}


# -----------------------------------------------------------------

# ------------------------- Exception Handlers --------------------


@app.exception_handler(MessageException)
async def message_exception_handler(request, exc: MessageException):
    return JSONResponse(
        status_code=exc.code,
        content={"name": exc.name, "message": exc.message},
    )


# -----------------------------------------------------------------


# ------------------------- Run Server ----------------------------
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=is_dev)
# -----------------------------------------------------------------
