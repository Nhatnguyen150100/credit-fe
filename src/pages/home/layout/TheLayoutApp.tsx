import { Outlet } from "react-router-dom";
import BottomBar from "./BottomBar";

export default function TheLayoutApp() {
  return (
    <div className="overflow-hidden sm:w-full sm:flex sm:justify-center sm:items-center">
      <div className="h-screen w-screen flex flex-col justify-between items-start bg-gray-100 md:max-w-[450px] overflow-hidden">
        <div className="h-full w-full overflow-y-auto sm:overflow-x-hidden">
          <Outlet />
        </div>
        <BottomBar />
      </div>
    </div>
  );
}
