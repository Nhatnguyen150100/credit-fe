import { Tabs, TabsProps } from "antd";
import * as React from "react";
import Result from "./tabs/Result";
import Refund from "./tabs/Refund";
import Repayment from "./tabs/Repayment";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: <span className="text-xs">Kết quả xét duyệt</span>,
    children: <Result />,
  },
  {
    key: "2",
    label: <span className="text-xs">Đang đợi hoàn trả</span>,
    children: <Refund />,
  },
  {
    key: "3",
    label: <span className="text-xs">Trả nợ thành công</span>,
    children: <Repayment />,
  },
];

export default function PaymentApplication() {
  return (
    <div className="w-screen justify-center items-center flex flex-col">
      <h3 className="bg-white w-full text-center pt-3">Đơn vay</h3>
      <div className="w-full bg-transparent">
        <Tabs className="bg-white" centered defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
}
