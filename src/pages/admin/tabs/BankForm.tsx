import * as React from "react";
import axiosRequest from "../../../plugins/request";
import { toast } from "react-toast";
import { IBank } from "../../../types/bank";
import { Button, Form, FormProps, Input } from "antd";
import ImgUpload from "../../../components/ImgUpload";
import { useNavigate } from "react-router-dom";

type FieldType = {
  name_bank: string;
  name_account: string;
  account_number: string;
};

interface IProps {
  bankProps?: IBank;
}

export default function BankForm({ bankProps }: IProps) {
  const [file, setFile] = React.useState<File | undefined>();
  const [qrCodeImg, setQrCodeImg] = React.useState<string | undefined>(bankProps?.qr_code_img ?? undefined);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const data = { ...values };
    const formData = new FormData();

    if (!(file || qrCodeImg)) {
      toast.error("Chưa chọn ảnh QR code");
      return;
    }

    if (file) {
      formData.append("qrCodeImg", file);
    } else {
      console.log("Không có file nào được chọn.");
    }

    formData.append("account_number", data.account_number);
    formData.append("name_bank", data.name_bank);
    formData.append("name_account", data.name_account.toUpperCase());

    const option = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      if (bankProps?._id) {
        await axiosRequest.put(`/v1/bank/${bankProps._id}`, formData, option);
      } else {
        await axiosRequest.post("/v1/bank", formData, option);
      }
      toast.success("Cập nhật thành công");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-start items-start">
      <Form
        className="w-full mt-5"
        form={form}
        labelCol={{ span: 6 }}
        labelAlign="left"
        name="form"
        onFinish={onFinish}
        initialValues={{
          name_bank: bankProps?.name_bank ?? "",
          name_account: bankProps?.name_account ?? "",
          account_number: bankProps?.account_number ?? "",
        }}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Tên ngân hàng"
          name="name_bank"
          rules={[{ required: true, message: "Hãy nhập tên ngân hàng" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Tên tài khoản ngân hàng"
          name="name_account"
          rules={[
            { required: true, message: "Hãy nhập tên tài khoản ngân hàng" },
          ]}
        >
          <Input className="uppercase" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Số tài khoản ngân hàng"
          name="account_number"
          rules={[
            { required: true, message: "Hãy nhập số tài khoản ngân hàng" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<any>
          label={
            <div className="flex flex-row justify-between items-center space-x-1">
              <span className="text-base text-red-500">*</span>
              <span className="text-sm">Ảnh QR code tài khoản ngân hàng</span>
            </div>
          }
          rules={[{ required: true }]}
        >
          <ImgUpload
            imgProps={qrCodeImg ?? null}
            file={file}
            handleUploadFile={(file: File | undefined) => {
              setFile(file ?? undefined);
              setQrCodeImg(undefined);
            }}
          />
        </Form.Item>
        <div className="w-full flex justify-end items-end space-x-5">
          <Button
            className="min-w-[160px]"
            type="default"
            onClick={() => {
              navigate(-1);
            }}
          >
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            Cập nhật thông tin
          </Button>
        </div>
      </Form>
    </div>
  );
}
