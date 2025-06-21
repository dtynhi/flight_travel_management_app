// src/pages/report/ReportYear.tsx
import React from 'react';
import { Table, Button } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getYearlyReports } from '~/api/app/report.api';
import * as XLSX from 'xlsx'; // Import xlsx
import saveAs from 'file-saver'; // Import file-saver

interface YearlyReport {
  year: number;
  month: number;
  number_of_flights: number;
  total_revenue: number;
  percentage: number;
}

const ReportYear = () => {
  const [year, setYear] = React.useState<number>(2025);

  const { data, isLoading } = useQuery<YearlyReport[]>({
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

  // Hàm xuất file Excel
  const exportToExcel = () => {
    if (!data || data.length === 0) {
      alert('Không có dữ liệu để xuất!');
      return;
    }

    try {
      const worksheetData = data.map((item) => ({
        'Tháng': item.month,
        'Số chuyến bay': item.number_of_flights,
        'Doanh thu': `${item.total_revenue.toLocaleString('vi-VN')} ₫`,
        'Tỉ lệ (%)': `${(item.percentage * 100).toFixed(2)} %`,
      }));

      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Báo cáo năm');

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const file = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
      });
      saveAs(file, `Bao_cao_nam_${year}.xlsx`);
    } catch (error) {
      console.error('Lỗi khi xuất Excel:', error);
      alert('Đã xảy ra lỗi khi xuất file Excel. Vui lòng kiểm tra console.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-center mb-8">
        BÁO CÁO NĂM
      </h1>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-2xl">
        <div className="flex justify-between mb-6 items-center">
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value) || 2025)}
            className="w-32 p-2 border border-purple-300 rounded-lg focus:border-purple-500 text-gray-700"
            placeholder="Nhập năm"
          />
          <Button
            type="primary"
            onClick={exportToExcel}
            className="bg-gradient-to-r from-purple-600 to-purple-400 text-white hover:opacity-90"
            disabled={isLoading || !data || data.length === 0}
          >
            Xuất Excel
          </Button>
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