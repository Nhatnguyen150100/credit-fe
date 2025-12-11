import { useState } from "react";
import { Tabs } from "antd";

import LoanStatus from "../profile/LoanStatus";
import NewLoanPending from "./NewLoanPending";

const tabItems = [
  { key: "loan", label: "Đang vay" },
  { key: "pending", label: "Đang duyệt" },
];

export default function LoanApplication() {
  const [activeKey, setActiveKey] = useState<string>("loan");

  const renderContent = () => {
    if (activeKey === "pending") {
      return <NewLoanPending />;
    }
    return <LoanStatus />;
  };

  const getBackgroundClass = () => {
    return activeKey === "loan" 
      ? "bg-account-theme-active-light" 
      : "bg-theme-orangish-light-ultra";
  };

  return (
    <div className={`flex h-full w-full ${getBackgroundClass()}`}>
      <div className="w-full">
        <div className="backdrop-blur">
          <div className="px-4 pt-4 pb-2">
            <p className="m-0 text-sm font-semibold text-theme-orangish-dark">Khoản vay của bạn</p>
            <p className="m-0 text-lg font-semibold text-text-color">Quản lý trạng thái</p>
            <p className="m-0 text-xs text-secondary-link">
              Xem nhanh khoản vay đang giải ngân hoặc đang chờ xét duyệt.
            </p>
          </div>
          <Tabs
            activeKey={activeKey}
            onChange={setActiveKey}
            items={tabItems.map((tab) => ({
              key: tab.key,
              label: (
                <span className="px-4 py-1 text-sm font-semibold">
                  {tab.label}
                </span>
              ),
            }))}
            tabBarGutter={8}
            className="px-2"
            animated
          />
        </div>

        <div className="pt-2 px-4 w-full pb-8">{renderContent()}</div>
      </div>
    </div>
  );
}

