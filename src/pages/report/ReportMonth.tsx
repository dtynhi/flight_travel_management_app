// src/pages/report/ReportMonth.tsx
import React from 'react';
import { Table, Select, Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getMonthlyReports } from '~/api/app/report.api';

const { Option } = Select;

interface MonthlyReport {
  id: number;
  year: number;
  month: number;
  total_tickets_sold: number;
  total_revenue: number;
}

const ReportMonth = () => {
  const [year, setYear] = React.useState<number>(2025);
  const [month, setMonth] = React.useState<number>(6);

  const { data, isLoading, error } = useQuery<MonthlyReport[]>({
    queryKey: ['monthlyReports', year, month],
    queryFn: () => getMonthlyReports(year, month),
  });

  const columns = [
    { title: 'Mã báo cáo', dataIndex: 'id' },
    { title: 'Số vé đã bán', dataIndex: 'total_tickets_sold' },
    {
      title: 'Doanh thu',
      dataIndex: 'total_revenue',
      render: (value: number) => `${value.toLocaleString('vi-VN')} ₫`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-center mb-8">
        LẬP BÁO CÁO THÁNG
      </h1>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-2xl">
        <div className="flex justify-between mb-6">
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value) || 2025)} // Đảm bảo giá trị là số, mặc định 2025 nếu không hợp lệ
            className="w-32 p-2 border border-purple-300 rounded-lg focus:border-purple-500 text-gray-700"
            placeholder="Nhập năm"
          />
          <Select
            value={month}
            onChange={setMonth}
            className="w-32 border border-purple-300 rounded-lg focus:border-purple-500"
            placeholder="Tháng"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <Option key={m} value={m} className="text-gray-700">
                Tháng {m}
              </Option>
            ))}
          </Select>
        </div>
        <Table
          columns={columns}
          dataSource={data || []}
          loading={isLoading}
          rowKey="id"
          pagination={false}
          locale={{ emptyText: 'Không có dữ liệu' }}
          className="shadow-lg rounded-lg"
        />
      </div>
    </div>
  );
};

export default ReportMonth;