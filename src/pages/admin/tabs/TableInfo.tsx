import * as React from "react";
import { toast } from "react-toast";
import {
  Button,
  DatePicker,
  Empty,
  message,
  Modal,
  notification,
  Select,
  Spin,
  Table,
  TableProps,
  Tag,
} from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  HistoryOutlined,
  PhoneOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  TeamOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Divider, Tooltip } from "antd";
import CsvImportModal from "../../../components/CsvImportModal";
import CsvImportJobsModal from "../../../components/CsvImportJobsModal";
import { useNavigate } from "react-router-dom";
import { IInfo } from "../../../types/info";
import axiosRequest from "../../../plugins/request";
import onRemoveParams from "../../../utils/remove-params";
import { formatCurrency } from "../../../utils/format-money";
import { formatDate } from "../../../utils/day-format";
import DEFINE_ROUTER from "../../../constants/router-define";
import Visibility from "../../../components/visibility";
import DEFINE_STATUS from "../../../constants/status";
import InputSearch from "../../../components/InputSearch";
import { TableRowSelection } from "antd/es/table/interface";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { IRootState } from "../../../lib/store";
import { EPermission, ERole } from "../../../types/admin";
import { onCheckPermission } from "../../../utils/on-check-permission";

const customCheckboxStyle = `
  .ant-table-thead .ant-checkbox-inner, 
  .ant-table-tbody .ant-checkbox-inner {
    width: 20px;
    height: 20px;
    border-radius: 4px;
  }

  .ant-checkbox-inner::after {
    width: 8.71428571px;
    height: 14.14285714px;
    left: 28%;
  }

  .ant-checkbox {
    transform: scale(1.2);
  }
`;

export default function TableInfo() {
  const { info: adminInfo } = useSelector((state: IRootState) => state.admin);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const [listInfo, setListInfo] = React.useState<IInfo[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState({
    nameLike: "",
    userId: "",
    phoneNumber: "",
    status: undefined,
    datePayable: "",
    page: 1,
    limit: 5,
    assigneeIds: [],
  });
  const [total, setTotal] = React.useState(0);
  const [assignLoading, setAssignLoading] = React.useState(false);
  const [exportLoading, setExportLoading] = React.useState(false);
  const [importModalOpen, setImportModalOpen] = React.useState(false);
  const [importJobsModalOpen, setImportJobsModalOpen] = React.useState(false);
  const [userOptions, setUserOptions] = React.useState<
    { value: string; label: string }[]
  >([]);
  const [selectedUserId, setSelectedUserId] = React.useState<string>("");
  const navigate = useNavigate();

  const handleUserSearch = async (search: string) => {
    try {
      const response = await axiosRequest.get("/v1/admin", {
        params: { search, limit: 10, page: 1 },
      });
      setUserOptions(
        response.data.data.map((user: any) => ({
          value: user._id,
          label: user.userName,
        }))
      );
    } catch (error) {
      message.error("Lỗi tải danh sách user");
    }
  };

  const adminFilterOptions = userOptions.map((user) => ({
    value: user.value,
    label: user.label,
  }));

  const handleAssignUser = async () => {
    if (adminInfo?.role !== ERole.SUPER_ADMIN) return;
    if (!selectedUserId || selectedRowKeys.length === 0) return;

    try {
      setAssignLoading(true);
      const rs = await axiosRequest.post(
        "/v1/information/assignee-information",
        {
          userId: selectedUserId,
          listInformationIds: selectedRowKeys,
        }
      );
      message.success(rs.data.message || "Gán user thành công");
      setSelectedRowKeys([]);
      setSelectedUserId("");
      onGetListInfo();
    } catch (error: any) {
      console.log(
        "🚀 ~ handleAssignUser ~ error:",
        error.response.data.message
      );
      message.error("Gán user thất bại");
    } finally {
      setAssignLoading(false);
    }
  };

  const onGetListInfo = async () => {
    try {
      setLoading(true);
      const rs = await axiosRequest.get("/v1/information", {
        params: onRemoveParams(query),
      });
      setListInfo(rs.data.data.data);
      setTotal(rs.data.data.total);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCsv = async () => {
    try {
      setExportLoading(true);
      const response = await axiosRequest.get("/v1/information/export-csv", {
        params: onRemoveParams({
          nameLike: query.nameLike,
          userId: query.userId,
          phoneNumber: query.phoneNumber,
          status: query.status,
          datePayable: query.datePayable,
          assigneeIds: query.assigneeIds.length ? query.assigneeIds : undefined,
        }),
        responseType: "text",
      });
      // Prepend UTF-8 BOM so Excel/spreadsheet apps render Vietnamese correctly
      const BOM = "\uFEFF";
      const url = window.URL.createObjectURL(
        new Blob([BOM + response.data], { type: "text/csv;charset=utf-8;" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `information_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      message.success("Xuất CSV thành công");
    } catch {
      message.error("Xuất CSV thất bại");
    } finally {
      setExportLoading(false);
    }
  };

  const deleteMultiple = async () => {
    Modal.confirm({
      title: "Bạn có muốn xóa các thông tin đã chọn này này. Không thể hoàn tác sau khi xóa.",
      okText: "Xác nhận xóa",
      okType: "danger",
      cancelText: "Không",
      style: {
        top: "50%",
        transform: "translateY(-50%)",
      },
      onOk: async () => {
        try {
          setLoading(true);
          const rs = await axiosRequest.post(
            "/v1/information/delete-multi",
            selectedRowKeys
          );
          setSelectedRowKeys([]);
          onGetListInfo();
          message.success(rs.data.message);
        } catch (error: any) {
          notification.error({
            message: "Xóa thông tin thất bại",
            description: error.response.data.message,
          });
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<IInfo> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const handleDeleteInfo = async (_info: IInfo) => {
    Modal.confirm({
      title: "Bạn có muốn xóa thông tin này",
      content: `Tên: ${_info.name}`,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      style: {
        top: "50%",
        transform: "translateY(-50%)",
      },
      onOk: async () => {
        try {
          await axiosRequest.delete(`/v1/information/${_info._id}`);
          notification.success({
            message: "Xóa thông tin thành công",
          });
          onGetListInfo();
        } catch (error: any) {
          notification.error({
            message: "Xóa thông tin thất bại",
            description: error.response.data.message,
          });
        }
      },
    });
  };

  const updateMultipleStatus = async () => {
    Modal.confirm({
      title:
        'Bạn có muốn kiểm tra và cập nhật toàn bộ dữ liệu và đánh dấu trạng thái "Quá hạn" cho toàn bộ dữ liệu',
      okText: "Có",
      okType: "primary",
      cancelText: "Không",
      style: {
        top: "50%",
        transform: "translateY(-50%)",
      },
      onOk: async () => {
        try {
          await axiosRequest.post(`/v1/information/update-multi-info`);
          notification.success({
            message: "Cập nhật thông tin thành công",
          });
          onGetListInfo();
        } catch (error: any) {
          notification.error({
            message: "Cập nhật thông tin thất bại",
            description: error.message,
          });
        }
      },
    });
  };

  const columns: TableProps<IInfo>["columns"] = [
    {
      title: "Số thứ tự",
      dataIndex: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Admin quản lý",
      dataIndex: "assignee",
      key: "assignee",
      render: (assignee) => (
        <span className="text-lg font-semibold">{assignee?.userName}</span>
      ),
      hidden: adminInfo?.role !== ERole.SUPER_ADMIN,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="text-lg font-semibold">{text}</span>,
    },
    {
      title: "CCCD",
      dataIndex: "user_id",
      key: "user_id",
      render: (text) => <span className="text-lg font-semibold">{text}</span>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      key: "phone_number",
      render: (text) => (
        <a
          onClick={(e) => {
            e.stopPropagation();
          }}
          href={`tel:${text}`}
          className="text-lg font-semibold text-blue-800 underline"
        >
          {text}
        </a>
      ),
    },
    {
      title: "Số tiền vay",
      key: "loan_amount",
      dataIndex: "loan_amount",
      render: (text) => (
        <span className="text-base">{formatCurrency(text)}</span>
      ),
    },
    {
      title: "Số tiền phải trả",
      key: "amount_payable",
      dataIndex: "amount_payable",
      render: (text) => (
        <span className="text-base">{formatCurrency(text)}</span>
      ),
    },
    {
      title: "Ngày phải trả",
      key: "date_payable",
      dataIndex: "date_payable",
      render: (text) => <span className="text-base">{formatDate(text)}</span>,
    },
    {
      title: "Trạng thái",
      key: "status",
      align: "center",
      dataIndex: "status",
      render: (text) => (
        <span className="text-lg uppercase underline">
          {onGetStatusTag(text)}
        </span>
      ),
    },
    {
      title: "Xóa thông tin",
      key: "deleteInfo",
      dataIndex: "deleteInfo",
      render: (_, info: IInfo) => (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteInfo(info);
          }}
          className="ms-3"
          variant="solid"
          danger
          shape="default"
          icon={<DeleteOutlined />}
        />
      ),
      hidden: !onCheckPermission(adminInfo, EPermission.DELETE, ERole.SYSTEM_ADMIN),
    },
  ];

  const onGetStatusTag = (status: string) => {
    let el;
    switch (status) {
      case DEFINE_STATUS.NOT_PAY:
        el = <Tag color="error">Chưa thanh toán</Tag>;
        break;
      case DEFINE_STATUS.PAYED:
        el = <Tag color="success">Đã thanh toán</Tag>;
        break;
      default:
        el = <Tag color="red-inverse">Quá hạn</Tag>;
        break;
    }
    return el;
  };

  const handleClickRow = (record: IInfo) => {
    navigate(`/admin/edit-info/${record._id}`);
  };

  React.useEffect(() => {
    onGetListInfo();
    if (adminInfo?.role === ERole.SUPER_ADMIN) handleUserSearch("");
  }, [query.page, query.limit, query.assigneeIds]);

  return (
    <>
      <style>{customCheckboxStyle}</style>

      {/* ── Row 1: Action Bar ── */}
      <div className="w-full flex justify-between items-center mb-3">
        {/* Left: Primary create action */}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          hidden={!onCheckPermission(adminInfo, EPermission.CREATE, ERole.SYSTEM_ADMIN)}
          onClick={() => navigate(DEFINE_ROUTER.newInfo)}
        >
          Thêm mới thông tin
        </Button>

        {/* Right: CSV tools + maintenance */}
        <div className="flex items-center gap-2">
          <Button
            icon={<DownloadOutlined />}
            loading={exportLoading}
            onClick={handleExportCsv}
          >
            Xuất CSV
          </Button>
          <Button
            icon={<UploadOutlined />}
            hidden={!onCheckPermission(adminInfo, EPermission.CREATE, ERole.SYSTEM_ADMIN)}
            onClick={() => setImportModalOpen(true)}
          >
            Import CSV
          </Button>
          <Button
            icon={<HistoryOutlined />}
            hidden={adminInfo?.role !== ERole.SUPER_ADMIN}
            onClick={() => setImportJobsModalOpen(true)}
          >
            Lịch sử Import
          </Button>

          <Divider type="vertical" className="h-6 mx-1" />

          <Tooltip
            title={`Kiểm tra và đánh dấu "Quá hạn" toàn bộ dữ liệu quá ngày ${dayjs().format("DD/MM/YYYY")}`}
          >
            <Button
              icon={<ReloadOutlined />}
              onClick={updateMultipleStatus}
              hidden={!onCheckPermission(adminInfo, EPermission.UPDATE, ERole.SYSTEM_ADMIN)}
            >
              Cập nhật quá hạn
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* ── Row 2: Filter Bar ── */}
      <div className="w-full flex flex-wrap items-center gap-2 mb-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
        <InputSearch
          value={query.nameLike}
          onHandleChange={(value) =>
            setQuery((pre) => ({ ...pre, nameLike: value }))
          }
          placeholder="Tìm kiếm theo tên"
          onSearch={onGetListInfo}
        />
        <InputSearch
          icon={<TeamOutlined />}
          value={query.userId}
          onHandleChange={(value) =>
            setQuery((pre) => ({ ...pre, userId: value }))
          }
          placeholder="Tìm kiếm theo CCCD"
          onSearch={onGetListInfo}
        />
        <InputSearch
          icon={<PhoneOutlined />}
          typeInput="number"
          value={query.phoneNumber}
          onHandleChange={(value) =>
            setQuery((pre) => ({ ...pre, phoneNumber: value }))
          }
          placeholder="Tìm kiếm theo số điện thoại"
          onSearch={onGetListInfo}
        />
        <DatePicker
          className="h-[38px] rounded-2xl"
          placeholder="Tìm kiếm theo ngày trả"
          format={"DD/MM/YYYY"}
          value={query.datePayable}
          onChange={(value) =>
            setQuery((pre) => ({ ...pre, datePayable: value }))
          }
        />
        <Select
          className="min-w-[160px]"
          allowClear
          placeholder="Trạng thái"
          value={query.status}
          onChange={(value) => setQuery((pre) => ({ ...pre, status: value }))}
        >
          <Select.Option value="NOT_PAY">Chưa thanh toán</Select.Option>
          <Select.Option value="PAYED">Đã thanh toán</Select.Option>
          <Select.Option value="OVER_DATE">Quá hạn</Select.Option>
        </Select>
        <Visibility visibility={adminInfo?.role === ERole.SUPER_ADMIN}>
          <Select
            mode="multiple"
            allowClear
            style={{ minWidth: 180 }}
            placeholder="Lọc theo Admin"
            options={adminFilterOptions}
            onChange={(value) =>
              setQuery((prev) => ({ ...prev, assigneeIds: value }))
            }
            filterOption={false}
            value={query.assigneeIds}
          />
        </Visibility>
        <Button type="primary" icon={<SearchOutlined />} onClick={onGetListInfo}>
          Tìm kiếm
        </Button>
      </div>

      {/* ── Row 3: Bulk Actions (contextual) ── */}
      <Visibility visibility={hasSelected && selectedRowKeys.length > 0}>
        <div className="w-full flex items-center gap-2 mb-3 px-4 py-2 bg-blue-50 rounded-xl border border-blue-100">
          <span className="text-sm text-blue-600 font-medium mr-2">
            Đã chọn {selectedRowKeys.length} dòng:
          </span>
          <Visibility
            visibility={adminInfo?.role === ERole.SUPER_ADMIN}
            suspenseComponent={
              <Button
                danger
                icon={<DeleteOutlined />}
                hidden={!onCheckPermission(adminInfo, EPermission.DELETE, ERole.SYSTEM_ADMIN)}
                onClick={deleteMultiple}
              >
                Xóa các hàng đã chọn
              </Button>
            }
          >
            <Select
              showSearch
              placeholder="Chọn Admin để gán"
              optionFilterProp="label"
              onSearch={handleUserSearch}
              filterOption={false}
              options={userOptions}
              onChange={(value) => setSelectedUserId(value)}
              style={{ width: 260 }}
              loading={assignLoading}
            />
            <Button
              type="primary"
              onClick={handleAssignUser}
              disabled={!selectedUserId}
              loading={assignLoading}
            >
              Gán cho ADMIN
            </Button>
            <Divider type="vertical" className="h-5 mx-1" />
            <Button variant="solid" color="danger" icon={<DeleteOutlined />} onClick={deleteMultiple}>
              Xóa các hàng đã chọn
            </Button>
          </Visibility>
        </div>
      </Visibility>
      <Visibility
        visibility={Boolean(listInfo.length)}
        suspenseComponent={loading ? <Spin /> : <Empty />}
      >
        <div className="w-full">
          <Table<IInfo>
            rowSelection={rowSelection}
            rowKey="_id"
            columns={columns}
            dataSource={listInfo}
            style={{
              cursor: "pointer",
            }}
            onRow={(record: IInfo) => ({
              onClick: () => handleClickRow(record),
            })}
            pagination={{
              current: query.page,
              pageSize: query.limit,
              total: total,
              showSizeChanger: true,
              pageSizeOptions: ['5','10', '20', '50', '100'],
              showTotal(total, range) {
                return `${range[0]}-${range[1]} trong tổng số ${total} bản ghi`;
              },
              onChange: (page: number, limit: number) => {
                setQuery((pre) => ({
                  ...pre,
                  page,
                  limit,
                }));
              },
            }}
          />
        </div>
      </Visibility>

      <CsvImportModal
        open={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        onSuccess={onGetListInfo}
      />
      <CsvImportJobsModal
        open={importJobsModalOpen}
        onClose={() => setImportJobsModalOpen(false)}
      />
    </>
  );
}
