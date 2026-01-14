# WebSocket gateway (best-effort, non-blocking)

from flask_socketio import SocketIO

socketio: SocketIO | None = None


def init_socketio(app):
    global socketio
    socketio = SocketIO(app, cors_allowed_origins="*")
    return socketio


def notify_clients(notification: dict) -> None:
    # Do nothing if SocketIO is not initialized (tests, CI, etc.)
    if socketio is None:
        return

    try:
        socketio.emit("notification", notification)
    except Exception:
        # Never fail business logic due to websocket issues
        pass
