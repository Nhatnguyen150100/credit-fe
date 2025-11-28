import { Outlet } from "react-router-dom";
import TheHeader from "./TheHeader";
import TheFooter from "./TheFooter";

export default function TheLayoutApp() {
  return (
    <div className="overflow-hidden sm:w-full sm:flex sm:justify-center sm:items-center">
      <div className="h-screen w-screen flex flex-col justify-between items-start bg-gray-100 md:max-w-[450px] overflow-hidden">
        <div className="h-full relative overflow-y-auto overflow-x-hidden bg-white">
          <TheHeader />
          <Outlet />
          <TheFooter />
        </div>
      </div>
    </div>
  );
}
