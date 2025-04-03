export enum EPermission {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  ALL_PERMISSION = "ALL_PERMISSION",
}

export enum ERole {
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export interface IAdmin {
  _id: string;
  userName: string;
  role: ERole;
  permissions: EPermission[];
}
