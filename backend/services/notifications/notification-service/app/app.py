from flask import Flask, jsonify
from app.api.routes import bp
from app.websocket.socket import init_socketio


def create_app():
    app = Flask(__name__)

    # Register routes
    app.register_blueprint(bp)

    # Initialize WebSocket (safe)
    init_socketio(app)

    # Global error handlers (NO HTML)
    @app.errorhandler(Exception)
    def handle_exception(error):
        return jsonify({
            "error": "Internal server error",
            "message": str(error)
        }), 500

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000)
