from . import web

app = web.create_app(__name__)
web.setup_cors(app)
db = web.create_db(app)
api = web.create_api(app)
web.setup_webargs()
jwt = web.create_jwt(app)
web.setup_exception_handling(api)

from . import controllers
