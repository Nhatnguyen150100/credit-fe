import HomePayable from "./HomePayable";
import PaymentSolution from "./PaymentSolution";
import { Navigate, useSearchParams } from "react-router-dom";
import DEFINE_ROUTER from "../../../constants/router-define";

export default function HomePage() {
  const [searchParams] = useSearchParams();

  console.log("🚀 ~ HomePage ~ searchParams", searchParams.get("noRedirect"))
  if(!searchParams.get("noRedirect")) {
    return <Navigate to={DEFINE_ROUTER.my} replace/>;
  }

  return (
    <div className="space-y-3 pb-3">
      <div
        className="h-[200px] w-screen bg-contain object-fill bg-no-repeat border-none"
        style={{ backgroundImage: "url('./bg-home.jpg')" }}
      >
        <div className="w-full flex justify-center">
          <span className="text-center text-white font-medium mt-3">Bee Cash</span>
        </div>
      </div>
      <div className="px-5 space-y-5">
        <HomePayable />
        <PaymentSolution />
      </div>
    </div>
  );
}
