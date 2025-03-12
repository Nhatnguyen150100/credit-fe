import { Tabs, TabsProps } from "antd";
import InfoTab from "./tabs/InfoTab";
import BankSetting from "./tabs/BankSetting";
import OtpSetting from "./tabs/OtpSetting";
import FirebaseSetting from "./tabs/FirebaseSetting";

export default function AdminPage() {
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
    },
    {
      key: "3",
      label: "Cài đặt OTP mặc định",
      children: <OtpSetting />,
    },
    {
      key: "4",
      label: "Cài đặt cấu hình Firebase OTP",
      children: <FirebaseSetting />,
    },
  ];

  return <div className="w-full">
    <Tabs defaultActiveKey="1" items={items}/>
  </div>
}
