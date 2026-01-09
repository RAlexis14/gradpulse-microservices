class CommunityProgram:
    def __init__(self, program_id: str, name: str, description: str, hours_required: int, active: bool):
        self.id = program_id
        self.name = name
        self.description = description
        self.hours_required = hours_required
        self.active = active

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "hours_required": self.hours_required,
            "active": self.active,
        }
