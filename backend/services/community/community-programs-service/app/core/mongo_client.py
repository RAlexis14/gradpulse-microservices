import os
from pymongo import MongoClient
from pymongo.errors import PyMongoError

_client = None

def get_mongo_collection():
    global _client

    uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
    db_name = os.getenv("MONGO_DB", "community_db")
    collection_name = os.getenv("MONGO_COLLECTION", "programs")

    try:
        if _client is None:
            _client = MongoClient(uri, serverSelectionTimeoutMS=3000)

        # Force connection check
        _client.server_info()

        return _client[db_name][collection_name]
    except PyMongoError:
        return None
