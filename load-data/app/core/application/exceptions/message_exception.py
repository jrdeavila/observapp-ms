class MessageException(Exception):
    def __init__(self, name: str, message: str, code: int):
        self.name = name
        self.message = message
        self.code = code

    def __str__(self):
        return f"{self.name}: {self.message}"

    def __dict__(self):
        return {
            "name": self.name,
            "message": self.message,
            "code": self.code,
        }


class ResourceNotFound(MessageException):
    def __init__(self, message: str = "Resource not found"):
        super().__init__("RESOURCE_NOT_FOUND", message, 404)
