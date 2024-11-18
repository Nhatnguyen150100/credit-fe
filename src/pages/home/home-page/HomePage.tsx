import * as React from "react";
import HomePayable from "./HomePayable";
import PaymentSolution from "./PaymentSolution";

export default function HomePage() {
  return (
    <div className="h-full w-full space-y-3 overflow-y-auto pb-3">
      <div
        className="h-[200px] w-screen bg-contain object-fill bg-no-repeat border-none"
        style={{ backgroundImage: "url('./bg-home.jpg')" }}
      >
        <div className="w-full flex justify-center">
          <span className="text-center text-white font-light mt-3">Cat credit</span>
        </div>
      </div>
      <div className="px-5 space-y-5">
        <HomePayable />
        <PaymentSolution />
      </div>
    </div>
  );
}