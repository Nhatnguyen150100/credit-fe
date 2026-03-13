import { Button, Card, Form, Input, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import axiosRequest from "../../../plugins/request";

interface FormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePasswordTab() {
  const [form] = Form.useForm<FormValues>();

  const handleSubmit = async (values: FormValues) => {
    try {
      const rs = await axiosRequest.put("/v1/admin/change-password", {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      message.success(rs.data.message || "Đổi mật khẩu thành công");
      form.resetFields();
    } catch (error: any) {
      message.error(error.response?.data?.message || "Đổi mật khẩu thất bại");
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <Card
        title={
          <span className="flex items-center gap-2">
            <LockOutlined />
            Đổi mật khẩu tài khoản
          </span>
        }
        className="w-full max-w-md shadow-sm"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Mật khẩu hiện tại"
            name="currentPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu hiện tại" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới" },
              { min: 6, message: "Mật khẩu mới phải có ít nhất 6 ký tự" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("currentPassword") !== value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Mật khẩu mới không được trùng mật khẩu hiện tại");
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)" />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu mới" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Mật khẩu xác nhận không khớp");
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu mới" />
          </Form.Item>

          <div className="flex justify-end gap-2 mt-2">
            <Button onClick={() => form.resetFields()}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              Đổi mật khẩu
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
