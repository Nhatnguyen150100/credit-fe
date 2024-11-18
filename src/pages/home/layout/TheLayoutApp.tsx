import React from "react";
import { Outlet } from "react-router-dom";
import BottomBar from "./BottomBar";

export default function TheLayoutApp() {
  return (
    <div className="h-screen flex flex-col justify-between items-start bg-gray-100 w-full">
      <Outlet />
      <BottomBar />
    </div>
  );
}
