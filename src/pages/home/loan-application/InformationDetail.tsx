import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Button, Empty, message, Spin } from "antd";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axiosRequest from "../../../plugins/request";
import Visibility from "../../../components/visibility";
import { IInfo } from "../../../types/info";
import { formatCurrency } from "../../../utils/format-money";
import { formatDate } from "../../../utils/day-format";
import DEFINE_ROUTER from "../../../constants/router-define";
import { CreditCardOutlined } from "@ant-design/icons";

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

  const daysLeft =
    userInfo?.date_payable && dayjs(userInfo.date_payable).isValid()
      ? dayjs(userInfo.date_payable).diff(dayjs(), "day")
      : undefined;

  const renderStatusBadge = () => {
    if (!userInfo) return null;

    if (userInfo.status === "PAYED") {
      return (
        <span className="rounded-full bg-account-theme-active px-3 py-1 text-xs font-semibold text-white">
          Đã thanh toán
        </span>
      );
    }

    if (userInfo.status === "NOT_PAY") {
      if (typeof daysLeft === "number") {
        if (daysLeft > 0) {
          return (
            <span className="rounded-full bg-account-theme-active px-3 py-1 text-xs font-semibold text-white">
              Còn {daysLeft} ngày
            </span>
          );
        }

        if (daysLeft === 0) {
          return (
            <span className="rounded-full bg-account-theme-today px-3 py-1 text-xs font-semibold text-white">
              Đến hạn hôm nay
            </span>
          );
        }

        return (
          <span className="rounded-full bg-account-theme-overdue px-3 py-1 text-xs font-semibold text-white">
            Quá hạn {Math.abs(daysLeft)} ngày
          </span>
        );
      }

      return (
        <span className="rounded-full bg-account-theme-today px-3 py-1 text-xs font-semibold text-white">
          Chưa thanh toán
        </span>
      );
    }

    return (
      <span className="rounded-full bg-account-theme-overdue px-3 py-1 text-xs font-semibold text-white">
        Quá hạn
      </span>
    );
  };

  const DEFINE_TABLE_INFO = [
    {
      label: "Họ tên",
      value: userInfo?.name,
    },
    {
      label: "Số CCCD",
      value: userInfo?.user_id,
    },
    {
      label: "Tài khoản nhận tiền",
      value: userInfo?.receiving_account_number,
    },
    {
      label: "Ngân hàng",
      value: userInfo?.bank_name,
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
        suspenseComponent={
          loading ? (
            <div className="flex items-center justify-center h-full">
              <Spin />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Empty />
            </div>
          )
        }
      >
        <div className="flex w-full items-center justify-center pb-4 bg-theme-sand-light-ultra">
          <div className="min-h-screen w-full pb-8 sm:max-w-[450px]">
            <div className="px-4 mt-5">
              <div className="rounded-2xl bg-account-theme-active-light p-4">
                <div className="flex items-start justify-between flex-wrap">
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-wide text-theme-dark">
                      Tổng số tiền cần phải trả
                    </p>
                    <p className="m-0 text-3xl font-semibold text-text-color">
                      {formatCurrency(userInfo?.amount_payable ?? 0)}
                    </p>
                  </div>
                  {renderStatusBadge()}
                </div>

                <div className="mt-4 flex items-end justify-between text-sm">
                  <div>
                    <p className="mb-0.5 text-xs text-theme-dark">
                      Ngày hoàn trả khoản vay
                    </p>
                    <p className="m-0 text-lg font-medium text-text-color">
                      {formatDate(userInfo?.date_payable ?? "", "DD.MM.YYYY")}
                    </p>
                  </div>
                  <div className="text-right text-xs text-secondary-link">
                    <div className="m-0 flex flex-col justify-end items-end">
                      <span className="text-xs text-secondary-link">
                        Mã hồ sơ:
                      </span>{" "}
                      <span className="font-semibold truncate max-w-[120px]">
                        {userInfo?._id}
                      </span>
                    </div>
                    <p className="m-0 mt-0.5">
                      Ngày nộp đơn:{" "}
                      <span className="font-semibold">
                        {formatDate(userInfo?.loan_date ?? "", "DD.MM.YYYY")}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 px-4">
              <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                <p className="mb-3 text-sm font-semibold text-text-color">
                  Thông tin chi tiết
                </p>
                <div className="divide-y divide-border-accent">
                  {DEFINE_TABLE_INFO.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start justify-between py-2"
                    >
                      <span className="text-xs text-secondary-link">
                        {item.label}
                      </span>
                      <span className="max-w-[55%] text-right text-sm font-medium text-text-color truncate">
                        {item.value || "--"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 px-4">
              <Visibility visibility={userInfo?.status !== "PAYED"}>
                <Button
                  onClick={handleClickPayment}
                  className="!bg-theme-orangish-dark border-none h-[44px] w-full rounded-full text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <CreditCardOutlined className="text-white" />
                  <span className="text-white">Lập tức thanh toán</span>
                </Button>
              </Visibility>

              <div className="mt-4 rounded-2xl bg-theme-sand-light px-4 py-3 text-[13px] leading-relaxed text-text-color">
                <p className="m-0">
                  Lưu ý: tài khoản thanh toán của mỗi đơn đặt hàng khác nhau,
                  hãy nhấp vào{" "}
                  <span className="font-semibold">"Lập tức thanh toán"</span> để
                  xem tài khoản thanh toán của đơn hiện tại. Vui lòng kiểm tra
                  kỹ thông tin trước khi chuyển khoản.
                </p>
              </div>
              <div className="mt-3 rounded-2xl bg-theme-cloudless-light px-4 py-3 text-[13px] leading-relaxed">
                <p className="m-0">
                  Nếu có bất kỳ câu hỏi nào khác, vui lòng liên hệ với bộ phận
                  hỗ trợ qua số điện thoại hiển thị trong ứng dụng để được giải
                  đáp nhanh chóng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Visibility>
    </>
  );
}
