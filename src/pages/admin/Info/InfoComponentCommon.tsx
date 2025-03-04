import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  InputNumber,
  Select,
} from "antd";
import { IInfo } from "../../../types/info";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "react-toast";
import { useNavigate } from "react-router-dom";

type Props = {
  infoProps?: IInfo;
  handleSubmit: (data: FormData) => void;
};

type FieldType = {
  user_id: string;
  name: string;
  phone_number: string;
  loan_amount: number;
  loan_date: Dayjs;
  receiving_account_number: string;
  address: string | undefined;
  company: string | undefined;
  date_payable: Dayjs;
  amount_payable: number;
  bank_name: string;
  status: "NOT_PAY" | "PAYED";
};

export default function InfoComponentCommon({
  infoProps,
  handleSubmit,
}: Props) {
  const navigate = useNavigate();
  // const [files, setFiles] = React.useState<{
  //   userTakeIdImg: File | undefined;
  //   fontEndImg: File | undefined;
  //   backEndImg: File | undefined;
  // }>();
  // const [imgCCCD, setImgCCCD] = React.useState<{
  //   userTakeIdImg: string | null;
  //   fontEndImg: string | null;
  //   backEndImg: string | null;
  // }>({
  //   userTakeIdImg: infoProps?.user_take_id_img ?? null,
  //   fontEndImg: infoProps?.front_end_user_id_img ?? null,
  //   backEndImg: infoProps?.back_end_user_id_img ?? null,
  // });
  const [form] = Form.useForm();

  const onStatusChange = (value: string) => {
    if (value === "OVER_DATE") {
      const currentAmount = infoProps?.amount_payable;
      if (!currentAmount) {
        toast.error("Chưa nhập số tiền thanh toán");
        return;
      }
      const newPayment = Math.round(currentAmount * 1.1);
      form.setFieldsValue({ amount_payable: newPayment });
      toast.info("Đã cộng thêm 10% vào số tiền phải trả !");
      return;
    }

    // else {
    //   form.setFieldsValue({ amount_payable: infoProps?.amount_payable });
    //   toast.info("Đã reset số tiền phải trả về lại ban đầu!");
    // }
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const data = { ...values };
    const formData = new FormData();
    // if (
    //   !(files?.fontEndImg || files?.backEndImg || files?.userTakeIdImg) &&
    //   !(
    //     infoProps?.user_take_id_img ||
    //     infoProps?.front_end_user_id_img ||
    //     infoProps?.back_end_user_id_img
    //   )
    // ) {
    //   toast.error("Chưa chọn đủ ảnh");
    //   return;
    // }
    formData.append("user_id", data.user_id);
    formData.append("name", data.name);
    formData.append("phone_number", data.phone_number);
    formData.append("loan_amount", data.loan_amount.toString());
    formData.append("loan_date", data.loan_date.toString());
    formData.append("receiving_account_number", data.receiving_account_number);
    formData.append("bank_name", data.bank_name);
    if(data.address) formData.append("address", data.address);
    if(data.company) formData.append("company", data.company);
    formData.append(
      "date_payable",
      data.date_payable ? data.date_payable.toString() : ""
    );
    formData.append("amount_payable", data.amount_payable.toString());
    formData.append("status", data.status);
    // if (files?.userTakeIdImg)
    //   formData.append("userTakeIdImg", files.userTakeIdImg!);
    // if (files?.fontEndImg) formData.append("frontEndImg", files.fontEndImg!);
    // if (files?.backEndImg) formData.append("backEndImg", files.backEndImg!);
    handleSubmit(formData);
  };

  const formatter = (value: any) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const parser = (value: any) => {
    return value.replace(/₫\s?|(,*)/g, "");
  };

  return (
    <div className="w-full mb-10">
      <div className="rounded-2xl flex flex-col justify-center items-start w-full">
        <Form
          className="w-full mt-5"
          form={form}
          labelCol={{ span: 6 }}
          labelAlign="left"
          name="form"
          onFinish={onFinish}
          initialValues={{
            user_id: infoProps?.user_id,
            name: infoProps?.name ?? "",
            phone_number: infoProps?.phone_number ?? "",
            loan_amount: infoProps?.loan_amount ?? 0,
            loan_date: infoProps?.loan_date ? dayjs(infoProps.loan_date) : null,
            receiving_account_number: infoProps?.receiving_account_number ?? "",
            bank_name: infoProps?.bank_name ?? "",
            address: infoProps?.address ?? "",
            company: infoProps?.company ?? "",
            date_payable: infoProps?.date_payable
              ? dayjs(infoProps?.date_payable)
              : null,
            amount_payable: infoProps?.amount_payable ?? 0,
            status: infoProps?.status ?? "NOT_PAY",
          }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Tên khách hàng"
            name="name"
            rules={[{ required: true, message: "Hãy nhập tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="CCCD"
            name="user_id"
            rules={[{ required: true, message: "Hãy nhập CCCD" }]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item<any>
            label={
              <div className="flex flex-row justify-between items-center space-x-1">
                <span className="text-sm">Ảnh khách hàng cầm CCCD</span>
              </div>
            }
            rules={[{ required: true }]}
          >
            <ImgUpload
              imgProps={imgCCCD?.userTakeIdImg ?? null}
              file={files?.userTakeIdImg}
              handleUploadFile={(file: File | undefined) => {
                setFiles((pre: any) => ({
                  ...pre,
                  userTakeIdImg: file ?? undefined,
                }));
                setImgCCCD((pre: any) => ({ ...pre, userTakeIdImg: null }));
              }}
            />
          </Form.Item>

          <Form.Item<any>
            label={
              <div className="flex flex-row justify-between items-center space-x-1">
                <span className="text-sm">Ảnh CCCD mặt trước</span>
              </div>
            }
            rules={[{ required: true }]}
          >
            <ImgUpload
              imgProps={imgCCCD?.fontEndImg ?? null}
              file={files?.fontEndImg}
              handleUploadFile={(file: File | undefined) => {
                setFiles((pre: any) => ({
                  ...pre,
                  fontEndImg: file ?? undefined,
                }));
                setImgCCCD((pre: any) => ({ ...pre, fontEndImg: null }));
              }}
            />
          </Form.Item> */}

          {/* <Form.Item<any>
            label={
              <div className="flex flex-row justify-between items-center space-x-1">
                <span className="text-base text-red-500">*</span>
                <span className="text-sm">Ảnh CCCD mặt sau</span>
              </div>
            }
            rules={[{ required: true }]}
          >
            <ImgUpload
              imgProps={imgCCCD?.backEndImg ?? null}
              file={files?.backEndImg}
              handleUploadFile={(file: File | undefined) => {
                setFiles((pre: any) => ({
                  ...pre,
                  backEndImg: file ?? undefined,
                }));
                setImgCCCD((pre: any) => ({ ...pre, backEndImg: null }));
              }}
            />
          </Form.Item> */}

          <Form.Item<FieldType>
            label="Số điện thoại khách hàng"
            name="phone_number"
            rules={[
              { required: true, message: "Hãy nhập số điện thoại khách hàng" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Số tiền nhận giải ngân"
            name="loan_amount"
            rules={[
              { required: true, message: "Hãy nhập số tiền nhận giải ngân" },
            ]}
          >
            <InputNumber
              className="w-full"
              formatter={formatter}
              parser={parser}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Ngày cho vay"
            name="loan_date"
            rules={[{ required: true, message: "Hãy nhập ngày cho vay" }]}
          >
            <DatePicker className="w-full" format={"DD/MM/YYYY"} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Số tài khoản nhận tiền"
            name="receiving_account_number"
            rules={[
              { required: true, message: "Hãy nhập số tài khoản nhận tiền" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Ngân hàng"
            name="bank_name"
            rules={[{ required: true, message: "Hãy nhập ngân hàng" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Ngày phải trả"
            name="date_payable"
            rules={[{ required: true, message: "Hãy nhập ngày phải trả" }]}
          >
            <DatePicker className="w-full" format={"DD/MM/YYYY"} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Số tiền phải trả"
            name="amount_payable"
            rules={[{ required: true, message: "Hãy nhập số tiền phải trả" }]}
          >
            <InputNumber
              className="w-full"
              formatter={formatter}
              parser={parser}
            />
          </Form.Item>

          {/* <Form.Item<FieldType>
            label="Địa chỉ chỗ ở"
            name="address"
            rules={[{ required: true, message: "Hãy nhập địa chỉ khách hàng" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Tên công ty"
            name="company"
            rules={[{ required: true, message: "Hãy nhập tên công ty" }]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item<FieldType>
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: "Hãy nhập trạng thái" }]}
          >
            <Select placeholder="Chọn trạng thái" onChange={onStatusChange}>
              <Select.Option value="NOT_PAY">Chưa thanh toán</Select.Option>
              <Select.Option value="PAYED">Đã thanh toán</Select.Option>
              <Select.Option value="OVER_DATE">Quá hạn</Select.Option>
            </Select>
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
              {infoProps?._id ? "Cập nhật thông tin" : "Thêm mới thông tin"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
