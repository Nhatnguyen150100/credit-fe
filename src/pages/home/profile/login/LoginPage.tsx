import { ArrowLeftOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosRequest from "../../../../plugins/request";
import cookiesStore from "../../../../plugins/cookiesStore";
import Visibility from "../../../../components/visibility";
import DEFINE_ROUTER from "../../../../constants/router-define";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../lib/reducer/userSlice";

const TIME_EXPIRE_OTP = 3 * 60;

export default function LoginPage() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = React.useState<string>();
  const [otpCode, setOtpCode] = React.useState<string>();
  const [timeLeft, setTimeLeft] = React.useState(TIME_EXPIRE_OTP);
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    let interval: any = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isActive && timeLeft !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      message.error("Vui lòng nhập số điện thoại");
      return;
    }
    try {
      setLoading(true);
      const rs = await axiosRequest.post("/v1/auth/login-user", {
        phoneNumber,
      });
      // message.success(rs.data.message);
      // startTimer();
      message.success(rs.data.message);
      dispatch(setUser({...rs.data.data, phone_number: phoneNumber}));
      navigate(DEFINE_ROUTER.home);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!(otpCode && phoneNumber)) {
      message.error("Vui lòng nhập số điện thoại và OTP");
      return;
    }
    try {
      setLoading(true);
      const rs = await axiosRequest.post("/v1/auth/verify-otp", {
        phoneNumber,
        otp: otpCode,
      });
      message.success(rs.data.message);
      dispatch(setUser({...rs.data.data.user, phone_number: phoneNumber}));
      cookiesStore.set("access_token", rs.data.data.accessToken);
      navigate(DEFINE_ROUTER.home);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const startTimer = () => {
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(TIME_EXPIRE_OTP);
  };

  const btnLogin = (
    <Button
      className="w-full py-3 mt-5 h-[40px]"
      type="primary"
      loading={loading}
      onClick={handleSendOtp}
    >
      Đăng nhập
    </Button>
  );

  const btnVerifyOtp = (
    <Button
      className="w-full py-3 mt-5 h-[40px]"
      type="primary"
      loading={loading}
      onClick={handleVerifyOtp}
    >
      Xác nhận mã OTP
    </Button>
  );

  return (
    <div className="w-full flex justify-center items-center">
      <div className="h-screen overflow-hidden flex flex-col justify-start items-start w-screen p-3 sm:max-w-[450px] sm:border">
        <div className="w-full flex justify-start items-center">
          <ArrowLeftOutlined className="h-6 w-6" onClick={() => navigate(-1)} />
        </div>
        <div className="w-full h-full justify-start items-center flex flex-col mt-20 px-5">
          <img
            className="object-cover h-[100px] w-[100px]"
            src="/yoshi-credit.jpg"
          />
          <div className="w-full py-3 border-b border-solid border-gray-300 flex justify-start items-center space-x-3 mt-10">
            <PhoneOutlined />
            <input
              className="outline-none w-full text-sm"
              placeholder="Nhập số điện thoại để đăng nhập"
              pattern="[0-9]*"
              type="number"
              inputMode="numeric"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </div>
          <Visibility visibility={isActive}>
            <div className="w-full py-3 border-b border-solid border-gray-300 flex justify-start items-center space-x-3 mt-10">
              <img className="h-5 w-5" src="/icon/otp-icon.png" alt="otp" />
              <input
                className="outline-none w-full text-sm"
                placeholder="Nhập OTP"
                pattern="[0-9]*"
                maxLength={6}
                type="number"
                inputMode="numeric"
                value={otpCode}
                onChange={(e) => {
                  setOtpCode(e.target.value);
                }}
              />
              <span className="text-sm text-nowrap text-gray-600">
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className="w-full mt-3 flex flex-row justify-end items-center">
              <span
                className={`text-sm text-blue-600 underline`}
                onClick={() => {
                  if (timeLeft >= 120) {
                    message.error("Đợi còn 2 phút để gửi lại OTP");
                    return;
                  }
                  handleSendOtp();
                  resetTimer();
                }}
              >
                Gửi lại OTP
              </span>
            </div>
          </Visibility>
          <Visibility visibility={!isActive} suspenseComponent={btnVerifyOtp}>
            {btnLogin}
          </Visibility>
          <div className="mt-5 flex justify-center items-center">
            <Link className="text-sm text-blue-600 underline" to={"/#"}>
              Đăng kí / Đăng nhập bằng số điện thoại
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
