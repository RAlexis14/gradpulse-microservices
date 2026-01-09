import os
from pymongo import MongoClient
from pymongo.errors import PyMongoError


def get_collection():
    uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
    db_name = os.getenv("MONGO_DB", "internships")
    collection_name = os.getenv("MONGO_COLLECTION", "offers")

    try:
        client = MongoClient(uri, serverSelectionTimeoutMS=3000)
        client.server_info()  # fuerza conexión
        return client[db_name][collection_name]
    except PyMongoError:
        return None
