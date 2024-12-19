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
        className="h-[280px] w-full md:h-[400px] lg:h-[500px] bg-contain object-fill bg-no-repeat border-none relative"
        style={{ backgroundImage: "url('./bg-home.png')" }}
      >
        <div className="w-full h-full md:h-auto flex flex-col justify-start items-center space-y-2 pt-12 md:pt-10">
          <span className="text-[11.333vw] md:text-[6vw] lg:text-[4vw] text-center text-white font-medium lato-light">
            {(20000000).toLocaleString()}
          </span>
          <p className="max-w-[85vw] md:max-w-[350px] text-center text-white md:text-xl">
            2 phút nộp đơn trực tuyến · 5 phút cho vay nhanh chóng
          </p>
        </div>
        <div className="absolute top-[200px] md:top-[220px] md:left-[5%]">
          <Notification />
        </div>
        <div className="mt-[40px] md:mt-[180px]">
          <LoanSection />
        </div>
      </div>
    </div>
  );
}
