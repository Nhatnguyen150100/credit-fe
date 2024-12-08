import { Button, message } from "antd";
import * as React from "react";
import axiosRequest from "../../../plugins/request";
import { toast } from "react-toast";
import { IBank } from "../../../types/bank";
import { ArrowLeftOutlined, PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../../../lib/store";
import { copyToClipboard } from "../../../utils/copy-clipboard";

export default function PaymentMethod() {
  const [listBank, setListBank] = React.useState<IBank[]>([]);
  const user = useSelector((state: IRootState) => state.user);
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  console.log("🚀 ~ PaymentMethod ~ isMobile:", isMobile);
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
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
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

  return (
    <div className="w-full flex items-center justify-center">
      <div className="h-screen overflow-y-auto w-screen flex flex-col justify-start items-center bg-gray-100 sm:max-w-[450px] sm:border">
        <div className="shadow sticky top-0 z-10 py-3 px-4 flex justify-between items-center w-full bg-blue-700 border-b border-white">
          <ArrowLeftOutlined
            className="text-white"
            onClick={() => navigate(-1)}
          />
          <span className="text-sm text-white font-light">
            Thanh toán trực tuyến
          </span>
          <PhoneOutlined className="text-white" />
        </div>
        <div className="bg-white w-full p-5 flex flex-col justify-start items-start space-y-4">
          <div className="w-full flex flex-row justify-start items-center pb-3 border-b border-gray-300 space-x-3">
            <label className="text-sm min-w-[80px]">Ngân hàng</label>
            <span className="text-sm text-gray-600">
              {listBank[0]?.name_bank}
            </span>
          </div>
          <div className="w-full flex flex-row justify-between items-center pb-3 border-b border-gray-300 space-x-3">
            <div className=" space-x-3">
              <label className="text-sm min-w-[80px]">Tên tài khoản</label>
              <span className="text-sm text-gray-600">
                {listBank[0]?.name_account}
              </span>
            </div>
            <Button
              type="primary"
              onClick={() => {
                copyToClipboard(
                  listBank[0]?.name_account,
                  "Sao chép tên tài khoản thành công"
                );
              }}
            >
              Copy
            </Button>
          </div>
          <div className="w-full flex flex-row justify-between items-center pb-3 border-b border-gray-300">
            <div className=" space-x-3">
              <label className="text-sm min-w-[80px]">Số tài khoản</label>
              <span className="text-sm text-gray-600">
                {listBank[0]?.account_number}
              </span>
            </div>
            <Button
              type="primary"
              onClick={() => {
                copyToClipboard(
                  listBank[0]?.account_number,
                  "Sao chép số tài khoản thành công"
                );
              }}
            >
              Copy
            </Button>
          </div>
          <div className="w-full flex flex-row justify-start items-center pb-3 border-b border-gray-300 space-x-3">
            <label className="text-sm min-w-[80px]">Số tiền cần trả</label>
            <span className="text-sm text-gray-600">
              {user?.amount_payable.toLocaleString()}
            </span>
          </div>
        </div>
        <p className="text-base md:text-2xl font-bold max-w-[820px] text-center px-5 mt-5">
          Thanh toán vui lòng gởi hóa đơn cho hỗ trợ viên qua zalo để được hỗ
          trợ xóa nợ và vay lại
        </p>
        <div className="flex flex-col mt-5 justify-start items-start space-y-2 w-full px-5">
          <span className="text-gray-500 text-sm">
            <sup>*</sup>Hướng dẫn trả tiền
          </span>
          <ul className="list-decimal text-gray-500 text-sm space-y-2 ms-3">
            <li>
              Bạn có thể chọn chuyển khoản, đến ngân hàng, cửa hàng Viettel,...
              để thực hiện thao tác thanh toán tiền.
            </li>
            <li>
              Vui lòng đảm bảo nhập đầy đủ tài khoản ngân hàng khi thực hiện
              thao tác trả nợ. Nếu có các chữ cái trong tài khoản, hãy đảm bảo
              nhập đầy đủ các chữ cái đố cũng là một phần của tài khoản. Việc
              nhập tài khoản không đầy đủ sẽ khiến ngân hàng mất tiền của bạn
              hoặc bị ngân hàng từ chối.
            </li>
            <li>
              Do hệ thống ngân hàng, "chuyển khoản thông thường", không đảm bảo
              rằng tiền sẽ đến tài khoản của chúng tôi đúng lúc. Chúng tôi chỉ
              có thể đánh giá số tiền gửi thực tế của bạn và xóa số tiền đó dựa
              trên thời gian thực gửi tiền vào ngân hàng.
            </li>
          </ul>
        </div>
        {/* {isMobile ? (
        <div className="flex flex-col space-y-4">
          {listBank.map((bank) => (
            <div key={bank._id} className="border p-4 rounded shadow">
              <div>
                <span className="font-semibold">Tên ngân hàng:</span>{" "}
                <span className="text-lg">{bank.name_bank}</span>
              </div>
              <div>
                <span className="font-semibold">Tên chủ tài khoản:</span>{" "}
                <span className="text-lg">{bank.name_account}</span>
              </div>
              <div>
                <span className="font-semibold">Số tài khoản:</span>{" "}
                <Tooltip title="Nhấn để sao chép số tài khoản">
                  <span
                    className="text-lg text-blue-500 hover:underline cursor-pointer"
                    onClick={() => copyToClipboard(bank.account_number)}
                  >
                    {bank.account_number}
                  </span>
                </Tooltip>
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="font-semibold">QR code:</span>
                <img
                  crossOrigin="anonymous"
                  className="h-32 w-auto mt-1"
                  alt="QR code"
                  src={bank.qr_code_img}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full">
          <Table<IBank>
            rowKey="id"
            columns={columns}
            dataSource={listBank}
            pagination={false}
          />
        </div>
      )} */}
      </div>
    </div>
  );
}
