import { EPermission, ERole, IAdmin } from "../types/admin";

export function onCheckPermission(user?: IAdmin, permission?: EPermission) {
  if (user?.role === ERole.SUPER_ADMIN) {
    return true;
  }
  if (!permission) {
    return false;
  }
  return user?.permissions.includes(permission);
}
