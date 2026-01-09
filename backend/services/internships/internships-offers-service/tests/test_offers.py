from app.services.offer_service import OfferService
from app.models.offer_model import InternshipOffer


class FakeOfferRepository:
    def find_all_active(self):
        return [
            InternshipOffer("1", "Backend Intern", "TechCorp", "API development", 240, True),
            InternshipOffer("2", "Frontend Intern", "WebStudio", "UI development", 200, True),
        ]

    def find_by_id(self, offer_id: str):
        if offer_id == "1":
            return InternshipOffer("1", "Backend Intern", "TechCorp", "API development", 240, True)
        return None


def test_list_offers():
    service = OfferService(FakeOfferRepository())
    offers = service.list_offers()
    assert len(offers) == 2


def test_get_offer_found():
    service = OfferService(FakeOfferRepository())
    offer = service.get_offer("1")
    assert offer.title == "Backend Intern"


def test_get_offer_not_found():
    service = OfferService(FakeOfferRepository())
    assert service.get_offer("99") is None
