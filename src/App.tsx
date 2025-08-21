import { Input, message, Modal } from "antd";
import "./App.css";
import { useState } from "react";
import axiosRequest from "./plugins/request";
import GeneralLoading from "./components/GeneralLoading";
import { useNavigate } from "react-router-dom";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onHandleSubmit = async () => {
    if (!userId) {
      message.error("Hãy nhập CCCD của bạn");
      return;
    }
    try {
      setLoading(true);
      const rs: any = await axiosRequest.post("/v1/information/check", {
        user_id: userId,
      });

      if (rs.data.data._id) {
        navigate(`/${rs.data.data._id}`);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="h-full w-full bg-cover bg-center background-container"
        style={{ backgroundImage: "url('./background.jpg')" }}
      >
        <div className="overlay" />
        <div className="relative">
          <main className="px-4 md:px-32 w-full pt-20">
            <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-16">
              <div className="flex flex-col justify-center items-end space-y-8">
                <h1 className="text-5xl md:text-7xl font-bold text-white">
                  Joot Vay
                </h1>
                <div className="flex flex-row justify-end items-end space-x-3">
                  <img
                    className="h-[60px] md:h-[80px]"
                    src="./icon-money.png"
                    alt="icon"
                  />
                  <span className="text-3xl md:text-5xl text-white font-base">
                    Vay online
                  </span>
                </div>
                <div className="flex flex-col justify-end items-end space-y-2">
                  <span className="text-lg md:text-4xl text-white font-normal">
                    Không thế chấp tài sản
                  </span>
                  <span className="text-lg md:text-4xl text-white font-normal">
                    Thủ tục đơn giản, nhận tiền nhanh chóng
                  </span>
                </div>
              </div>
              <div className="flex flex-col py-10 md:py-20 px-5 md:px-8 rounded-3xl bg-white space-y-10">
                <div className="flex flex-col sm:items-start">
                  <h2 className="text-2xl md:text-4xl text-black uppercase font-medium">
                    hỗ trợ vay tiêu dùng
                  </h2>
                  <h1 className="text-2xl md:text-4xl uppercase font-medium">
                    với lãi suất ưu đãi
                  </h1>
                </div>
                <div className="flex justify-start items-start">
                  <ul className="list-none flex flex-col space-y-3">
                    {[
                      "Lãi suất thấp",
                      "Giải ngân nhanh chóng",
                      "Thủ tục đơn giản",
                      "Bảo mật khoản vay",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="text-lg md:text-2xl font-normal text-gray-800 flex justify-start items-center space-x-3"
                      >
                        <img
                          src="./svg/check.svg"
                          className="h-[20px] w-[20px]"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  className="text-lg md:text-2xl font-bold button-gradient rounded-3xl text-white text-center py-4 md:py-6 uppercase"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  đăng nhập
                </button>
              </div>
            </div>
            <div className="mt-10 flex flex-col space-y-5">
              <button className="rounded-full bg-yellow-500 text-blue-800 text-lg md:text-xl capitalize font-bold p-4 md:p-6 min-w-[120px]">
                đăng ký chỉ với 4 bước
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 w-full">
                {[
                  {
                    step: "1",
                    title: "Đăng ký thông tin &",
                    description: "cung cấp CMND/CCCD",
                    bgColor: "bg-white",
                    textColor: "#b778c9",
                  },
                  {
                    step: "2",
                    title: "Nhận cuộc gọi",
                    description: "tư vấn từ các chuyên gia",
                    bgColor: "bg-white",
                    textColor: "#C13D4D",
                  },
                  {
                    step: "3",
                    title: "Phê duyệt",
                    description: "hồ sơ vay trong vài phút",
                    bgColor: "bg-white",
                    textColor: "#FFA800",
                  },
                  {
                    step: "4",
                    title: "Giải ngân tự động",
                    description: "vào tài khoản của bạn",
                    bgColor: "bg-white",
                    textColor: "#00eeff",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`px-5 py-4 flex items-center ${item.bgColor} space-x-3 rounded-xl`}
                  >
                    <span
                      className={`text-4xl font-bold`}
                      style={{ color: item.textColor }}
                    >
                      {item.step}
                    </span>
                    <div className="flex flex-col items-start">
                      <strong
                        className={`text-base`}
                        style={{ color: item.textColor }}
                      >
                        {item.title}
                      </strong>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
          <Modal
            className="!p-0 auth-modal"
            centered
            footer={null}
            open={isOpen}
            onCancel={() => {
              setIsOpen(false);
            }}
          >
            <div className="text-center space-y-3 mb-4">
              <h4 className="uppercase text-3xl text-blue-600 font-bold flex">
                Joot Vay
              </h4>
            </div>
            <form>
              <p className="mb-4 font-semibold">Đăng nhập tài khoản</p>
              <Input
                type="number"
                size="large"
                placeholder="CCCD"
                className="mb-4"
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
              />
              <div className="pb-1 pt-1 text-center">
                <button
                  className="mb-3 button-gradient inline-block w-full rounded-xl px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:outline-none focus:ring-0"
                  type="button"
                  onClick={() => onHandleSubmit()}
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          </Modal>
          <GeneralLoading isLoading={loading} />
        </div>
      </div>
    </>
  );
}

export default App;
