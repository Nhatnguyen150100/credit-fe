import { PhoneOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DEFINE_ROUTER from "../../../constants/router-define";
import { useSelector } from "react-redux";
import { IRootState } from "../../../lib/store";

export default function PhoneNumberSection() {
  const router = useNavigate();
  const user = useSelector((state: IRootState) => state.user);
  const isLoggedIn = Boolean(user?._id || user?.phone_number);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 10) {
      setPhoneNumber(numericValue);
    }
  };

  const handleLogin = () => {
    router(DEFINE_ROUTER.login, {
      state: {
        phoneNumber,
      },
    });
  };

  if(isLoggedIn) return null;

  return (
    <section className="w-full rounded-2xl mt-5 flex flex-col space-y-4">
      <div className="flex w-full items-center justify-between rounded-2xl bg-[#f0f7fb] px-4 py-2.5 shadow-sm">
        <div className="flex flex-col flex-1 text-[11px] mr-2">
          <span className="text-gray-400">Số điện thoại</span>
          <Input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder="0XX XXX XXXX"
            maxLength={10}
            className="mt-[2px] text-[13px] font-semibold text-[#20273A] border-none bg-transparent p-0 h-auto focus:shadow-none placeholder:text-gray-400 focus:bg-transparent"
            styles={{
              input: {
                fontSize: "13px",
                fontWeight: 600,
                color: "#20273A",
                padding: 0,
              },
            }}
          />
        </div>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F2B600] text-white flex-shrink-0">
          <PhoneOutlined className="text-sm" />
        </button>
      </div>
      <p className="rounded-lg bg-[#FFF0F0] px-3 py-2 text-[10px] leading-relaxed text-[#E45858]">
        Vui lòng sử dụng số điện thoại chính chủ, trùng với số điện thoại đăng
        ký tài khoản ngân hàng để quy trình xét duyệt diễn ra nhanh chóng và
        chính xác.
      </p>

      <button className="w-full rounded-full bg-primary-color-dark text-white py-3 h-12 flex items-center justify-center flex-shrink-0" onClick={handleLogin}>
        <span className="text-base font-semibold">
          Đăng nhập ngay
        </span>
      </button>
    </section>
  );
}
