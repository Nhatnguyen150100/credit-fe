import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosRequest from "../../../../plugins/request";
import Visibility from "../../../../components/visibility";
import DEFINE_ROUTER from "../../../../constants/router-define";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../lib/reducer/userSlice";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../../config/firebase.config";

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

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          defaultCountry: "VN",
          callback: (_: any) => {
            // handleSentOTP();
          },
          "expired-callback": () => {
            console.log("Expired callback");
          },
        }
      );
    }
  }

  React.useEffect(() => {
    onCaptchVerify();
  }, []);

  function isValidPhoneNumber(phone: string): boolean {
    const phoneRegex =
      /^\+?[0-9]{1,3}?[-. ]?[0-9]{1,4}[-. ]?[0-9]{1,4}[-. ]?[0-9]{1,9}$/;
    return phoneRegex.test(phone);
  }

  const handleSentOTP = async () => {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    if (!appVerifier) {
      message.error("ReCaptcha không hợp lệ");
      return;
    }

    const formatPh = "+84" + Number(phoneNumber);
    if (!isValidPhoneNumber(formatPh)) {
      message.error("Số điện thoại không hợp lệ");
      return;
    }

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formatPh,
        appVerifier
      );
      console.log(
        "🚀 ~ handleSentOTP ~ confirmationResult:",
        confirmationResult
      );
      window.confirmationResult = confirmationResult;
      setLoading(false);
      startTimer();
      message.success("Gửi mã OTP thành công");
    } catch (error) {
      console.error(error);
      setLoading(false);
      message.error("Gửi OTP thất bại. Hãy thử lại sau");
    }
  };

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

  const handleVerifyOtp = async () => {
    if (!otpCode) {
      message.error("Vui lòng nhập OTP");
      return;
    }

    if (otpCode.length !== 6) {
      message.error("Mã OTP phải có 6 chữ số");
      return;
    }

    try {
      setLoading(true);
      await window.confirmationResult.confirm(otpCode);
      handleLogin();
    } catch (error: any) {
      console.log("🚀 ~ handleVerifyOtp ~ error:", error);
      message.error("Xác nhận OTP thất bại. Hãy kiểm tra và thử lại");
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
      className="w-full py-3 mt-5 h-[40px] primary-bg"
      type="primary"
      loading={loading}
      onClick={handleSentOTP}
    >
      Đăng nhập
    </Button>
  );

  const btnVerifyOtp = (
    <Button
      className="w-full py-3 mt-5 h-[40px] primary-bg"
      type="primary"
      loading={loading}
      onClick={handleVerifyOtp}
    >
      Xác nhận mã OTP
    </Button>
  );

  return (
    <div className="w-full flex justify-center items-center">
      <div id="recaptcha-container"></div>
      <div className="h-screen overflow-hidden flex flex-col justify-start items-start w-screen p-3 sm:max-w-[450px] sm:border">
        <div className="w-full flex justify-start items-center">
          <ArrowLeftOutlined className="h-6 w-6" onClick={() => navigate(-1)} />
        </div>
        <div className="w-full h-full justify-start items-center flex flex-col mt-20 px-5">
          {/* <img
            className="object-cover h-[100px] w-[100px] mb-5"
            src="/yoshi-credit.jpg"
          /> */}
          <h1 className="text-2xl md:text-7xl font-bold primary-color mb-5">
            SKYLIMIT CREDIT
          </h1>
          <Visibility visibility={!isActive}>
            <PhoneInput
              inputStyle={{
                width: "100%",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSentOTP();
                }
              }}
              country={"vn"}
              disableCountryCode
              disableDropdown
              value={phoneNumber}
              onChange={setPhoneNumber}
              placeholder="Số điện thoại"
            />
          </Visibility>
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
                  if (timeLeft >= 60) {
                    message.error("Đợi còn 1 phút để gửi lại OTP");
                    return;
                  }
                  handleSentOTP();
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
          <div className="flex flex-col justify-center items-center my-3">
            <span className="text-red-600 text-sm">
              <sup>*</sup>Chú ý: Phải nhập đầy đủ số điện thoại bao gồm 10 số
              bao gồm cả số <strong>0</strong> ở đầu.
            </span>
            <span className="text-red-600 text-sm">
              Ví dụ: Số điện thoại của bạn là <strong>0123456789.</strong> Thì
              bạn phải nhập đầy đủ là <strong>0123456789</strong>.
            </span>
          </div>
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
