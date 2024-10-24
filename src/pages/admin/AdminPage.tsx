import { Tabs, TabsProps } from "antd";
import InfoTab from "./tabs/InfoTab";
import BankSetting from "./tabs/BankSetting";

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
  ];

  return <div className="w-full">
    <Tabs defaultActiveKey="1" items={items}/>
  </div>
}
