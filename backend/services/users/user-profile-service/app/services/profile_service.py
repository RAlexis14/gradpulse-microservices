class ProfileService:
    def __init__(self, repository):
        self.repository = repository

    def get_user_profile(self, user_id: int):
        if user_id <= 0:
            return None
        return self.repository.get_profile_by_id(user_id)
