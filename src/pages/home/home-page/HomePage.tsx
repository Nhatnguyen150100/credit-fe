import { Navigate, useSearchParams } from "react-router-dom";
import DEFINE_ROUTER from "../../../constants/router-define";
import Notification from "./Notification";
import LoanSection from "./LoanSection";

export default function HomePage() {
  const [searchParams] = useSearchParams();

  if (!searchParams.get("noRedirect")) {
    return <Navigate to={DEFINE_ROUTER.my} replace />;
  }

  return (
    <div className="space-y-3 pb-3">
      <div
        className="h-[280px] w-screen bg-contain object-fill bg-no-repeat border-none relative"
        style={{ backgroundImage: "url('./bg-home.png')" }}
      >
        <div className="w-full h-full flex flex-col justify-start items-center space-y-2 pt-12">
          <span className="text-[11.333vw] text-center text-white font-medium lato-light">
            {(20000000).toLocaleString()}
          </span>
          <p className="max-w-[85vw] text-center text-white">
            2 phút nộp đơn trực tuyến · 5 phút cho vay nhanh chóng
          </p>
        </div>
        <div className="absolute top-[200px]">
          <Notification />
        </div>
        <div className="mt-[40px]">
          <LoanSection />
        </div>
      </div>
    </div>
  );
}
