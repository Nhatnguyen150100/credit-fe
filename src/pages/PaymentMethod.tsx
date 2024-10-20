import { message, Table, TableProps, Tooltip } from "antd";
import * as React from "react";
import axiosRequest from "../plugins/request";
import { toast } from "react-toast";
import { IBank } from "../types/bank";

export default function PaymentMethod() {
  const [listBank, setListBank] = React.useState<IBank[]>();

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        message.success("Sao chép số tài khoản thành công");
      })
      .catch((_) => {
        message.error("Sao chép số tài khoản thất bại");
      });
  };

  const columns: TableProps<IBank>["columns"] = [
    {
      title: "Tên ngân hàng",
      dataIndex: "name_bank",
      key: "bankName",
      render: (text) => (
        <span className="text-xl font-bold uppercase">{text}</span>
      ),
    },
    {
      title: "Tên chủ tài khoản",
      dataIndex: "name_account",
      key: "accountName",
      render: (text) => (
        <span className="text-lg font-semibold uppercase">{text}</span>
      ),
    },
    {
      title: "Số tài khoản",
      key: "accountNumber",
      dataIndex: "account_number",
      render: (text) => (
        <Tooltip title="Nhấn để sao chép số tài khoản">
          <span
            className="text-lg font-semibold uppercase text-blue-500 hover:underline hover:text-blue-800 cursor-pointer"
            onClick={() => {
              copyToClipboard(text);
            }}
          >
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "QR code",
      key: "qrUrl",
      dataIndex: "qr_code_img",
      render: (url) => (
        <img
          crossOrigin="anonymous"
          className="h-[160px]"
          alt="QR code"
          src={url}
        />
      ),
    },
  ];

  return (
    <div className="w-full justify-center items-start space-y-8 h-full">
      <h1 className="text-3xl font-bold text-red-500 capitalize">
        Phương thức thanh toán chuyển khoản
      </h1>
      <div className="flex flex-col justify-center items-center space-y-3 mb-5">
        <h3 className="text-4xl font-bold max-w-[820px]">
          Thanh toán vui lòng gởi hóa đơn cho hỗ trợ viên qua zalo để được hỗ
          trợ xóa nợ và vay lại
        </h3>
      </div>
      <Table<IBank>
        rowKey="id"
        columns={columns}
        dataSource={listBank}
        pagination={false}
      />
    </div>
  );
}
