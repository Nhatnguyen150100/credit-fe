import { Divider, message, Slider } from "antd";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../lib/store";
import { setLoanAmount } from "../../../lib/reducer/loanApplicationSlice";
import { useNavigate } from "react-router-dom";
import DEFINE_ROUTER from "../../../constants/router-define";

export default function LoanSection() {
  const user = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = React.useState(2000000);
  const [day, setDay] = React.useState(180);

  const DEFINE_AMOUNT = [
    {
      label: "2000K",
      value: 2000000,
    },
    {
      label: "6500K",
      value: 6500000,
    },
    {
      label: "11000K",
      value: 11000000,
    },
    {
      label: "15500K",
      value: 15500000,
    },
    {
      label: "20000K",
      value: 20000000,
    },
  ];

  const listAmount = (
    <div className="w-full flex flex-row justify-between items-center">
      {DEFINE_AMOUNT.map((item, index) => (
        <div
          key={index}
          className={`text-base text-green-700 ${
            count === item.value && "font-semibold"
          }`}
          onClick={() => setCount(item.value)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );

  const onChange = (value: number | number[]) => {
    switch (value) {
      case 0:
        setCount(2000000);
        break;
      case 10:
        setCount(6500000);
        break;
      case 20:
        setCount(11000000);
        break;
      case 30:
        setCount(15500000);
        break;
      case 40:
        setCount(20000000);
        break;
      default:
        break;
    }
  };

  const valueSlide = React.useMemo(() => {
    switch (count) {
      case 2000000:
        return 0;
      case 6500000:
        return 10;
      case 11000000:
        return 20;
      case 15500000:
        return 30;
      case 20000000:
        return 40;
      default:
        return 0;
    }
  }, [count]);

  const handleAccept = () => {
    if (!user?.phone_number) {
      message.error("Đăng nhập để nộp đơn vay");
      return;
    }
    if (user?.status !== "PAYED" && user?.status !== undefined) {
      message.error("Chỉ có thể nộp đơn vay khi đã trả khoản vay trước");
      return;
    }
    dispatch(setLoanAmount(count));
    message.success("Nộp đơn vay thành công");
    navigate(DEFINE_ROUTER.paymentApplication);
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen md:w-full">
      <div className="w-[93vw] md:w-[400px] bg-white rounded-lg shadow relative flex flex-col justify-start items-center px-3 pb-3">
        <img className="absolute top-0 h-[20px]" src="/bg-loan-app.png" />
        <span className="z-10 text-[13px]">Số tiền vay</span>
        <span className="text-4xl text-center font-normal lato-light mt-8">
          {count.toLocaleString()}
        </span>
        <Slider
          className="w-full mt-8"
          styles={{
            track: {
              background: "green",
            },
            tracks: {
              background: "green",
            },
            rail: {
              background: "gray",
              opacity: "20%",
              height: "4px",
              accentColor: "green",
            },
            handle: {
              color: "green",
              background: "green",
              borderColor: "green",
            },
          }}
          value={valueSlide}
          tooltip={{
            open: false,
          }}
          step={10}
          max={40}
          min={0}
          onChange={onChange}
        />
        {listAmount}
        <Divider />
        <div className="flex flex-row justify-between w-full items-center">
          <span className="text-base text-gray-600">Số ngày vay</span>
          <div className="flex flex-row justify-center items-center space-x-3">
            <button
              className={`text-sm text-gray-400 px-5 py-1 border border-solid border-gray-500 rounded-2xl border-opacity-25 ${
                day === 180 && "bg-green-700 !border-none !text-white"
              }`}
              onClick={() => {
                setDay(180);
              }}
            >
              180 ngày
            </button>
            <button
              className={`text-sm text-gray-400 px-5 py-1 border border-solid border-gray-500 rounded-2xl border-opacity-25 ${
                day === 360 && "bg-green-700 !border-none !text-white"
              }`}
              onClick={() => {
                setDay(360);
              }}
            >
              360 ngày
            </button>
          </div>
        </div>
      </div>

      <button className="w-[93vw] md:w-[400px] py-3 text-white text-center bg-green-700 rounded-3xl mt-5" onClick={handleAccept}>
        Gửi yêu cầu
      </button>
    </div>
  );
}
