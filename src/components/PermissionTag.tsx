import React from "react";
import { Tag } from "antd";
import { EPermission } from "../types/admin";

interface PermissionTagProps {
  permission: EPermission;
}

const PermissionTag: React.FC<PermissionTagProps> = ({ permission }) => {
  const getColor = () => {
    switch (permission) {
      case EPermission.CREATE:
        return "green";
      case EPermission.UPDATE:
        return "orange";
      case EPermission.DELETE:
        return "red";
      default:
        return "default";
    }
  };

  const getLabel = () => {
    switch (permission) {
      case EPermission.CREATE:
        return "Tạo";
      case EPermission.UPDATE:
        return "Cập nhật";
      case EPermission.DELETE:
        return "Xóa";
      default:
        return permission;
    }
  };

  return (
    <Tag className="text-sm" key={permission} color={getColor()}>
      {getLabel()}
    </Tag>
  );
};

export default PermissionTag;
