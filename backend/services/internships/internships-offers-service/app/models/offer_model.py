class InternshipOffer:
    def __init__(
        self,
        offer_id: str,
        title: str,
        company: str,
        description: str,
        hours: int,
        active: bool,
    ):
        self.id = offer_id
        self.title = title
        self.company = company
        self.description = description
        self.hours = hours
        self.active = active

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "title": self.title,
            "company": self.company,
            "description": self.description,
            "hours": self.hours,
            "active": self.active,
        }
