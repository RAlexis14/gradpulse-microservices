from flask import Flask, jsonify
from app.api.routes import bp

def create_app() -> Flask:
    app = Flask(__name__)
    app.register_blueprint(bp)

    @app.errorhandler(Exception)
    def handle_exception(e):
        return jsonify({"error": "Internal server error"}), 500

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000)
