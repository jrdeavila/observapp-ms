from typing import Annotated
from fastapi import APIRouter, Depends, File, Form, UploadFile
from core.domain.services.load_data_service import ILoadDataService
from core.infrastructure.singleton.container import SingletonContainer


router = APIRouter(
  prefix="/load-data"
)


def get_load_data_service() -> ILoadDataService:
  return SingletonContainer.resolve(ILoadDataService)


@router.get("/", response_model=list[str])
async def get_load_data(
  load_data_service: ILoadDataService = Depends(get_load_data_service),
):
  return await load_data_service.get_databases()


@router.post("/", status_code=201, response_model=dict)
async def send_load_data(
  name: str = Form(...),
  separator: str = Form(...),
  file: UploadFile = File(...),
  load_data_service: ILoadDataService = Depends(get_load_data_service),
):
  return await load_data_service.load(name, separator, await file.read());
  
@router.get("/{name}", response_model= list[dict])
async def get_database(
  name: str,
  load_data_service: ILoadDataService = Depends(get_load_data_service),
):
  return await load_data_service.get_database(name)


@router.delete("/{name}", status_code=204)
async def delete_database(
  name: str,
  load_data_service: ILoadDataService = Depends(get_load_data_service),
):
  await load_data_service.delete_database(name)
  return None