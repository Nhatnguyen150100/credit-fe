import React, { useEffect } from "react";
import { Form, Input, Button, message, Modal } from "antd";
import axiosRequest from "../../../plugins/request";
import { IOtp } from "../../../types/otp";

interface OtpFormProps {
  otpProps?: IOtp;
}

const OtpForm: React.FC<OtpFormProps> = ({ otpProps }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (otpProps) {
      form.setFieldsValue({
        otpCustom: otpProps.otpCustom,
      });
    }
  }, [otpProps, form]);

  const onFinish = async (values: { otpCustom: string }) => {
    try {
      if (otpProps) {
        await axiosRequest.put(`/v1/otp/${otpProps._id}`, values);
        message.success("Cập nhật OTP thành công!");
      } else {
        await axiosRequest.post("/v1/otp", values);
        message.success("Tạo mới OTP thành công!");
      }
    } catch (error: any) {
      message.error(error.message || "Có lỗi xảy ra!");
    }
  };

  const handleDelete = async () => {
    if (!otpProps) return;

    Modal.confirm({
      title: "Bạn có muốn xóa thông tin OTP này",
      content: `otp: ${otpProps.otpCustom}`,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      style: {
        top: "50%",
        transform: "translateY(-50%)",
      },
      onOk: async () => {
        try {
          await axiosRequest.delete(`/v1/otp/${otpProps._id}`);
          message.success("Xóa OTP thành công!");
          form.resetFields();
        } catch (error: any) {
          message.error(error.message || "Có lỗi xảy ra khi xóa OTP!");
        }
      },
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ otpCustom: "" }}
    >
      <Form.Item
        style={{
          width: 320,
        }}
        label="OTP"
        name="otpCustom"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập OTP!",
          },
          {
            len: 6,
            message: "OTP phải có 6 chữ số!",
          },
          {
            pattern: /^[0-9]{6}$/,
            message: "OTP phải là 6 chữ số!",
          },
        ]}
      >
        <Input maxLength={6} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {otpProps ? "Cập nhật OTP" : "Tạo mới OTP"}
        </Button>
        {otpProps && (
          <Button
          variant="solid"
          color="danger"
            style={{ marginLeft: 8 }}
            onClick={handleDelete}
          >
            Xóa OTP
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default OtpForm;
