import dayjs from "dayjs";
import CommonElement from "../base/CommonElement";
import { formatCurrency } from "../../../../utils/format-money";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../lib/store";
import Visibility from "../../../../components/visibility";
import { Empty } from "antd";

export default function Result() {
  const loanApplication = useSelector(
    (state: IRootState) => state.loanApplication
  );
  const DEFINE_LIST_RESULTS = [
    {
      logo: "/vaycash.jpg",
      listItems: [
        {
          id: 1,
          label: "Trạng thái",
          value: "Đang xem xét",
        },
        {
          id: 2,
          label: "Số tiền cần vay",
          value: formatCurrency(loanApplication.loanAmount ?? 0),
        },
        {
          id: 3,
          label: "Thời gian xử lý",
          value: (
            <span className="text-gray-500">
              {dayjs().format("YYYY-MM-DD HH:mm:ss")}
            </span>
          ),
        },
      ],
    },
  ];

  return (
    <div className="w-screen flex flex-col justify-start items-center space-y-3 bg-gray-100 sm:w-full">
      <Visibility
        visibility={loanApplication.loanAmount}
        suspenseComponent={<Empty description="Không có dữ liệu" />}
      >
        {DEFINE_LIST_RESULTS.map((item, index) => (
          <CommonElement key={index} logo={item.logo} listItem={item.listItems} />
        ))}
      </Visibility>
    </div>
  );
}
