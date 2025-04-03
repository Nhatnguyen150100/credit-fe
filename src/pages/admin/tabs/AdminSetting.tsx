import { useEffect, useState } from "react";
import {
  Button,
  Table,
  Input,
  Modal,
  Form,
  Switch,
  Pagination,
  Tag,
  message,
  Select,
  Space,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { EPermission, ERole, IAdmin } from "../../../types/admin";
import axiosRequest from "../../../plugins/request";
import PermissionTag from "../../../components/PermissionTag";

const sortPermissions = (permissions: EPermission[]) => {
  const order = [EPermission.CREATE, EPermission.UPDATE, EPermission.DELETE];
  return [...permissions].sort((a, b) => order.indexOf(a) - order.indexOf(b));
};

const AdminSettings = () => {
  const [users, setUsers] = useState<IAdmin[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IAdmin | null>(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [editingPermissions, setEditingPermissions] = useState<EPermission[]>(
    []
  );

  const handleOpenEditModal = (record: IAdmin) => {
    setSelectedUser(record);
    editForm.setFieldsValue({
      userName: record.userName,
    });
    setEditingPermissions(
      record.permissions.filter((p) => p !== EPermission.ALL_PERMISSION)
    );
    setShowEditModal(true);
  };

  const handlePermissionChange = (
    permission: EPermission,
    checked: boolean
  ) => {
    setEditingPermissions((prev) =>
      checked ? [...prev, permission] : prev.filter((p) => p !== permission)
    );
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosRequest.get(`/v1/admin`, {
        params: {
          page: currentPage,
          limit: limit,
          nameLike: searchText,
        },
      });
      setUsers(response.data.data);
      setTotalUsers(response.data.totalItems);
    } catch (error) {
      console.error("Lỗi khi tải danh sách người dùng:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, limit, searchText]);

  const handleUpdateUser = async (values: { userName: string }) => {
    if (!selectedUser) return;

    try {
      await axiosRequest.put(`/v1/admin/update-user/${selectedUser._id}`, {
        ...values,
        permissions: editingPermissions,
        id: selectedUser._id,
      });

      message.success("Cập nhật thông tin thành công");
      setShowEditModal(false);
      setEditingPermissions([]);
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  const handleDeleteUser = async (user: IAdmin) => {
    if (!user._id) return;
    Modal.confirm({
      title: "Bạn có muốn xóa người dùng này?",
      content: `Tên người dùng: ${user.userName}`,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk: async () => {
        try {
          await axiosRequest.delete(`/v1/admin/delete-user/${user._id}`);
          message.success("Xóa người dùng thành công");
          fetchUsers();
        } catch (error) {
          console.error("Lỗi khi xóa người dùng:", error);
        }
      },
    });
  };

  const handleCreateUser = async (values: {
    userName: string;
    password: string;
  }) => {
    try {
      await axiosRequest.post("/v1/admin/create-user", values);
      message.success("Tạo người dùng thành công");
      setShowAddModal(false);
      form.resetFields();
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi tạo người dùng:", error);
    }
  };

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "userName",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      render: (role: ERole) => <Tag color="geekblue">{role}</Tag>,
    },
    {
      title: "Quyền hạn",
      dataIndex: "permissions",
      render: (permissions: EPermission[]) => (
        <Space wrap>
          {sortPermissions(
            permissions.filter((p) => p !== EPermission.ALL_PERMISSION)
          ).map((permission) => (
            <PermissionTag key={permission} permission={permission} />
          ))}
        </Space>
      ),
    },
    {
      title: "Thao tác",
      render: (record: IAdmin) => (
        <div>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              handleOpenEditModal(record);
            }}
          />
          <Button
            className="ms-3"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              handleDeleteUser(record);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Tìm kiếm theo tên..."
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button type="primary" onClick={() => setShowAddModal(true)}>
          Thêm mới
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
          <span>Số bản ghi/trang:</span>
          <Select
            value={limit}
            onChange={(value) => setLimit(value)}
            options={[
              { value: 10, label: "10" },
              { value: 20, label: "20" },
              { value: 50, label: "50" },
            ]}
          />
        </div>
        <Pagination
          current={currentPage}
          total={totalUsers}
          pageSize={limit}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>

      <Modal
        title="Thêm người dùng mới"
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateUser}>
          <Form.Item
            label="Tên đăng nhập"
            name="userName"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>

          <p className="text-gray-500 mb-4">
            Lưu ý: Hãy lưu lại mật khẩu để tránh quên
          </p>

          <div className="flex justify-end gap-2">
            <Button onClick={() => setShowAddModal(false)}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              Tạo người dùng
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        title="Chỉnh sửa thông tin"
        open={showEditModal}
        onCancel={() => setShowEditModal(false)}
        footer={null}
      >
        <Form form={editForm} onFinish={handleUpdateUser}>
          <Form.Item
            label="Tên đăng nhập"
            name="userName"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Quyền hạn">
            <Space direction="vertical">
              {Object.values(EPermission)
                .filter((p) => p !== EPermission.ALL_PERMISSION)
                .map((permission) => (
                  <div key={permission} className="flex items-center">
                    <Switch
                      checked={editingPermissions.includes(permission)}
                      onChange={(checked) =>
                        handlePermissionChange(permission, checked)
                      }
                    />
                    <div className="ms-3">
                      <PermissionTag key={permission} permission={permission} />
                    </div>
                  </div>
                ))}
            </Space>
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button onClick={() => setShowEditModal(false)}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminSettings;
