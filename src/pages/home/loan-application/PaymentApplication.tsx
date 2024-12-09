import { Tabs, TabsProps } from "antd";
import * as React from "react";
import Result from "./tabs/Result";
import Refund from "./tabs/Refund";
import Repayment from "./tabs/Repayment";
import { IInfo } from "../../../types/info";
import { useSelector } from "react-redux";
import { IRootState } from "../../../lib/store";
import axiosRequest from "../../../plugins/request";

export default function PaymentApplication() {
  const user = useSelector((state: IRootState) => state.user);
  const [userInfo, setUserInfo] = React.useState<IInfo>();

  const handleGetInfo = async () => {
    const rs = await axiosRequest.get(`/v1/information/${user?._id}`);
    const data = rs.data.data;
    setUserInfo(data);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <span className="text-xs">Đang đợi hoàn trả</span>,
      children: (
        <Refund
          userInfo={
            userInfo?.status !== "PAYED" && userInfo?._id ? userInfo : null
          }
        />
      ),
    },
    {
      key: "2",
      label: <span className="text-xs">Kết quả xét duyệt</span>,
      children: <Result />,
    },
    {
      key: "3",
      label: <span className="text-xs">Trả nợ thành công</span>,
      children: (
        <Repayment
          userInfo={
            userInfo?.status === "PAYED" && userInfo?._id ? userInfo : null
          }
        />
      ),
    },
  ];

  React.useEffect(() => {
    if (user?._id) handleGetInfo();
  }, [user?._id]);

  return (
    <div className="w-screen justify-center items-center flex flex-col sm:w-full overflow-y-auto sm:overflow-x-hidden">
      <h3 className="bg-white w-full text-center pt-3">Đơn vay</h3>
      <div className="w-full bg-transparent">
        <Tabs
          className="bg-white"
          centered
          defaultActiveKey="1"
          items={items}
        />
      </div>
    </div>
  );
}
