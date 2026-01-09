class OfferService:
    def __init__(self, repository):
        self.repository = repository

    def list_offers(self):
        return self.repository.find_all_active()

    def get_offer(self, offer_id: str):
        if not offer_id:
            return None
        return self.repository.find_by_id(offer_id)
