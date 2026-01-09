from pymongo.errors import PyMongoError
from app.core.mongo_client import get_mongo_client


class CourseRepository:
    def __init__(self):
        self.collection = None
        try:
            client = get_mongo_client()
            self.collection = client.languages.english_courses
        except Exception:
            self.collection = None

    def list_courses(self):
        """
        Returns a list of English courses.
        If MongoDB is not available, returns an empty list instead of failing.
        """
        if self.collection is None:
            return []

        try:
            return list(self.collection.find({}, {"_id": 0}))
        except PyMongoError:
            return []
