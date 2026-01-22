from flask import Flask
from app.controllers.profile_controller import bp


def create_app() -> Flask:
    app = Flask(__name__)
    app.register_blueprint(bp)
    print(app.url_map)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000)
