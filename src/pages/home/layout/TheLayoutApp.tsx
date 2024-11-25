import { Outlet } from "react-router-dom";
import BottomBar from "./BottomBar";

export default function TheLayoutApp() {
  return (
    <div className="w-screen flex justify-center items-center">
      <div className="h-screen flex flex-col justify-between items-start bg-gray-100 w-full  md:max-w-[450px]">
        <Outlet />
        <BottomBar />
      </div>
    </div>
  );
}
