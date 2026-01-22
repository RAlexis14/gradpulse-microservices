from flask import Flask
from app.controllers.course_controller import bp


def create_app() -> Flask:
    app = Flask(__name__)
    app.register_blueprint(bp)
    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
