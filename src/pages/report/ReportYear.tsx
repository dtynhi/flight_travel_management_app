// src/pages/report/ReportYear.tsx
import React from 'react';
import { Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getYearlyReports } from '~/api/app/report.api';


interface YearlyReport {
  year: number;
  month: number;
  number_of_flights: number;
  total_revenue: number;
  percentage: number;
}

const ReportYear = () => {
  const [year, setYear] = React.useState<number>(2025);

  const { data, isLoading, error } = useQuery<YearlyReport[]>({
    queryKey: ['yearlyReports', year],
    queryFn: () => getYearlyReports(year),
  });

  const columns = [
    { title: 'Tháng', dataIndex: 'month' },
    { title: 'Số chuyến bay', dataIndex: 'number_of_flights' },
    {
      title: 'Doanh thu',
      dataIndex: 'total_revenue',
      render: (value: number) => `${value.toLocaleString('vi-VN')} ₫`,
    },
    {
      title: 'Tỉ lệ (%)',
      dataIndex: 'percentage',
      render: (value: number) => `${(value * 100).toFixed(2)} %`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-center mb-8">
        LẬP BÁO CÁO NĂM
      </h1>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-2xl">
        <div className="mb-6">
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value) || 2025)} // Đảm bảo giá trị là số, mặc định 2025 nếu không hợp lệ
            className="w-32 p-2 border border-purple-300 rounded-lg focus:border-purple-500 text-gray-700"
            placeholder="Nhập năm"
          />
        </div>
        <Table
          columns={columns}
          dataSource={data || []}
          loading={isLoading}
          rowKey={(record) => `${record.year}-${record.month}`}
          pagination={false}
          locale={{ emptyText: 'Không có dữ liệu' }}
          className="shadow-lg rounded-lg"
        />
      </div>
    </div>
  );
};

export default ReportYear;