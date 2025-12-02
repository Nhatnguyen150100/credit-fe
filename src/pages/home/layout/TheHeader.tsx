import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DEFINE_ROUTER from "../../../constants/router-define";
import { IRootState } from "../../../lib/store";
import Visibility from "../../../components/visibility";
import { APP_NAME } from "../../../constants/global";

const menuItemsNotLoggedIn = [{ id: 3, label: "Hướng dẫn thanh toán" }];

const menuItemsLoggedIn = [
  { id: 1, label: "Tài khoản" },
  { id: 2, label: "Quản lý thẻ ngân hàng" },
  { id: 3, label: "Hướng dẫn thanh toán" },
  { id: 4, label: "Chính sách bảo mật" },
  { id: 5, label: "Thiết lập" },
];

type TheHeaderProps = {
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
};

export default function TheHeader({ scrollContainerRef }: TheHeaderProps) {
  const location = useLocation();
  const isProfile = location.pathname === DEFINE_ROUTER.my;
  console.log("🚀 ~ TheHeader ~ location.pathname:", location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const user = useSelector((state: IRootState) => state.user);
  const isLoggedIn = Boolean(user?._id || user?.phone_number);
  const menuItems = isLoggedIn ? menuItemsLoggedIn : menuItemsNotLoggedIn;

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuItemClick = (id: number) => {
    setIsMenuOpen(false);

    if (!isLoggedIn) {
      switch (id) {
        case 3:
          navigate(DEFINE_ROUTER.paymentInstructions);
          break;
        default:
          break;
      }
      return;
    }

    switch (id) {
      case 1:
        navigate(DEFINE_ROUTER.my);
        break;
      case 2:
        navigate(DEFINE_ROUTER.myBank);
        break;
      case 3:
        navigate(DEFINE_ROUTER.paymentInstructions);
        break;
      case 4:
        navigate(DEFINE_ROUTER.term);
        break;
      case 5:
        navigate(DEFINE_ROUTER.setting);
        break;
      default:
        break;
    }
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

  useEffect(() => {
    const container = scrollContainerRef?.current ?? null;

    const handleScroll = () => {
      const currentScrollY =
        container && "scrollTop" in container
          ? container.scrollTop
          : window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
    } else {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollContainerRef]);

  return (
    <header
      className={`sticky ${
        isProfile ? "bg-account-theme-active-light" : "bg-white"
      } z-50 p-[10px] flex w-full items-center justify-between transition-all duration-200 ${
        isVisible ? "top-0" : "-top-24"
      }`}
    >
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-200"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <Link className="relative z-50" to="/">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="logo" className="z-50 h-12 w-auto" />
          <span className="text-lg font-semibold text-theme-orangish-dark">
            {APP_NAME}
          </span>
        </div>
      </Link>

      <div
        className="relative z-50 flex items-center space-x-[25px]"
        ref={menuRef}
      >
        <Visibility visibility={!isLoggedIn}>
          <button
            className="h-[42px] rounded-[12px] bg-primary-color p-3 text-base leading-4 tracking-wide text-primary-color"
            onClick={() => navigate(DEFINE_ROUTER.login)}
          >
            Đăng nhập
          </button>
        </Visibility>
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
                  onClick={() => handleMenuItemClick(item.id)}
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
