import { Button, message } from "antd";
import * as React from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import axiosRequest from "../../../../plugins/request";
import DEFINE_ROUTER from "../../../../constants/router-define";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../../lib/reducer/userSlice";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { TFirebaseLogin } from "../../../../types/firebase";
import { getApps, initializeApp } from "firebase/app";
import TheHeader from "../../layout/TheHeader";
import TheFooter from "../../layout/TheFooter";
import { IRootState } from "../../../../lib/store";

const TIME_EXPIRE_OTP = 3 * 60;

const LoginSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Vui lòng nhập số điện thoại")
    .regex(/^0\d{9}$/, "Số điện thoại phải gồm 10 số và bắt đầu bằng 0"),
  otpCode: z.string().optional(),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const user = useSelector((state: IRootState) => state.user);
  const isLoggedIn = Boolean(user?._id || user?.phone_number);
  const [searchParams] = useSearchParams();
  const phoneNumber = searchParams.get("phoneNumber");
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = React.useState(TIME_EXPIRE_OTP);
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingOtp, setLoadingOtp] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const [firebaseConfig, setFirebaseConfig] = React.useState<TFirebaseLogin>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      phoneNumber: phoneNumber || "",
      otpCode: "",
    },
  });

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

  const handleSentOTPRaw = async () => {
    const phoneNumber = getValues("phoneNumber");

    if (!auth) {
      message.error(
        "Cấu hình dự án chưa được kết nối. Vui lòng kiểm tra kết nối internet và thử lại sau. Nếu liên tục bị lỗi này hãy liên hệ quản trị viên để được giúp đỡ."
      );
      return;
    }
    setLoadingOtp(true);
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
      window.confirmationResult = confirmationResult;
      setLoadingOtp(false);
      startTimer();
      message.success("Gửi mã OTP thành công");
    } catch (error) {
      console.error(error);
      setLoadingOtp(false);
      startTimer();
      message.error(
        "Gửi OTP thất bại. Hãy sử dụng OTP mặc định được quản trị viên cung cấp"
      );
    }
  };

  const handleLogin = async () => {
    const phoneNumber = getValues("phoneNumber");

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
      navigate(DEFINE_ROUTER.my);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = getValues("otpCode") || "";

    if (!otpCode) {
      setError("otpCode", {
        type: "manual",
        message: "Vui lòng nhập OTP",
      });
      return;
    }

    if (otpCode.length !== 6) {
      setError("otpCode", {
        type: "manual",
        message: "Mã OTP phải có 6 chữ số",
      });
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
    const otpCode = getValues("otpCode") || "";

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

  const isDisabled = (getValues("otpCode") || "").length !== 6 || !auth;

  if (isLoggedIn) {
    return <Navigate to={DEFINE_ROUTER.my} replace />;
  }

  return (
    <div className="overflow-hidden sm:w-full sm:flex sm:justify-center sm:items-center">
      <div className="h-screen w-screen flex flex-col justify-between items-start bg-gray-100 md:max-w-[450px] overflow-hidden">
        <div className="h-full flex flex-col relative overflow-y-auto overflow-x-hidden bg-white">
          <TheHeader />
          <main className="px-4 mt-5 flex-grow">
            <div id="recaptcha-container" />

            <div className="w-full max-w-md flex flex-col items-stretch text-center">
              <h1 className="text-[24px] leading-8 font-semibold text-gray-800 mb-2">
                Ưu đãi dành riêng cho
                <br />
                khách hàng thân thiết.
              </h1>
              <p className="text-[16px] leading-7 text-gray-700 mb-8">
                Nhận khoản vay lớn hơn, nhanh hơn và dễ dàng hơn từ lần vay thứ
                hai trở đi!
              </p>

              <form
                className="w-full"
                onSubmit={handleSubmit(() => {
                  handleSentOTPRaw();
                })}
              >
                <div className="text-left space-y-2 mb-2">
                  <label className="block text-sm text-gray-700 font-medium">
                    Số điện thoại của bạn
                  </label>
                  <input
                    className={`w-full h-[52px] rounded-[12px] border focus:border-[#FF8A3D] bg-[#F7FBFF] px-4 text-sm outline-none`}
                    type="tel"
                    inputMode="numeric"
                    disabled={isActive}
                    placeholder="0xx xxx xxxx"
                    {...register("phoneNumber")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && auth) {
                        e.preventDefault();
                        handleSubmit(() => handleSentOTPRaw())();
                      }
                    }}
                  />
                  {errors.phoneNumber && (
                    <p className="text-xs text-red-500">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                {!isActive ? (
                  <Button
                    htmlType="submit"
                    className="w-full h-[52px] rounded-[12px] text-base font-semibold bg-[#FF8A3D] hover:bg-[#ff7a22] focus:bg-[#ff7a22] border-none text-white mb-8 mt-5"
                    type="primary"
                    loading={loadingOtp || !auth}
                    disabled={!auth}
                  >
                    Xác nhận bằng mã OTP
                  </Button>
                ) : (
                  <Button
                    type="link"
                    className="w-full h-[52px] rounded-[12px] bg-[#F7FBFF] text-[#7F8FA6] text-sm font-semibold mb-8 flex flex-col items-center justify-center mt-5 gap-0"
                    onClick={() => {
                      if (timeLeft >= 60) {
                        message.error("Đợi còn 1 phút để gửi lại OTP");
                        return;
                      }
                      handleSentOTPRaw();
                      resetTimer();
                    }}
                  >
                    <span>Gửi lại</span>
                    <span className="text-xs">{formatTime(timeLeft)}</span>
                  </Button>
                )}

                <div className="text-left space-y-2 mb-6">
                  <label className="block text-sm text-gray-700 font-medium">
                    Mã xác nhận
                  </label>

                  <input
                    className="w-full h-[52px] rounded-[12px] border border-[#E5F0FF] bg-[#F7FBFF] px-4 text-sm outline-none"
                    placeholder="Mã xác nhận"
                    inputMode="numeric"
                    maxLength={6}
                    {...register("otpCode")}
                  />
                  {errors.otpCode && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.otpCode.message}
                    </p>
                  )}
                </div>

                <Button
                  className={`w-full h-[52px] rounded-[12px] text-base font-semibold shadow-none border-none ${
                    !isDisabled
                      ? "bg-[#FF8A3D] text-white"
                      : "bg-[#FFEFE0] text-[#F0B38D]"
                  }`}
                  type="primary"
                  loading={loading}
                  disabled={isDisabled}
                  onClick={handleVerifyOtp}
                >
                  Đăng nhập
                </Button>
              </form>
            </div>
          </main>
          <TheFooter />
        </div>
      </div>
    </div>
  );
}
