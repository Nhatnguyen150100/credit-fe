import dayjs from "dayjs";
import * as React from "react";
import CommonElement from "../base/CommonElement";
import { formatCurrency } from "../../../../utils/format-money";
import { Button } from "antd";

const DEFINE_LIST_RESULTS = [
  {
    logo: "/cat-credit.jpg",
    listItems: [
      {
        id: 1,
        label: "Trạng thái",
        value: "Đang xem xét",
      },
      {
        id: 2,
        label: "Số tiền cần vay",
        value: formatCurrency(1500000),
      },
      {
        id: 3,
        label: "Thời gian xử lý",
        value: <span className="text-gray-500">{dayjs().format("YYYY-MM-DD HH:mm:ss")}</span>,
      },
    ],
  },
];

export default function Result() {
  return (
    <div className="w-screen flex flex-col justify-start items-start space-y-3 bg-gray-100">
      {DEFINE_LIST_RESULTS.map((item) => (
        <CommonElement logo={item.logo} listItem={item.listItems}/>
      ))}
    </div>
  );
}
