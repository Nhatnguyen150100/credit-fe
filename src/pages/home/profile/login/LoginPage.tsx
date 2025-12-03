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
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { TFirebaseLogin } from "../../../../types/firebase";
import { getApps, initializeApp } from "firebase/app";

const TIME_EXPIRE_OTP = 3 * 60;

export default function LoginPage() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = React.useState<string>();
  const [otpCode, setOtpCode] = React.useState<string>();
  const [timeLeft, setTimeLeft] = React.useState(TIME_EXPIRE_OTP);
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const [firebaseConfig, setFirebaseConfig] = React.useState<TFirebaseLogin>();

  const app = React.useMemo(() => {
    const apps = getApps();
    if (firebaseConfig?.apiKey) {
      if (apps.length === 0) {
        return initializeApp(firebaseConfig);
      } else {
        const existingApp = apps[0];
        const existingConfig = existingApp.options;
        if (existingConfig.apiKey !== firebaseConfig.apiKey) {
          return initializeApp(firebaseConfig);
        }
        return existingApp;
      }
    }
    return undefined;
  }, [firebaseConfig]);

  const auth = React.useMemo(() => {
    if (app) {
      const authInstance = getAuth(app);
      authInstance.languageCode = "it";
      return authInstance;
    }
  }, [app]);

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
    if (!window.recaptchaVerifier && auth) {
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
    if (!auth) {
      message.error(
        "Cấu hình dự án chưa được kết nối. Vui lòng kiểm tra kết nối internet và thử lại sau. Nếu liên tục bị lỗi này hãy liên hệ quản trị viên để được giúp đỡ."
      );
      return;
    }
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
      startTimer();
      message.error(
        "Gửi OTP thất bại. Hãy sử dụng OTP mặc định được quản trị viên cung cấp"
      );
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
      handleCheckCustomOtp();
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

  const handleCheckCustomOtp = async () => {
    try {
      const rs = await axiosRequest.post("/v1/otp/on-check-otp", {
        otpCustom: otpCode,
      });
      if (rs) {
        message.success("Mã OTP mặc định chính xác.");
        handleLogin();
      }
    } catch (error) {
      await window.confirmationResult.confirm(otpCode);
      await handleLogin();
    }
  };

  const handleGetFirebaseConfig = async () => {
    try {
      const rs: any = await axiosRequest.get("/v1/firebase");
      const newFirebaseConfig = rs.data;
      const apps = getApps();

      if (apps.length === 0) {
        initializeApp(newFirebaseConfig);
      }

      setFirebaseConfig(newFirebaseConfig);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  React.useEffect(() => {
    handleGetFirebaseConfig();
  }, []);

  const btnLogin = (
    <Button
      className="w-full py-3 mt-5 h-[40px] bg-primary"
      type="primary"
      loading={loading || !auth}
      disabled={!auth}
      onClick={handleSentOTP}
    >
      Đăng nhập
    </Button>
  );

  const btnVerifyOtp = (
    <Button
      className="w-full py-3 mt-5 h-[40px] bg-primary"
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
          <img
            className="object-cover h-[100px] w-[100px] mb-5"
            src="/logo.png"
          />
          <Visibility visibility={!isActive}>
            <PhoneInput
              inputStyle={{
                width: "100%",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && auth) {
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
                placeholder={"Nhập OTP"}
                inputMode="numeric"
                maxLength={6}
                value={otpCode}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^0-9]/g, "")
                    .slice(0, 6);
                  setOtpCode(value);
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
