class NotificationRepository:
    _memory_store = []

    def __init__(self):
        self.collection = None

        try:
            from pymongo import MongoClient
            client = MongoClient(
                "mongodb://localhost:27017",
                serverSelectionTimeoutMS=2000
            )
            db = client["notifications"]
            self.collection = db["alerts"]
        except Exception:
            self.collection = None

    def save(self, notification: dict) -> None:
        if self.collection is not None:
            try:
                # Insert without returning Mongo ObjectId
                self.collection.insert_one(notification)
                return
            except Exception:
                pass

        self._memory_store.append(notification)

    def list_all(self) -> list:
        if self.collection is not None:
            try:
                # 🔑 CLAVE: excluir _id
                return list(self.collection.find({}, {"_id": 0}))
            except Exception:
                pass

        return self._memory_store
