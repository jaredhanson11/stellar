import typing


class SuessException(Exception):
    def __init__(self, code: int = 500, message: typing.Optional[str] = None):
        self.code = code
        self.message = message
        super().__init__(message)

    def __repr__(self):
        return f"SuessException(code={self.code}, message={self.message})"
