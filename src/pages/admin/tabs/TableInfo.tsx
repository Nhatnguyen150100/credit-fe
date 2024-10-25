import * as React from "react";
import { toast } from "react-toast";
import {
  Button,
  DatePicker,
  Empty,
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
  PhoneOutlined,
  PlusOutlined,
  TeamOutlined,
} from "@ant-design/icons";
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

export default function TableInfo() {
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
  });
  const [total, setTotal] = React.useState(0);
  const navigate = useNavigate();

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

  const deleteMultiple = async () => {
    Modal.confirm({
      title: "Bạn có muốn xóa các thông tin đã chọn này này",
      okText: "Có",
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
          toast.success(rs.data.message);
        } catch (error: any) {
          toast.error(error.message);
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
          color="danger"
          shape="default"
          icon={<DeleteOutlined />}
        />
      ),
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
  }, [query.page, query.limit]);

  return (
    <>
      <div className="w-full flex justify-between items-center mb-5">
        <div className="flex-grow flex justify-start items-center space-x-3">
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
            className=" h-[38px] rounded-2xl"
            placeholder="Tìm kiếm theo ngày trả"
            format={"DD/MM/YYYY"}
            value={query.datePayable}
            onChange={(value) =>
              setQuery((pre) => ({
                ...pre,
                datePayable: value,
              }))
            }
          />
          <Select
            className="min-w-[160px]"
            allowClear
            placeholder="Tìm kiếm theo trạng thái"
            value={query.status}
            onChange={(value) => setQuery((pre) => ({ ...pre, status: value }))}
          >
            <Select.Option value="NOT_PAY">Chưa thanh toán</Select.Option>
            <Select.Option value="PAYED">Đã thanh toán</Select.Option>
            <Select.Option value="OVER_DATE">Quá hạn</Select.Option>
          </Select>
          <Button type="primary" color="primary" onClick={onGetListInfo}>
            Tìm kiếm
          </Button>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          iconPosition="start"
          onClick={() => {
            navigate(DEFINE_ROUTER.newInfo);
          }}
        >
          Thêm mới thông tin
        </Button>
      </div>
      <Visibility visibility={hasSelected && selectedRowKeys.length > 1}>
        <div className="w-full flex justify-start items-center mb-5">
          <Button
            variant="solid"
            color="danger"
            shape="default"
            icon={<DeleteOutlined />}
            iconPosition="end"
            onClick={deleteMultiple}
          >
            Xóa các hàng đã chọn
          </Button>
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
    </>
  );
}
