import * as React from "react";
import { toast } from "react-toast";
import {
  Button,
  Empty,
  Modal,
  notification,
  Spin,
  Table,
  TableProps,
  Tag,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { IInfo } from "../../../types/info";
import axiosRequest from "../../../plugins/request";
import onRemoveParams from "../../../utils/remove-params";
import { formatCurrency } from "../../../utils/format-money";
import { formatDate } from "../../../utils/day-format";
import BaseSearch from "../../../components/BaseSearch";
import DEFINE_ROUTER from "../../../constants/router-define";
import Visibility from "../../../components/visibility";
import DEFINE_STATUS from "../../../constants/status";

export default function TableInfo() {
  const [listInfo, setListInfo] = React.useState<IInfo[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState({
    nameLike: "",
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
      title: "Index",
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
          {text === DEFINE_STATUS.NOT_PAY ? (
            <Tag color="error">Chưa thanh toán</Tag>
          ) : (
            <Tag color="success">Đã thanh toán</Tag>
          )}
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

  const handleClickRow = (record: IInfo) => {
    navigate(`/admin/edit-info/${record._id}`);
  };

  React.useEffect(() => {
    if (!query.nameLike) onGetListInfo();
  }, [query.nameLike]);

  React.useEffect(() => {
    onGetListInfo();
  }, [query.page, query.limit]);

  return (
    <>
      <div className="w-full flex justify-between items-center mb-5">
        <BaseSearch
          value={query.nameLike!}
          placeholder="Nhập tên hoặc CCCD để tìm kiếm"
          onHandleChange={(value) => {
            setQuery({ ...query, nameLike: value });
          }}
          onSearch={() => onGetListInfo()}
        />
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
      <Visibility
        visibility={Boolean(listInfo.length)}
        suspenseComponent={loading ? <Spin /> : <Empty />}
      >
        <div className="w-full">
          <Table<IInfo>
            rowKey="id"
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
