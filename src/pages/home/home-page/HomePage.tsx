import { useSelector } from "react-redux";
import HomePayable from "./HomePayable";
import PaymentSolution from "./PaymentSolution";
import { IRootState } from "../../../lib/store";
import { Navigate } from "react-router-dom";
import DEFINE_ROUTER from "../../../constants/router-define";

export default function HomePage() {
  const firstVisit = useSelector((state: IRootState) => state.general.firstVisit);

  if(firstVisit) {
    return <Navigate to={DEFINE_ROUTER.my} replace/>;
  }

  return (
    <div className="space-y-3 pb-3">
      <div
        className="h-[200px] w-screen bg-contain object-fill bg-no-repeat border-none"
        style={{ backgroundImage: "url('./bg-home.jpg')" }}
      >
        <div className="w-full flex justify-center">
          <span className="text-center text-white font-medium mt-3">Yoshi Credit</span>
        </div>
      </div>
      <div className="px-5 space-y-5">
        <HomePayable />
        <PaymentSolution />
      </div>
    </div>
  );
}
