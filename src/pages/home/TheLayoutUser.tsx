import DEFINE_ROUTER from "../../constants/router-define";
import { Outlet } from "react-router-dom";

export default function TheLayoutUser() {
  return (
    <div
      className="flex flex-col justify-start p-10 items-center space-y-5 object-cover bg-no-repeat min-h-max"
      style={{ backgroundImage: "url(./bg_2.jpg)", backgroundSize: "cover" }}
    >
      <header className="w-full py-2">
        <a
          className="uppercase text-4xl text-blue-600 font-extrabold justify-center items-center flex"
          href={DEFINE_ROUTER.home}
        >
          SKYLIMIT CREDIT
        </a>
      </header>
      <Outlet />
    </div>
  );
}
