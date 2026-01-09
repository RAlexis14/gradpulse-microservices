import os
from pymongo import MongoClient


def get_mongo_client():
    uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
    return MongoClient(uri)
