import React, { useEffect } from "react";
import { Form, Input, Button, message, Modal } from "antd";
import axiosRequest from "../../../plugins/request";
import { IOtp } from "../../../types/otp";

const OtpSetting: React.FC = () => {
  const [form] = Form.useForm();
  const [otp, setOtp] = React.useState<IOtp>();

  const handleGetOtp = async () => {
    try {
      const rs = await axiosRequest.get("/v1/otp");
      setOtp(rs.data.data[0] || null);
    } catch (error: any) {
      message.error(error.message || "Có lỗi xảy ra khi lấy thông tin OTP!");
    }
  };

  useEffect(() => {
    handleGetOtp();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      otpCustom: otp?.otpCustom || "",
    });
  }, [otp, form]);

  const onFinish = async (values: { otpCustom: string }) => {
    try {
      if (otp) {
        await axiosRequest.put(`/v1/otp/${otp._id}`, values);
        message.success("Cập nhật OTP thành công!");
      } else {
        await axiosRequest.post("/v1/otp", values);
        message.success("Tạo mới OTP thành công!");
      }
      handleGetOtp();
    } catch (error: any) {
      message.error(error.message || "Có lỗi xảy ra!");
    }
  };

  const handleDelete = async () => {
    if (!otp) return;

    Modal.confirm({
      title: "Bạn có muốn xóa thông tin OTP này",
      content: `otp: ${otp.otpCustom}`,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk: async () => {
        try {
          await axiosRequest.delete(`/v1/otp/${otp._id}`);
          message.success("Xóa OTP thành công!");
          setOtp(undefined);
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
        style={{ width: 320 }}
        label="OTP"
        name="otpCustom"
        rules={[
          { required: true, message: "Vui lòng nhập OTP!" },
          { len: 6, message: "OTP phải có 6 chữ số!" },
          { pattern: /^[0-9]{6}$/, message: "OTP phải là 6 chữ số!" },
        ]}
      >
        <Input maxLength={6} />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {otp ? "Cập nhật OTP" : "Tạo mới OTP"}
        </Button>
        
        {otp && (
          <Button
            danger
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

export default OtpSetting;