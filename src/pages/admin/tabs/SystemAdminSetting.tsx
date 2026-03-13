import { useEffect, useState } from "react";
import {
  Button,
  Table,
  Input,
  Modal,
  Form,
  Pagination,
  message,
  Select,
  Popconfirm,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  KeyOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { IAdmin } from "../../../types/admin";
import axiosRequest from "../../../plugins/request";

export default function SystemAdminSetting() {
  const [users, setUsers] = useState<IAdmin[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchText, setSearchText] = useState("");

  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [resetForm] = Form.useForm();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IAdmin | null>(null);

  const fetchUsers = async () => {
    try {
      const rs = await axiosRequest.get("/v1/admin/system-admins", {
        params: { page: currentPage, limit, nameLike: searchText || undefined },
      });
      setUsers(rs.data.data);
      setTotalUsers(rs.data.totalItems);
    } catch (error: any) {
      message.error(error.response?.data?.message || "Tải danh sách thất bại");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, limit, searchText]);

  // ── Create ────────────────────────────────────────────────────────────────
  const handleCreate = async (values: { userName: string; password: string }) => {
    try {
      const rs = await axiosRequest.post("/v1/admin/system-admins", values);
      message.success(rs.data.message || "Tạo tài khoản thành công");
      setShowCreateModal(false);
      createForm.resetFields();
      fetchUsers();
    } catch (error: any) {
      message.error(error.response?.data?.message || "Tạo tài khoản thất bại");
    }
  };

  // ── Edit userName ─────────────────────────────────────────────────────────
  const handleOpenEdit = (record: IAdmin) => {
    setSelectedUser(record);
    editForm.setFieldsValue({ userName: record.userName });
    setShowEditModal(true);
  };

  const handleEdit = async (values: { userName: string }) => {
    if (!selectedUser) return;
    try {
      const rs = await axiosRequest.put(
        `/v1/admin/system-admins/${selectedUser._id}`,
        values
      );
      message.success(rs.data.message || "Cập nhật thành công");
      setShowEditModal(false);
      fetchUsers();
    } catch (error: any) {
      message.error(error.response?.data?.message || "Cập nhật thất bại");
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async (record: IAdmin) => {
    try {
      const rs = await axiosRequest.delete(`/v1/admin/system-admins/${record._id}`);
      message.success(rs.data.message || "Xóa tài khoản thành công");
      fetchUsers();
    } catch (error: any) {
      message.error(error.response?.data?.message || "Xóa tài khoản thất bại");
    }
  };

  const handleOpenReset = (record: IAdmin) => {
    setSelectedUser(record);
    resetForm.resetFields();
    setShowResetModal(true);
  };

  const handleResetPassword = async (values: { newPassword: string }) => {
    if (!selectedUser) return;
    try {
      const rs = await axiosRequest.put(
        `/v1/admin/system-admins/${selectedUser._id}/reset-password`,
        { newPassword: values.newPassword }
      );
      message.success(rs.data.message || "Đặt lại mật khẩu thành công");
      setShowResetModal(false);
    } catch (error: any) {
      message.error(error.response?.data?.message || "Đặt lại mật khẩu thất bại");
    }
  };

  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: () => (
        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
          SYSTEM_ADMIN
        </span>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_: any, record: IAdmin) => (
        <div className="flex items-center gap-2">
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleOpenEdit(record)}
          >
            Sửa
          </Button>
          <Button
            size="small"
            icon={<KeyOutlined />}
            onClick={() => handleOpenReset(record)}
          >
            Đặt lại MK
          </Button>
          <Popconfirm
            title="Xóa tài khoản"
            description={`Bạn có chắc muốn xóa "${record.userName}"?`}
            okText="Xóa"
            okType="danger"
            cancelText="Hủy"
            onConfirm={() => handleDelete(record)}
          >
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Tìm kiếm theo tên..."
          prefix={<SearchOutlined />}
          style={{ width: 280 }}
          allowClear
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowCreateModal(true)}
        >
          Thêm SYSTEM_ADMIN
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        pagination={false}
      />

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Số bản ghi/trang:</span>
          <Select
            value={limit}
            onChange={(v) => { setLimit(v); setCurrentPage(1); }}
            options={[
              { value: 10, label: "10" },
              { value: 20, label: "20" },
              { value: 50, label: "50" },
            ]}
            size="small"
          />
        </div>
        <Pagination
          current={currentPage}
          total={totalUsers}
          pageSize={limit}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          showTotal={(total) => `Tổng ${total} tài khoản`}
        />
      </div>

      <Modal
        title="Thêm SYSTEM_ADMIN mới"
        open={showCreateModal}
        onCancel={() => { setShowCreateModal(false); createForm.resetFields(); }}
        footer={null}
        destroyOnClose
      >
        <Form form={createForm} layout="vertical" onFinish={handleCreate}>
          <Form.Item
            label="Tên đăng nhập"
            name="userName"
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
          >
            <Input placeholder="Nhập tên đăng nhập" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu (ít nhất 6 ký tự)" />
          </Form.Item>
          <p className="text-gray-400 text-xs mb-4">
            Lưu ý: Hãy lưu lại mật khẩu để tránh quên
          </p>
          <div className="flex justify-end gap-2">
            <Button onClick={() => { setShowCreateModal(false); createForm.resetFields(); }}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              Tạo tài khoản
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        title={`Chỉnh sửa: ${selectedUser?.userName}`}
        open={showEditModal}
        onCancel={() => setShowEditModal(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={editForm} layout="vertical" onFinish={handleEdit}>
          <Form.Item
            label="Tên đăng nhập mới"
            name="userName"
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
          >
            <Input placeholder="Nhập tên đăng nhập mới" />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={() => setShowEditModal(false)}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        title={`Đặt lại mật khẩu: ${selectedUser?.userName}`}
        open={showResetModal}
        onCancel={() => setShowResetModal(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={resetForm} layout="vertical" onFinish={handleResetPassword}>
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)" />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu" },
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
          <div className="flex justify-end gap-2">
            <Button onClick={() => setShowResetModal(false)}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              Đặt lại mật khẩu
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
