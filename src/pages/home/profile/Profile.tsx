import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CopyOutlined } from "@ant-design/icons";

import { IRootState } from "../../../lib/store";
import Visibility from "../../../components/visibility";
import maskNumber from "../../../utils/mask_number";
import DEFINE_ROUTER from "../../../constants/router-define";
import { formatCurrency } from "../../../utils/format-money";
import { formatDate } from "../../../utils/day-format";
import { useEffect, useState } from "react";
import { IBank } from "../../../types/bank";
import axiosRequest from "../../../plugins/request";
import { toast } from "react-toast";
import { copyToClipboard } from "../../../utils/copy-clipboard";

export default function Profile() {
  const user = useSelector((state: IRootState) => {
    return state.user;
  });
  const navigate = useNavigate();

  const [listBank, setListBank] = useState<IBank[]>([]);

  const handleGetBank = async () => {
    try {
      const rs = await axiosRequest.get("/v1/bank");
      if (rs.data.data) {
        setListBank(rs.data.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleGetBank();
  }, []);

  const displayName =
    user?.name || (user?.phone_number ? maskNumber(user.phone_number) : "Bạn");

  const dueDate = user?.date_payable ?? new Date("2025-12-31");
  const daysLeft =
    dueDate && dayjs(dueDate).isValid()
      ? dayjs(dueDate).diff(dayjs(), "day")
      : undefined;

  const renderDueBadge = () => {
    if (daysLeft === undefined) return null;

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
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="min-h-screen w-full pb-8 sm:max-w-[450px]">
        <div className="rounded-b-3xl bg-account-theme-active-light px-4 pt-6 pb-7">
          <div className="flex items-center flex-wrap mb-1 gap-2">
            <p className="text-2xl font-medium tracking-wide text-graphite">
              Xin chào,
            </p>
            <Visibility visibility={user?.phone_number}>
              <p className="text-2xl font-semibold text-graphite truncate max-w-[320px]">
                {displayName}
              </p>
            </Visibility>
          </div>
          <p className="text-sm leading-relaxed text-secondary-link">
            Vui lòng thanh toán đúng hạn để nhận khoản vay lớn hơn lần sau nhé!
          </p>
          <Visibility visibility={user?._id}>
            <button
              type="button"
              className="text-[13px] font-semibold text-theme-orangish-dark underline text-end leading-4 mt-3"
              onClick={() =>
                navigate(
                  DEFINE_ROUTER.information.replace(":id", user?._id ?? "")
                )
              }
            >
              Thông tin chi tiết đơn vay
            </button>
          </Visibility>
        </div>

        <div className="px-4 bg-account-theme-active-light pb-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap">
              <div>
                <p className="mb-1 text-xs tracking-wide text-theme-dark">
                  Số tiền cần thanh toán
                </p>
                <p className="m-0 text-3xl font-semibold text-text-color text-nowrap">
                  {formatCurrency(user?.amount_payable ?? 0)}
                </p>
              </div>
              {renderDueBadge()}
            </div>

            <div className="flex items-end justify-between text-sm">
              <div>
                <p className="mb-0.5 text-xs text-theme-dark">Trả trước</p>
                <p className="m-0 font-normal text-text-color text-2xl">
                  {dueDate ? formatDate(dueDate, "DD.MM.YYYY") : "--"}
                </p>
              </div>
              <div className="max-w-[120px]">
                <button
                  type="button"
                  className="text-[13px] font-semibold text-theme-orangish-dark underline text-end leading-4"
                  onClick={() => navigate(DEFINE_ROUTER.paymentInstructions)}
                >
                  Thanh toán bằng cách nào?
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 px-4">
          <div className="rounded-2xl bg-account-theme-overdue-light px-4 py-3 text-[13px] leading-relaxed">
            <p className="m-0 font-semibold text-error">CẢNH BÁO</p>
            <p className="mt-1 mb-0 text-text-color">
              KHÔNG THANH TOÁN KHOẢN VAY vào bất kỳ tài khoản cá nhân nào.
            </p>
          </div>
        </div>

        <Visibility visibility={listBank?.length > 0}>
          <>
            {listBank?.map((bankInfo) => (
              <div className="mt-6 space-y-3 px-4">
                <h2 className="text-2xl font-normal text-text-color">
                  Phương thức thanh toán
                </h2>

                <div className="rounded-2xl bg-theme-cloudless-light px-4 py-4">
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-1 text-[13px] leading-relaxed">
                      <p className="mb-2 flex items-start gap-2 text-sm font-semibold text-text-color">
                        <img
                          src="/svg/bank_icon.svg"
                          alt="Money"
                          className="w-5 h-5"
                        />
                        Thông tin chuyển khoản
                      </p>
                      <div className="flex flex-col justify-start items-start gap-[2px]">
                        <span className="font-semibold">
                          Ngân hàng thụ hưởng:{" "}
                        </span>
                        <span className="uppercase">{bankInfo.name_bank}</span>
                      </div>
                      <div className="flex flex-col justify-start items-start gap-[2px]">
                        <span className="font-semibold">
                          Tên tài khoản thụ hưởng:{" "}
                        </span>
                        <span className="uppercase">
                          {bankInfo.name_account}
                        </span>
                      </div>
                      <div className="flex flex-col justify-start items-start gap-[2px]">
                        <span className="font-semibold">
                          Số tài khoản thụ hưởng:{" "}
                        </span>
                        <span className="font-mono text-sm">
                          {bankInfo.account_number}
                        </span>
                      </div>
                    </div>

                    <div className="flex w-[120px] flex-col items-center justify-center rounded-xl bg-theme-cloudless-light px-3 py-3">
                      <img
                        crossOrigin="anonymous"
                        src={bankInfo.qr_code_img}
                        alt="QR code thanh toán"
                        className="h-24 w-24 object-contain"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          navigate(DEFINE_ROUTER.paymentInstructions)
                        }
                        className="mt-2 text-[11px] font-medium text-theme-payment-data underline"
                      >
                        Hướng dẫn thanh toán
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3 text-[13px] leading-relaxed items-center">
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-theme-sand-dark text-xs font-bold text-white">
                      !
                    </div>
                    <p className="m-0 text-text-color">
                      Khách hàng lưu ý và kiểm tra sao chép chính xác số tài
                      khoản chuyển khoản bằng cách quét mã QR để hạn chế sai sót
                      và tránh thất lạc khoản thanh toán.
                    </p>
                  </div>

                  <div className="mt-4 space-y-3 text-[13px]">
                    <div>
                      <p className="mb-1 text-xs text-theme-dark">Nội dung:</p>
                      <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
                        <span className="max-w-[180px] truncate font-medium text-text-color">
                          {`${maskNumber(
                            user?.phone_number ?? ""
                          )} CHUYEN KHOAN THANH TOAN`}
                        </span>
                        <button
                          type="button"
                          className="flex items-center gap-1 text-xs font-semibold text-theme-payment-data"
                          onClick={() =>
                            copyToClipboard(
                              `${user?.phone_number} CHUYEN KHOAN THANH TOAN`,
                              "Đã sao chép nội dung chuyển khoản"
                            )
                          }
                        >
                          <CopyOutlined className="text-sm" />
                          <span>Sao chép</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="mb-1 text-xs text-theme-dark">
                        Số tài khoản thụ hưởng:
                      </p>
                      <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
                        <span className="max-w-[180px] truncate font-medium text-text-color">
                          {bankInfo.account_number}
                        </span>
                        <button
                          type="button"
                          className="flex items-center gap-1 text-xs font-semibold text-theme-payment-data"
                          onClick={() =>
                            bankInfo.account_number &&
                            copyToClipboard(
                              bankInfo.account_number,
                              "Đã sao chép số tài khoản"
                            )
                          }
                        >
                          <CopyOutlined className="text-sm" />
                          <span>Sao chép</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-3 text-[13px] leading-relaxed bg-theme-sand-light px-4 py-5 rounded-lg">
                    <p className="m-0 text-xs text-secondary-link leading-[14px]">
                      Khách hàng lưu ý và kiểm tra sao chép chính xác số tài
                      khoản chuyển khoản bằng cách quét mã QR để hạn chế sai sót
                      và tránh thất lạc khoản thanh toán.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </>
        </Visibility>

        <div className="mt-6 px-4 pb-8">
          <h2 className="text-base font-semibold text-text-color">Gia hạn</h2>
          <div className="mt-2 px-4 py-4 text-sm leading-relaxed">
            <p className="mb-3">
              Trong trường hợp chưa thể thanh toán khoản vay, bạn có thể gia hạn
              thêm <span className="font-semibold">30 ngày</span>.
            </p>
            <p className="mb-3">
              Để gia hạn, vui lòng thanh toán tối thiểu{" "}
              <span className="font-semibold">200.000 VNĐ</span>.
            </p>
            <p className="mb-0">
              Nếu quý khách gia hạn khoản vay, quý khách sẽ không bị quá hạn và
              chúng tôi sẽ không làm phiền cho đến kỳ thanh toán.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
