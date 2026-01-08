class RoleService:
    def __init__(self, repository):
        self.repository = repository

    def create_role(self, role_name: str) -> bool:
        if not role_name:
            return False
        return self.repository.create_role(role_name)

    def assign_role(self, user_id: int, role_name: str) -> bool:
        if user_id <= 0 or not role_name:
            return False
        return self.repository.assign_role(user_id, role_name)

    def get_user_roles(self, user_id: int) -> list:
        if user_id <= 0:
            return []
        return self.repository.get_roles_by_user(user_id)
