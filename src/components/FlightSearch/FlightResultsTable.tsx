import React from 'react';
import { Table } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import type { IFlightResultsTableProps } from '~/types/app/flight-search.type';
import useFlightSeats from '~/hooks/useFlightSeats';
import { createFlightTableColumns } from './config/tableColumns';
import FlightSearchSummary from './FlightSearchSummary';

const FlightResultsTable: React.FC<IFlightResultsTableProps> = ({
  flights,
  loading,
  searchPerformed,
  searchParams
}) => {
  const navigate = useNavigate();
  const { flightsWithSeats, seatDataLoading } = useFlightSeats(flights);
  
  const columns = createFlightTableColumns({ seatDataLoading });

  const handleRowClick = (record: any) => {
    window.open(`/flight/${record.id}`, '_blank');
  };

  if (!searchPerformed) {
    return null;
  }

  return (
    <div className="space-y-4">
      <FlightSearchSummary 
        searchParams={searchParams}
        totalFlights={flights.length}
      />

      <Table
        columns={columns}
        dataSource={flightsWithSeats}
        loading={loading || seatDataLoading}
        rowKey={(record) => record.id}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          style: { cursor: 'pointer' },
          className: 'hover:bg-blue-50'
        })}
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
              <p className="text-gray-500">
                Không tìm thấy chuyến bay nào phù hợp với tiêu chí tìm kiếm
              </p>
            </div>
          )
        }}
        scroll={{ x: 910 }}
        className="border border-gray-200 rounded-lg"
        size="small"
      />
    </div>
  );
};

export default FlightResultsTable;