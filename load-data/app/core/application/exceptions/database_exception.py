from core.application.exceptions.message_exception import MessageException, ResourceNotFound


class DatabaseAlreadyExistsException(MessageException):
  def __init__(self, name: str):
    super().__init__("DATABASE_ALREADY_EXISTS", f"Database {name} already exists", 400)

class DatabaseNotFoundException(ResourceNotFound):
  def __init__(self, name: str):
    super().__init__(message=f"Database {name} not found")
    