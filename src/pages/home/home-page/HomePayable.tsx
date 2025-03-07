import { Divider, message, Radio, Select } from "antd";
import { useState } from "react";
import { formatDate } from "../../../utils/day-format";
import { formatCurrency } from "../../../utils/format-money";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../lib/store";
import { setLoanAmount } from "../../../lib/reducer/loanApplicationSlice";
import DEFINE_ROUTER from "../../../constants/router-define";

const DEFINE_AMOUNT = [3500000, 5000000, 10000000];

export default function HomePayable() {
  const user = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch();
  const [payAmount, setPayAmount] = useState(DEFINE_AMOUNT[0]);
  const navigate = useNavigate();

  const DEFINE_INFO = [
    {
      label: "Thời gian nộp đơn",
      value: formatDate(new Date()),
    },
    {
      label: "Lãi xuất",
      value: formatCurrency(73973),
    },
    {
      label: "Phí dịch vụ",
      value: formatCurrency(0),
    },
    {
      label: "Số tiền phải trả",
      value: formatCurrency(payAmount + 73973),
    },
  ];

  const handleAccept = () => {
    if (!user?.phone_number) {
      message.error("Đăng nhập để nộp đơn vay");
      return;
    }
    if (user?.status !== "PAYED" && user?.status !== undefined) {
      message.error("Chỉ có thể nộp đơn vay khi đã trả khoản vay trước");
      return;
    }
    dispatch(setLoanAmount(payAmount));
    message.success("Nộp đơn vay thành công");
    navigate(DEFINE_ROUTER.paymentApplication);
  };

  return (
    <div className="flex flex-col justify-start items-start w-full space-y-3">
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col justify-start items-center">
          <span className="text-gray-500">Chọn số tiền cần vay</span>
          <Select
            className="w-full"
            bordered={false}
            value={payAmount}
            onChange={(value) => setPayAmount(value)}
            options={[
              {
                label: (
                  <span className="text-lg font-semibold text-center">
                    đ3,500,000
                  </span>
                ),
                value: DEFINE_AMOUNT[0],
              },
              {
                label: (
                  <span className="text-lg font-semibold">đ5,000,000</span>
                ),
                value: DEFINE_AMOUNT[1],
              },
              {
                label: (
                  <span className="text-lg font-semibold">đ10,000,000</span>
                ),
                value: DEFINE_AMOUNT[2],
              },
            ]}
          />
        </div>
        <Divider type="vertical" className="h-[50px]" />
        <div className="flex flex-col justify-start items-start">
          <span className="text-gray-500">Kì hạn vay(Ngày)</span>
          <span className="font-semibold">180</span>
        </div>
      </div>
      <div className="rounded-xl bg-white flex flex-col space-y-5 justify-start items-start w-full p-3">
        {DEFINE_INFO.map((item) => {
          return (
            <div className="border-b border-solid flex flex-row justify-between items-center pb-2 w-full">
              <label className="text-sm">{item.label}:</label>
              <span className="text-gray-500 text-sm">{item.value}</span>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row justify-start items-start w-full flex-nowrap">
        <Radio checked />
        <span>
          Tôi đã đọc và đồng ý với chính sách bản mật{" "}
          <Link to="/term" className="primary-color">
            (Chính sách bảo mật)
          </Link>
        </span>
      </div>
      <button
        className="primary-bg rounded-3xl p-3 text-center w-full flex justify-center item-center text-white"
        onClick={handleAccept}
      >
        Nộp đơn vay
      </button>
    </div>
  );
}
