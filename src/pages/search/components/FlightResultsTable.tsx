import React from 'react';
import { Table } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

import type { IFlightResultsTableProps, IFlight } from '~/types/app/flight-search.type';

const FlightResultsTable: React.FC<IFlightResultsTableProps> = ({
  flights,
  loading,
  searchPerformed,
  searchParams
}) => {
  // Format date and time
  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      
      return date.toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return dateString;
    }
  };

  // Table columns
  const columns: ColumnsType<IFlight> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      align: 'center',
      render: (id: any) => id || 'N/A'
    },
    {
      title: 'Sân bay đi',
      dataIndex: 'departureAirport',
      key: 'departureAirport',
      width: 250,
      ellipsis: true,
      render: (airport: string) => (
        <div className="flex items-center space-x-2">
          <EnvironmentOutlined className="text-blue-500" />
          <span>{airport || 'N/A'}</span>
        </div>
      )
    },
    {
      title: 'Sân bay đến',
      dataIndex: 'arrivalAirport',
      key: 'arrivalAirport',
      width: 250,
      ellipsis: true,
      render: (airport: string) => (
        <div className="flex items-center space-x-2">
          <EnvironmentOutlined className="text-green-500" />
          <span>{airport || 'N/A'}</span>
        </div>
      )
    },
    {
      title: 'Thời gian khởi hành',
      dataIndex: 'departureTime',
      key: 'departureTime',
      width: 180,
      render: (time: string) => formatDateTime(time)
    },
    {
      title: 'Thời gian bay',
      dataIndex: 'flightDuration',
      key: 'flightDuration',
      width: 120,
      align: 'center',
      render: (duration: string) => duration || 'N/A'
    }
  ];

  if (!searchPerformed) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Kết quả tìm kiếm: {flights.length} chuyến bay
        </h2>
        
        {/* Search Summary */}
        {(searchParams.departureAirport || searchParams.arrivalAirport || searchParams.flightDate) && (
          <div className="text-sm text-gray-600">
            Tìm kiếm: 
            {searchParams.departureAirport && ` Từ: ${searchParams.departureAirport}`}
            {searchParams.arrivalAirport && ` Đến: ${searchParams.arrivalAirport}`}
            {searchParams.flightDate && ` Ngày: ${dayjs(searchParams.flightDate).format('DD/MM/YYYY')}`}
          </div>
        )}
      </div>

      <Table
        columns={columns}
        dataSource={flights}
        loading={loading}
        rowKey={(record) => record.id || Math.random()}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} của ${total} chuyến bay`,
          pageSizeOptions: ['5', '10', '20', '50']
        }}
        locale={{
          emptyText: (
            <div className="text-center py-8">
              <EnvironmentOutlined className="text-4xl text-gray-300 mb-2" />
              <p className="text-gray-500">Không tìm thấy chuyến bay nào phù hợp với tiêu chí tìm kiếm</p>
            </div>
          )
        }}
        scroll={{ x: 1000 }}
        className="border border-gray-200 rounded-lg"
        size="middle"
      />
    </div>
  );
};

export default FlightResultsTable;