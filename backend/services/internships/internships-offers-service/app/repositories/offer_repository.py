from app.core.mongo_client import get_collection
from app.models.offer_model import InternshipOffer


class OfferRepository:
    def find_all_active(self):
        collection = get_collection()
        if collection is None:
            return []

        offers = []
        for doc in collection.find({"active": True}):
            offers.append(
                InternshipOffer(
                    offer_id=str(doc.get("_id")),
                    title=doc.get("title"),
                    company=doc.get("company"),
                    description=doc.get("description"),
                    hours=doc.get("hours"),
                    active=doc.get("active", True),
                )
            )
        return offers

    def find_by_id(self, offer_id: str):
        collection = get_collection()
        if collection is None:
            return None

        doc = collection.find_one({"_id": offer_id})
        if not doc:
            return None

        return InternshipOffer(
            offer_id=str(doc.get("_id")),
            title=doc.get("title"),
            company=doc.get("company"),
            description=doc.get("description"),
            hours=doc.get("hours"),
            active=doc.get("active", True),
        )
