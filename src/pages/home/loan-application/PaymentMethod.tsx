import * as React from "react";
import axiosRequest from "../../../plugins/request";
import { toast } from "react-toast";
import { IBank } from "../../../types/bank";
import { ArrowLeftOutlined, CopyOutlined, PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../../../lib/store";
import { copyToClipboard } from "../../../utils/copy-clipboard";
import maskNumber from "../../../utils/mask_number";
import { formatCurrency } from "../../../utils/format-money";

export default function PaymentMethod() {
  const [listBank, setListBank] = React.useState<IBank[]>([]);
  const user = useSelector((state: IRootState) => state.user);
  const navigate = useNavigate();

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

  React.useEffect(() => {
    handleGetBank();
  }, []);

  // const columns: TableProps<IBank>["columns"] = [
  //   {
  //     title: "Tên ngân hàng",
  //     dataIndex: "name_bank",
  //     key: "bankName",
  //     render: (text) => (
  //       <span className="text-xl font-bold uppercase">{text}</span>
  //     ),
  //   },
  //   {
  //     title: "Tên chủ tài khoản",
  //     dataIndex: "name_account",
  //     key: "accountName",
  //     render: (text) => (
  //       <span className="text-lg font-semibold uppercase">{text}</span>
  //     ),
  //   },
  //   {
  //     title: "Số tài khoản",
  //     key: "accountNumber",
  //     dataIndex: "account_number",
  //     render: (text) => (
  //       <Tooltip title="Nhấn để sao chép số tài khoản">
  //         <span
  //           className="text-lg font-semibold uppercase text-blue-500 hover:underline hover:text-blue-800 cursor-pointer"
  //           onClick={() => {
  //             copyToClipboard(text);
  //           }}
  //         >
  //           {text}
  //         </span>
  //       </Tooltip>
  //     ),
  //   },
  //   {
  //     title: "QR code",
  //     key: "qrUrl",
  //     dataIndex: "qr_code_img",
  //     render: (url) => (
  //       <img
  //         crossOrigin="anonymous"
  //         className="h-[160px]"
  //         alt="QR code"
  //         src={url}
  //       />
  //     ),
  //   },
  // ];

  const primaryBank = listBank[0];

  const displayAmount = user?.amount_payable
    ? formatCurrency(user.amount_payable)
    : undefined;

  const transferContentMasked = user?.phone_number
    ? `${maskNumber(user.phone_number)} CHUYEN KHOAN THANH TOAN`
    : "CHUYEN KHOAN THANH TOAN";

  const transferContentRaw = user?.phone_number
    ? `${user.phone_number} CHUYEN KHOAN THANH TOAN`
    : "CHUYEN KHOAN THANH TOAN";

  return (
    <div className="flex w-full items-center justify-center mb-16">
      <div className="min-h-screen w-full bg-theme-sand-light-ultra pb-8 sm:max-w-[450px]">
        <div className="flex items-center px-4 pt-5 pb-4">
          <button
            type="button"
            className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftOutlined className="text-text-color" />
          </button>
          <div className="flex-1">
            <p className="m-0 text-base font-semibold text-text-color">
              Thanh toán trực tuyến
            </p>
            <p className="m-0 mt-0.5 text-xs text-secondary-link">
              Quét mã QR hoặc sao chép thông tin để chuyển khoản
            </p>
          </div>
          <button
            type="button"
            className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-theme-payment-data text-white shadow-sm"
          >
            <PhoneOutlined />
          </button>
        </div>

        {!primaryBank && (
          <div className="px-4 pt-4 text-sm text-secondary-link">
            Hiện tại chưa có thông tin tài khoản thanh toán. Vui lòng thử lại
            sau hoặc liên hệ bộ phận hỗ trợ.
          </div>
        )}

        {primaryBank && (
          <div className="mt-2 space-y-4 px-4">
            <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-theme-dark">
                Thông tin chuyển khoản
              </p>
              <p className="m-0 text-sm text-secondary-link">
                Vui lòng chuyển khoản chính xác theo thông tin dưới đây để hệ
                thống ghi nhận thanh toán.
              </p>

              <div className="mt-4 space-y-3 text-[13px] leading-relaxed">
                <div>
                  <p className="mb-1 text-xs text-theme-dark">
                    Ngân hàng thụ hưởng:
                  </p>
                  <div className="rounded-lg bg-theme-cloudless-light px-3 py-2 text-sm font-medium uppercase text-text-color">
                    {primaryBank.name_bank}
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-xs text-theme-dark">
                    Tên tài khoản thụ hưởng:
                  </p>
                  <div className="flex items-center justify-between rounded-lg bg-theme-cloudless-light px-3 py-2">
                    <span className="max-w-[180px] truncate text-sm font-medium uppercase text-text-color">
                      {primaryBank.name_account}
                    </span>
                    <button
                      type="button"
                      className="flex items-center gap-1 text-xs font-semibold text-theme-payment-data"
                      onClick={() =>
                        copyToClipboard(
                          primaryBank.name_account,
                          "Sao chép tên tài khoản thành công"
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
                  <div className="flex items-center justify-between rounded-lg bg-theme-cloudless-light px-3 py-2">
                    <span className="font-mono text-sm text-text-color">
                      {primaryBank.account_number}
                    </span>
                    <button
                      type="button"
                      className="flex items-center gap-1 text-xs font-semibold text-theme-payment-data"
                      onClick={() =>
                        copyToClipboard(
                          primaryBank.account_number,
                          "Sao chép số tài khoản thành công"
                        )
                      }
                    >
                      <CopyOutlined className="text-sm" />
                      <span>Sao chép</span>
                    </button>
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-xs text-theme-dark">Nội dung:</p>
                  <div className="flex items-center justify-between rounded-lg bg-theme-cloudless-light px-3 py-2">
                    <span className="max-w-[180px] truncate text-sm font-medium text-text-color">
                      {transferContentMasked}
                    </span>
                    <button
                      type="button"
                      className="flex items-center gap-1 text-xs font-semibold text-theme-payment-data"
                      onClick={() =>
                        copyToClipboard(
                          transferContentRaw,
                          "Sao chép nội dung chuyển khoản thành công"
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
                    Số tiền cần thanh toán:
                  </p>
                  <div className="rounded-lg bg-theme-cloudless-light px-3 py-2 text-sm font-semibold text-text-color">
                    {displayAmount || "Vui lòng xem trong chi tiết đơn vay"}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col items-center justify-center">
                <span className="text-sm font-medium text-text-color">
                  QR Code thanh toán
                </span>
                <img
                  crossOrigin="anonymous"
                  className="mt-2 h-40 w-auto"
                  alt="QR code"
                  src={primaryBank.qr_code_img}
                />
                <p className="mt-2 text-center text-[12px] leading-relaxed text-secondary-link">
                  Quét mã QR để tự động điền thông tin tài khoản và số tiền. Vui
                  lòng kiểm tra lại trước khi xác nhận chuyển khoản.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl bg-theme-sand-light px-4 py-3 text-[13px] leading-relaxed text-text-color">
                <p className="m-0">
                  Quét mã QR hỗ trợ nhanh thông tin, hạn chế sai sót trong quá
                  trình chuyển khoản. Nếu bạn vẫn muốn tự nhập, vui lòng nhập
                  chính xác thông tin số tài khoản và nội dung thanh toán như
                  hiển thị bên trên.
                </p>
              </div>

              <div className="rounded-2xl bg-theme-cloudless-light px-4 py-3 text-[13px] leading-relaxed text-secondary-link">
                <p className="m-0">
                  Bạn có thể chuyển khoản qua Internet Banking, ứng dụng ngân
                  hàng, Viettel Money hoặc tại quầy giao dịch. Trong mọi trường
                  hợp, hãy giữ lại biên lai/chứng từ để đối soát khi cần.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
