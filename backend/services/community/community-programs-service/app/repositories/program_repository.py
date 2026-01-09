from app.core.mongo_client import get_mongo_collection
from app.models.program_model import CommunityProgram


class ProgramRepository:
    def find_all(self):
        collection = get_mongo_collection()
        if not collection:
            return []

        programs = []
        for doc in collection.find({"active": True}):
            programs.append(
                CommunityProgram(
                    program_id=str(doc.get("_id")),
                    name=doc.get("name"),
                    description=doc.get("description"),
                    hours_required=doc.get("hours_required"),
                    active=doc.get("active", True),
                )
            )
        return programs

    def find_by_id(self, program_id: str):
        collection = get_mongo_collection()
        if not collection:
            return None

        doc = collection.find_one({"_id": program_id})
        if not doc:
            return None

        return CommunityProgram(
            program_id=str(doc.get("_id")),
            name=doc.get("name"),
            description=doc.get("description"),
            hours_required=doc.get("hours_required"),
            active=doc.get("active", True),
        )
