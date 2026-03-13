import React, { useState, useEffect } from "react";
import { Modal, Table, Tag } from "antd";
import axiosRequest from "../plugins/request";
import { formatDate } from "../utils/day-format";

interface ImportJob {
  _id: string;
  fileName: string;
  status: "pending" | "processing" | "completed" | "failed";
  totalRows: number;
  processedRows: number;
  inserted: number;
  createdBy: string;
  createdAt: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const statusTag = (status: ImportJob["status"]) => {
  const map: Record<string, { color: string; text: string }> = {
    pending: { color: "default", text: "Chờ xử lý" },
    processing: { color: "processing", text: "Đang xử lý" },
    completed: { color: "success", text: "Hoàn tất" },
    failed: { color: "error", text: "Thất bại" },
  };
  const { color, text } = map[status] || { color: "default", text: status };
  return <Tag color={color}>{text}</Tag>;
};

export default function CsvImportJobsModal({ open, onClose }: Props) {
  const [jobs, setJobs] = useState<ImportJob[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const rs = await axiosRequest.get("/v1/information/import-jobs", {
        params: { page, limit: 10 },
      });
      setJobs(rs.data.data);
      setTotal(rs.data.totalItems);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) fetchJobs();
  }, [open, page]);

  const columns = [
    {
      title: "Tên file",
      dataIndex: "fileName",
      key: "fileName",
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: statusTag,
    },
    {
      title: "Tiến độ",
      key: "progress",
      render: (_: any, r: ImportJob) =>
        r.totalRows ? `${r.processedRows}/${r.totalRows}` : "-",
    },
    {
      title: "Đã insert",
      dataIndex: "inserted",
      key: "inserted",
    },
    {
      title: "Người tạo",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (v: string) => formatDate(v),
    },
  ];

  return (
    <Modal
      title="Lịch sử Import CSV"
      open={open}
      onCancel={onClose}
      footer={null}
      width={860}
    >
      <Table
        size="small"
        columns={columns}
        dataSource={jobs}
        rowKey="_id"
        loading={loading}
        pagination={{
          current: page,
          pageSize: 10,
          total,
          onChange: (p) => setPage(p),
        }}
      />
    </Modal>
  );
}
