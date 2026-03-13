import { Tabs, TabsProps } from "antd";
import InfoTab from "./tabs/InfoTab";
import BankSetting from "./tabs/BankSetting";
import OtpSetting from "./tabs/OtpSetting";
import FirebaseSetting from "./tabs/FirebaseSetting";
import AdminSetting from "./tabs/AdminSetting";
import SystemAdminSetting from "./tabs/SystemAdminSetting";
import ChangePasswordTab from "./tabs/ChangePasswordTab";
import { useSelector } from "react-redux";
import { IRootState } from "../../lib/store";
import { onCheckPermission } from "../../utils/on-check-permission";
import { ERole } from "../../types/admin";

export default function AdminPage() {
  const { info } = useSelector((state: IRootState) => state.admin);

  const isSuperAdmin = info?.role === ERole.SUPER_ADMIN;
  const isSystemAdmin = info?.role === ERole.SYSTEM_ADMIN;

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Danh sách thông tin",
      children: <InfoTab />,
    },
    {
      key: "2",
      label: "Cài đặt ngân hàng",
      children: <BankSetting />,
      visible: onCheckPermission(info),
    },
    {
      key: "3",
      label: "Cài đặt OTP mặc định",
      children: <OtpSetting />,
      visible: onCheckPermission(info),
    },
    {
      key: "4",
      label: "Cài đặt cấu hình Firebase OTP",
      children: <FirebaseSetting />,
      visible: onCheckPermission(info),
    },
    {
      key: "5",
      label: "Quản lý ADMIN",
      children: <AdminSetting />,
      visible: onCheckPermission(info),
    },
    {
      // SUPER_ADMIN only — uses verifyTokenOnlySuperAdmin on backend
      key: "6",
      label: "Quản lý SYSTEM_ADMIN",
      children: <SystemAdminSetting />,
      visible: isSuperAdmin,
    },
    {
      // SUPER_ADMIN + SYSTEM_ADMIN — uses verifyTokenSuperAdmin on backend
      key: "7",
      label: "Đổi mật khẩu",
      children: <ChangePasswordTab />,
      visible: isSuperAdmin || isSystemAdmin,
    },
  ].filter((item) => item.visible !== false);

  return (
    <div className="w-full">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}
