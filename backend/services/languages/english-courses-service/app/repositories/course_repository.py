from bson import ObjectId
from pymongo.errors import PyMongoError
from app.core.mongo_client import get_mongo_collection
from app.models.course_model import Course


class CourseRepository:
    def list_active(self, level: str | None = None):
        collection = get_mongo_collection()
        if collection is None:
            return []

        query = {"active": True}
        if level:
            query["level"] = level

        try:
            courses = []
            for doc in collection.find(query):
                courses.append(
                    Course(
                        course_id=str(doc.get("_id")),
                        name=doc.get("name", ""),
                        level=doc.get("level", ""),
                        schedule=doc.get("schedule", ""),
                        modality=doc.get("modality", ""),
                        duration_weeks=int(doc.get("duration_weeks", 0)),
                        hours_per_week=int(doc.get("hours_per_week", 0)),
                        active=bool(doc.get("active", True)),
                    )
                )
            return courses
        except PyMongoError:
            return []

    def find_by_id(self, course_id: str):
        collection = get_mongo_collection()
        if collection is None:
            return None

        try:
            # In Mongo, _id is ObjectId by default. We store as ObjectId in seed.
            doc = collection.find_one({"_id": ObjectId(course_id)})
            if not doc:
                return None

            return Course(
                course_id=str(doc.get("_id")),
                name=doc.get("name", ""),
                level=doc.get("level", ""),
                schedule=doc.get("schedule", ""),
                modality=doc.get("modality", ""),
                duration_weeks=int(doc.get("duration_weeks", 0)),
                hours_per_week=int(doc.get("hours_per_week", 0)),
                active=bool(doc.get("active", True)),
            )
        except Exception:
            # If course_id isn't valid ObjectId or any mongo error occurs
            return None
