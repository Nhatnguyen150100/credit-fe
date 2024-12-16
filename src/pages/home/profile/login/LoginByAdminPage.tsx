import { Button, message } from "antd";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import axiosRequest from "../../../../plugins/request";
import DEFINE_ROUTER from "../../../../constants/router-define";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../lib/reducer/userSlice";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

export default function LoginByAdminPage() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!phoneNumber) {
      message.error("Vui lòng nhập số điện thoại");
      return;
    }
    try {
      setLoading(true);
      const rs = await axiosRequest.post("/v1/auth/login-user", {
        phoneNumber,
      });
      message.success(rs.data.message);
      dispatch(setUser({ ...rs.data.data, phone_number: phoneNumber }));
      navigate(DEFINE_ROUTER.home);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const btnLogin = (
    <Button
      className="w-full py-3 mt-5 h-[40px] primary-bg"
      type="primary"
      loading={loading}
      onClick={handleLogin}
    >
      Đăng nhập
    </Button>
  );

  return (
    <div className="w-full flex justify-center items-center">
      <div id="recaptcha-container"></div>
      <div className="h-screen overflow-hidden flex flex-col justify-start items-start w-screen p-3 sm:max-w-[450px] sm:border">
        <div className="w-full h-full justify-start items-center flex flex-col mt-20 px-5">
          <img
            className="object-cover h-[100px] w-[100px] mb-5"
            src="/skylimit-credit.jpg"
          />
          <PhoneInput
            inputStyle={{
              width: "100%",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            country={"vn"}
            disableCountryCode
            disableDropdown
            value={phoneNumber}
            onChange={setPhoneNumber}
            placeholder="Số điện thoại"
          />
          {btnLogin}
          <div className="mt-5 flex justify-center items-center">
            <span className="text-red-600 text-sm">--- Đăng nhập chỉ dành cho ADMIN ---</span>
          </div>
        </div>
      </div>
    </div>
  );
}
