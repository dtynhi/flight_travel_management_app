// src/pages/report/ReportMonth.tsx
import React from 'react';
import { Table, Select, Button } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getMonthlyReports } from '~/api/app/report.api';
import * as XLSX from 'xlsx'; 
import saveAs from 'file-saver'; 

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

  const { data, isLoading } = useQuery<MonthlyReport[]>({
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

  // Hàm xuất file Excel
  const exportToExcel = () => {
    if (!data || data.length === 0) {
      alert('Không có dữ liệu để xuất!');
      return;
    }

    // Chuẩn bị dữ liệu cho Excel
    const worksheetData = data.map((item) => ({
      'Mã báo cáo': item.id,
      'Số vé đã bán': item.total_tickets_sold,
      'Doanh thu': `${item.total_revenue.toLocaleString('vi-VN')} ₫`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Báo cáo tháng');

    // Tạo file và tải về
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(file, `Bao_cao_thang_${year}_${month}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-center mb-8">
        BÁO CÁO THÁNG
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