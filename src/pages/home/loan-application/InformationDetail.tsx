import { useEffect, useState } from "react";
import { Button, Empty, message, Spin } from "antd";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axiosRequest from "../../../plugins/request";
import Visibility from "../../../components/visibility";
import { IInfo } from "../../../types/info";
import { formatCurrency } from "../../../utils/format-money";
import { formatDate } from "../../../utils/day-format";
import DEFINE_ROUTER from "../../../constants/router-define";
import { ArrowLeftOutlined, PhoneOutlined } from "@ant-design/icons";

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

  if (!id) {
    message.error("Không tìm thấy hồ sơ của bạn");
    return <Navigate to={DEFINE_ROUTER.home} replace />;
  }

  const DEFINE_TABLE_INFO = [
    {
      label: "Họ tên",
      value: userInfo?.name
    },
    {
      label: "Số CCCD",
      value: userInfo?.user_id
    },
    {
      label: "Tài khoản nhận tiền",
      value: userInfo?.receiving_account_number
    },
    {
      label: "Ngân hàng",
      value: userInfo?.bank_name
    },
    {
      label: "Thời gian nộp đơn",
      value: formatDate(userInfo?.loan_date ?? "", "DD-MM-YYYY"),
    },
    {
      label: "Số tiền giải ngân",
      value: formatCurrency(userInfo?.loan_amount ?? 0),
    },
    {
      label: "Kì hạn xin vay tiền",
      value: "7 ngày",
    },
    {
      label: "Số tiền đến hạn thanh toán",
      value: formatCurrency(userInfo?.amount_payable ?? 0),
    },
    {
      label: "Phí quá hạn vay",
      value: formatCurrency(0),
    },
    {
      label: "Tổng số tiền cần hoàn trả",
      value: formatCurrency(userInfo?.amount_payable ?? 0),
    },
  ];

  return (
    <>
      <Visibility
        visibility={Boolean(userInfo)}
        suspenseComponent={loading ? <Spin /> : <Empty />}
      >
        <div className="w-full flex justify-center items-center">
          <div className="h-screen overflow-y-auto w-screen flex flex-col justify-start items-center bg-gray-100 sm:max-w-[450px] sm:border">
            <div className="py-3 px-4 flex justify-between items-center w-full bg-blue-700 border-b border-white">
              <ArrowLeftOutlined
                className="text-white"
                onClick={() => navigate(-1)}
              />
              <span className="text-sm text-white font-light">
                Chi tiết đơn vay
              </span>
              <PhoneOutlined className="text-white" />
            </div>
            <div className="flex w-full flex-col justify-start items-center pb-10">
              <div className="h-[160px] w-full bg-blue-700 relative">
                <div className="w-full absolute top-10 flex justify-center items-center">
                  <div className="rounded-lg w-[90vw] bg-white p-5 flex flex-col justify-start items-center space-y-5 sm:w-[380px]">
                    <div className="flex flex-col w-full space-y-2 justify-start items-center">
                      <span className="text-sm text-gray-700">
                        Tổng số tiền cần phải trả
                      </span>
                      <span className="text-3xl text-blue-700 font-semibold">
                        {formatCurrency(userInfo?.amount_payable ?? 0)}
                      </span>
                    </div>
                    <div className="w-full px-5 flex flex-row justify-between items-center">
                      <div className="flex flex-col justify-start items-start space-y-1">
                        <span className="text-sm text-gray-700">
                          Ngày hoàn trả khoản vay
                        </span>
                        <span className="text-sm ">
                          {formatDate(
                            userInfo?.date_payable ?? "",
                            "DD-MM-YYYY"
                          )}
                        </span>
                      </div>
                      <div className="flex flex-col justify-start items-start space-y-1">
                        <span className="text-sm text-red-700">
                          {userInfo?.status === "NOT_PAY"
                            ? "Chưa thanh toán"
                            : "Đã quá hạn"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[80px] flex flex-col justify-start items-center space-y-5 w-full">
                <div className="bg-white w-full p-3">
                  <div className=" grid grid-cols-2 w-full border">
                    {DEFINE_TABLE_INFO.map((item, index) => (
                      <>
                        <span
                          className={`text-sm text-gray-700 border-r h-[40px] flex justify-center items-center ${
                            index !== DEFINE_TABLE_INFO.length - 1 && "border-b"
                          }`}
                          key={index}
                        >
                          {item.label}
                        </span>
                        <span
                          className={`text-sm  h-[40px] flex justify-center items-center ${
                            index !== DEFINE_TABLE_INFO.length - 1 && "border-b"
                          }`}
                        >
                          {item.value}
                        </span>
                      </>
                    ))}
                  </div>
                </div>
              </div>
              <Button
                type="primary"
                onClick={() => {
                  handleClickPayment();
                }}
                className="rounded-sm h-[40px] mt-5 w-[90vw] sm:max-w-[360px]"
              >
                Lập tức thanh toán
              </Button>
              <p className="text-yellow-600 text-sm whitespace-pre-wrap px-5 mt-5">
                Lưu ý: tài khoản thanh toán của mỗi đơn đặt hàng khác nhau, hãy
                nhấp vào "thanh toán ngay lập tức" để xem tài khoản thanh toán
                thứ tự của bạn. Để tránh mất tiền, hãy cẩn thận kiểm tra tài
                khoản chuyển tiền.
              </p>
              <p className="text-yellow-600 text-sm whitespace-pre-wrap px-5 mt-3">
                Nếu có bất kỳ câu hỏi nào khác, vui lòng liên hệ với chúng tôi{" "}
                <a className="text-blue-700 underline">Đi ngay</a>
              </p>
            </div>
          </div>
        </div>
      </Visibility>
    </>
  );
}
