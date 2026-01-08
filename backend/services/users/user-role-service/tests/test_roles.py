from app.services.role_service import RoleService


class FakeRoleRepository:
    def __init__(self):
        self.roles = {}

    def create_role(self, role_name: str):
        self.roles[role_name] = []
        return True

    def assign_role(self, user_id: int, role_name: str):
        self.roles.setdefault(role_name, []).append(user_id)
        return True

    def get_roles_by_user(self, user_id: int):
        return ["admin"] if user_id == 1 else []


def test_create_role():
    service = RoleService(FakeRoleRepository())
    assert service.create_role("admin") is True


def test_assign_role():
    service = RoleService(FakeRoleRepository())
    assert service.assign_role(1, "admin") is True


def test_get_roles():
    service = RoleService(FakeRoleRepository())
    roles = service.get_user_roles(1)
    assert "admin" in roles
