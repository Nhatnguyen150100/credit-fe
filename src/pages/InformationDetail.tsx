import { useEffect, useState } from "react";
import { Empty, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axiosRequest from "../plugins/request";
import Visibility from "../components/visibility";
import { IInfo } from "../types/info";
import { formatCurrency } from "../utils/format-money";
import { formatDate } from "../utils/day-format";

export default function InformationDetail() {
  const { id } = useParams<{ id: string }>();
  const [userInfo, setUserInfo] = useState<IInfo>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGetInfo = async () => {
    try {
      setLoading(true);
      const rs = await axiosRequest.get(`/v1/information/${id}`);
      const data = rs.data.data;
      setUserInfo(data);
    } catch (error: any) {
      console.log("🚀 ~ handleGetInfo ~ error:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) handleGetInfo();
  }, [id]);

  const handleClickPayment = () => {
    navigate(`/${id}/payment-method`);
  };

  return (
    <>
      <Visibility
        visibility={Boolean(userInfo)}
        suspenseComponent={loading ? <Spin /> : <Empty />}
      >
        <span className="uppercase text-2xl md:text-3xl font-semibold max-w-[780px] scale-animation">
          hồ sơ của bạn sắp hết hạn vui lòng bấm vào phần thanh toán
        </span>
        <div className="max-w-[860px] container flex flex-col justify-start items-start space-y-5 p-5 md:p-10 border-black border-2 border-dashed rounded-2xl relative">
          <Visibility visibility={userInfo?.status === "PAYED"}>
            <div className="p-8 md:p-10 w-[300px] md:w-[580px] h-[100px] md:h-[120px] bg-red-600 text-black text-2xl md:text-5xl text-center font-bold uppercase rotate-45 absolute top-[40%] left-[10%] md:left-[20%]">
              đã thanh toán
            </div>
          </Visibility>
          <div className="flex flex-col justify-start items-start w-full space-y-2">
            <div className="flex flex-row justify-start items-center space-x-2">
              <label className="text-base md:text-lg font-medium uppercase">
                họ và tên khách hàng:
              </label>
              <span className="text-base md:text-xl font-semibold">
                {userInfo?.name}
              </span>
            </div>
            <div className="flex flex-col justify-start items-center w-full">
              <img
                crossOrigin="anonymous"
                className="max-h-[120px] w-full object-contain"
                src={userInfo?.user_take_id_img}
              />
            </div>
            <div className="flex flex-row justify-start items-center space-x-2">
              <label className="text-base md:text-lg font-medium uppercase">
                Số CCCD:
              </label>
              <span className="text-base md:text-xl font-semibold text-blue-700 underline">
                {userInfo?.user_id}
              </span>
            </div>
            <div className="flex flex-col justify-start items-center space-y-3 w-full">
              <label className="text-base md:text-lg font-medium uppercase text-start w-full">
                CCCD mặt trước:
              </label>
              <img
                crossOrigin="anonymous"
                className="max-h-[120px] w-full object-contain"
                src={userInfo?.front_end_user_id_img}
              />
            </div>
            {/* <div className="flex flex-col justify-start items-center space-y-3 w-full">
              <label className="text-base md:text-lg font-medium uppercase text-start w-full">
                CCCD mặt sau:
              </label>
              <img
                crossOrigin="anonymous"
                className="max-h-[120px] w-full object-contain"
                src={userInfo?.back_end_user_id_img}
              />
            </div> */}
            <div className="flex flex-row justify-start items-center space-x-2">
              <label className="text-base md:text-lg font-medium first-letter:capitalize">
                thời gian vay:
              </label>
              <span className="text-base md:text-xl font-semibold">7 ngày</span>
            </div>
            <div className="flex flex-row justify-start items-center space-x-2">
              <label className="text-base md:text-lg font-medium first-letter:capitalize">
                số điện thoại:
              </label>
              <span className="text-base md:text-xl font-semibold">
                {userInfo?.phone_number}
              </span>
            </div>
            <div className="flex flex-row justify-start items-center space-x-2">
              <label className="text-base md:text-lg font-medium first-letter:capitalize">
                số tiền nhận giải ngân:
              </label>
              <span className="text-base md:text-xl font-semibold">
                {formatCurrency(Number(userInfo?.loan_amount))}
              </span>
            </div>
            <div className="flex flex-row justify-start items-center space-x-2">
              <label className="text-base md:text-lg font-medium first-letter:capitalize">
                Ngày nhận giải ngân:
              </label>
              <span className="text-base md:text-xl font-semibold">
                {formatDate(userInfo?.loan_date ?? "")}
              </span>
            </div>
            <div className="flex flex-row justify-start items-center space-x-2">
              <label className="text-base text-nowrap md:text-lg font-medium first-letter:capitalize">
                số tài khoản nhận tiền:
              </label>
              <span className="text-base md:text-xl font-semibold">
                {userInfo?.receiving_account_number}
              </span>
            </div>
            <div className="flex flex-row justify-start items-center space-x-2">
              <label className="text-base text-nowrap md:text-lg font-medium first-letter:capitalize">
                Ngân hàng:
              </label>
              <span className="text-base md:text-xl font-semibold">
                {userInfo?.bank_name}
              </span>
            </div>
            <div className="flex flex-row justify-start items-center space-x-2">
              <label className="text-base md:text-lg font-medium first-letter:capitalize">
                Địa chỉ chỗ ở:
              </label>
              <span className="text-base md:text-xl font-semibold">
                {userInfo?.address}
              </span>
            </div>
            <div className="flex flex-row justify-start items-center space-x-2">
              <label className="text-base md:text-lg font-medium first-letter:capitalize">
                Tên công ty:
              </label>
              <span className="text-base md:text-xl font-semibold">
                {userInfo?.company}
              </span>
            </div>
            <div className="flex flex-row justify-start items-center space-x-2">
              <label className="text-md md:text-3xl font-medium text-red-600 first-letter:capitalize">
                số tiền cần hoàn trả:
              </label>
              <span className="text-lg md:text-3xl font-semibold text-red-600">
                {formatCurrency(Number(userInfo?.amount_payable))}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-start w-full">
          <button
            className="w-full md:w-[360px] h-[50px] md:h-[60px] bg-yellow-500 text-white text-lg md:text-2xl hover:bg-yellow-600 rounded-lg"
            onClick={handleClickPayment}
          >
            Thanh toán
          </button>
        </div>
      </Visibility>
    </>
  );
}
