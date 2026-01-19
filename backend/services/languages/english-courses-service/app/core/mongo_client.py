import os
from pymongo import MongoClient
from pymongo.errors import PyMongoError


def get_mongo_collection():
    uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
    db_name = os.getenv("MONGO_DB", "languages_db")
    collection_name = os.getenv("MONGO_COLLECTION", "english_courses")
    timeout_ms = int(os.getenv("MONGO_TIMEOUT_MS", "3000"))

    try:
        client = MongoClient(uri, serverSelectionTimeoutMS=timeout_ms)
        client.server_info()  # Forces connection test
        return client[db_name][collection_name]
    except PyMongoError:
        return None
