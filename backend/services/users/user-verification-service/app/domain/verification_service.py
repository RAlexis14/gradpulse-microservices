class VerificationService:
    def __init__(self, repository):
        self.repository = repository

    def verify_user(self, user_id: int) -> dict:
        user = self.repository.get_user_by_id(user_id)

        if not user:
            return {
                "exists": False,
                "active": False,
                "role": None
            }

        return {
            "exists": True,
            "active": user["is_active"],
            "role": user["role"]
        }
