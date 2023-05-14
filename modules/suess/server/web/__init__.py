"""
Setup Flask objects.
"""
from typing import Dict
from uuid import UUID

from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from marshmallow import EXCLUDE
from webargs.flaskparser import abort, parser
from werkzeug.routing import BaseConverter, ValidationError

from . import exceptions, responses
from .controllers.heartbeat import HeartbeatController
from .exceptions import SuessException
from .jwt_auth import JWTManager


def create_app(name) -> Flask:
    """Initiliaze Flask app object with configs"""
    app = Flask(__name__)
    app.config.from_envvar("APP_CONFIG")

    app.url_map.converters["uuid"] = UUIDPathConverter

    return app


def create_db(app) -> SQLAlchemy:
    """Initialize Flask-SQLAlchemy db object"""
    db = SQLAlchemy(app)
    return db


def create_api(app: Flask) -> Api:
    """
    Initialize Flask-RESTful api object
    Adds common controllers to api object.
    """
    api = Api(app)
    api.add_resource(HeartbeatController, "/api/hb")
    return api


def create_jwt(app: Flask) -> JWTManager:
    """
    Initialized JWTManager object from jwt_auth.JWTManager.
    """
    jwt = JWTManager(app)
    return jwt


def setup_cors(app: Flask) -> None:
    """
    Setup flask app with proper CORS logic.
    Requires config option: CORS_ALLOW_ORIGINS
    """
    CORS(
        app, supports_credentials=True, origins=app.config.get("CORS_ALLOW_ORIGINS", [])
    )


def setup_webargs() -> None:
    """
    Setup webargs parser object with some default options
    """

    @parser.error_handler
    def handle_request_parsing_error(
        err, req, schema, *, error_status_code, error_headers
    ):
        status_code = error_status_code or 400
        abort(status_code, errors=err.messages)

    parser.DEFAULT_UNKNOWN_BY_LOCATION.update({"json": EXCLUDE})


def setup_exception_handling(
    api: Api, err_code_to_status_code: Dict[int, int] = {}
) -> None:
    """
    Register exeption handler that listens for Summ exceptions
        and send responses in json.
    """
    original_handle = api.handle_error

    def handle(e: Exception):
        if isinstance(e, SuessException):
            return responses.error(e.message, e.code, e.code)
        else:
            return original_handle(e)

    api.handle_error = handle


class UUIDPathConverter(BaseConverter):
    """This should move to summ-web"""

    def to_python(self, value):
        try:
            return UUID(value)
        except ValueError:
            raise ValidationError("UUID not valid")

    def to_url(self, value):
        return super().to_url(str(value))
