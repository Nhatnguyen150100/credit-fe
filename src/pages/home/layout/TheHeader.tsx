import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DEFINE_ROUTER from "../../../constants/router-define";
import { IRootState } from "../../../lib/store";

const menuItems = [
  { id: 1, label: "Về chúng tôi" },
  { id: 2, label: "Liên hệ" },
  { id: 3, label: "Hướng dẫn thanh toán" },
  { id: 4, label: "Câu hỏi thường gặp" },
];

export default function TheHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const user = useSelector((state: IRootState) => state.user);
  const isLoggedIn = Boolean(user?._id || user?.phone_number);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="relative z-50 flex h-[90px] w-full items-center justify-between px-[10px] pt-[10px] mt-[-20px]">
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-200"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <img
        src="/cayvang-logo.png"
        alt="CayVang logo"
        className="z-50 h-auto w-auto"
      />

      <div
        className="relative z-50 flex items-center space-x-[25px]"
        ref={menuRef}
      >
        <button
          className="h-[42px] rounded-[12px] bg-primary-color p-3 text-base leading-4 tracking-wide text-primary-color"
          onClick={() =>
            navigate(isLoggedIn ? DEFINE_ROUTER.setting : DEFINE_ROUTER.login)
          }
        >
          {isLoggedIn ? "Tài khoản" : "Đăng nhập"}
        </button>
        <button
          onClick={toggleMenu}
          className={`flex h-[42px] w-[42px] items-center justify-center rounded-[16px] bg-primary-color transition-transform hover:scale-105 ${
            isMenuOpen ? "scale-105" : ""
          }`}
        >
          <div className="flex flex-col items-end gap-[5px]">
            <span className="block h-[2px] w-[19.5px] rounded-full bg-text-primary-color" />
            <span className="block h-[2px] w-[15px] rounded-full bg-text-primary-color" />
            <span className="block h-[2px] w-[19.5px] rounded-full bg-text-primary-color" />
          </div>
        </button>

        {isMenuOpen && (
          <div className="absolute top-[60px] right-0 z-50 min-w-[220px] overflow-hidden rounded-[12px] bg-white shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
            {menuItems.map((item, index) => (
              <div key={item.id}>
                <button
                  className="w-full px-4 py-3 text-left text-[14px] font-normal text-[#20273A] transition-colors hover:bg-gray-50"
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  {item.label}
                </button>
                {index < menuItems.length - 1 && (
                  <div className="h-[1px] bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
