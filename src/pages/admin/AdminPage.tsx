import { Tabs, TabsProps } from "antd";
import InfoTab from "./tabs/InfoTab";
import BankSetting from "./tabs/BankSetting";
import OtpSetting from "./tabs/OtpSetting";
import FirebaseSetting from "./tabs/FirebaseSetting";
import { useSelector } from "react-redux";
import { IRootState } from "../../lib/store";
import { onCheckPermission } from "../../utils/on-check-permission";
import AdminSetting from "./tabs/AdminSetting";

export default function AdminPage() {
  const { info } = useSelector((state: IRootState) => state.admin);

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
      label: "Cài đặt danh sách ADMIN",
      children: <AdminSetting />,
      visible: onCheckPermission(info),
    },
  ].filter((item) => item.visible !== false);

  return (
    <div className="w-full">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}
