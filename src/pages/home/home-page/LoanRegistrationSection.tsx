import { Checkbox, Modal, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DEFINE_ROUTER from "../../../constants/router-define";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../../../lib/store";
import { setLoanAmount } from "../../../lib/reducer/loanApplicationSlice";
import { formatCurrency } from "../../../utils/format-money";
import DEFINE_STATUS from "../../../constants/status";

interface LoanRegistrationSectionProps {
  loanAmount?: number;
}

export default function LoanRegistrationSection({
  loanAmount,
}: LoanRegistrationSectionProps) {
  const router = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: IRootState) => state.user);
  const loanAmountInRedux = useSelector(
    (state: IRootState) => state.loanApplication.loanAmount
  );
  const [isAgreed, setIsAgreed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isPaid = user?.status === DEFINE_STATUS.PAYED;
  const hasPendingLoan = loanAmountInRedux !== null && loanAmountInRedux !== undefined;

  const handleLoanRegistration = () => {
    if (!isAgreed) return;

    if (hasPendingLoan) {
      message.error(
        "Bạn đã có khoản vay đang chờ xét duyệt. Vui lòng chờ kết quả xét duyệt trước khi tạo yêu cầu vay mới."
      );
      return;
    }

    if (!isPaid && user?._id) {
      message.error(
        "Vui lòng thanh toán khoản vay cũ trước khi tạo yêu cầu vay mới."
      );
      return;
    }

    setIsModalOpen(true);
  };

  const handleConfirmLoan = () => {
    if (!loanAmount) {
      message.error("Vui lòng chọn số tiền vay");
      return;
    }

    dispatch(setLoanAmount(loanAmount));
    setIsModalOpen(false);
    router(DEFINE_ROUTER.loanApplication);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="w-full rounded-2xl mt-5 flex flex-col space-y-4">
      <div className="flex flex-col space-y-3 rounded-2xl bg-[#f0f7fb] px-4 py-4 shadow-sm">
        <Checkbox
          checked={isAgreed}
          onChange={(e) => setIsAgreed(e.target.checked)}
          className="text-[12px]"
        >
          <span className="text-[12px] text-[#20273A] leading-relaxed">
            Bằng việc nhấn vào nút Đăng ký bên dưới, tôi cam kết rằng, tôi đã đọc, hiểu và đồng ý với nội dung của{" "}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                router(DEFINE_ROUTER.term);
              }}
              className="text-primary-color-dark font-semibold hover:underline focus:outline-none"
            >
              Điều kiện và Điều khoản
            </button>{" "}
            và{" "}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                router(DEFINE_ROUTER.term);
              }}
              className="text-primary-color-dark font-semibold hover:underline focus:outline-none"
            >
              Chính sách bảo mật
            </button>{" "}
            đính kèm
          </span>
        </Checkbox>
      </div>

      <button
        className={`w-full rounded-full text-white py-3 h-12 flex items-center justify-center flex-shrink-0 transition-all ${
          isAgreed
            ? "bg-primary-color-dark hover:opacity-90 cursor-pointer"
            : "bg-gray-300 cursor-not-allowed"
        }`}
        onClick={handleLoanRegistration}
        disabled={!isAgreed}
      >
        <span className="text-base font-semibold">Vay ngay</span>
      </button>

      <Modal
        title={null}
        open={isModalOpen}
        onOk={handleConfirmLoan}
        onCancel={handleCancelModal}
        okText="Xác nhận"
        cancelText="Hủy"
        centered
        width={360}
        styles={{
          content: {
            borderRadius: "20px",
            padding: "32px 24px 24px",
          },
          header: {
            borderBottom: "none",
            padding: 0,
            marginBottom: 0,
          },
          footer: {
            borderTop: "none",
            padding: 0,
            marginTop: "24px",
          },
          body: {
            padding: 0,
          },
        }}
        okButtonProps={{
          className: "!bg-[#f2b600] hover:!opacity-90 !rounded-full !h-11 !px-8 !font-semibold !flex-1 !text-white",
        }}
        cancelButtonProps={{
          className: "!rounded-full !h-11 !px-8 !flex-1",
        }}
        footer={(_, { OkBtn, CancelBtn }) => (
          <div className="flex gap-3">
            <CancelBtn />
            <OkBtn />
          </div>
        )}
      >
        <div className="text-center">
          <h3 className="text-lg font-semibold text-[#20273A] mb-3">
            Xác nhận khoản vay
          </h3>
          
          <div className="rounded-xl px-5 mb-4">
            <p className="text-2xl font-bold text-[#20273A]">
              {loanAmount ? formatCurrency(loanAmount) : "--"}
            </p>
          </div>
          
          <p className="text-sm text-gray-600 leading-relaxed">
            Bạn có chắc chắn muốn đăng ký khoản vay này?
          </p>
        </div>
      </Modal>
    </section>
  );
}

