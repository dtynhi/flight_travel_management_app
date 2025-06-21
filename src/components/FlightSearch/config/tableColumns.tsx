import React from 'react';
import { Tag, Tooltip } from 'antd';
import { EnvironmentOutlined, UserOutlined, CheckCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import type { IFlightWithSeats } from '~/hooks/useFlightSeats';
import { timeUtil } from '~/utils';

interface ICreateColumnsProps {
  seatDataLoading: boolean;
}

export const createFlightTableColumns = ({ seatDataLoading }: ICreateColumnsProps): ColumnsType<IFlightWithSeats> => {
  // Format date and time using project's time utility
  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'N/A';
    
    try {
      const parsedDate = timeUtil.parseDateTimeStr(dateString);
      if (!parsedDate) return dateString;
      
      return timeUtil.format(parsedDate, 'DD/MM/YY HH:mm');
    } catch (error) {
      console.error('Date formatting error:', error);
      return dateString;
    }
  };

  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
      align: 'center',
      render: (id: any) => (
        <span className="text-sm font-medium">{id || 'N/A'}</span>
      )
    },
    // {
    //   title: 'Mã CB',
    //   dataIndex: 'flightCode',
    //   key: 'flightCode',
    //   width: 100,
    //   align: 'center',
    //   render: (flightCode: string) => (
    //     <Tag color="blue" className="font-medium text-xs">
    //       {flightCode || 'N/A'}
    //     </Tag>
    //   )
    // },
    {
      title: 'Sân bay đi',
      dataIndex: 'departureAirport',
      key: 'departureAirport',
      width: 140,
      ellipsis: {
        showTitle: false,
      },
      render: (airport: string) => (
        <Tooltip placement="topLeft" title={airport || 'N/A'}>
          <div className="flex items-center space-x-1">
            <EnvironmentOutlined className="text-blue-500 text-xs" />
            <span className="text-sm truncate">{airport || 'N/A'}</span>
          </div>
        </Tooltip>
      )
    },
    {
      title: 'Sân bay đến',
      dataIndex: 'arrivalAirport',
      key: 'arrivalAirport',
      width: 140,
      ellipsis: {
        showTitle: false,
      },
      render: (airport: string) => (
        <Tooltip placement="topLeft" title={airport || 'N/A'}>
          <div className="flex items-center space-x-1">
            <EnvironmentOutlined className="text-green-500 text-xs" />
            <span className="text-sm truncate">{airport || 'N/A'}</span>
          </div>
        </Tooltip>
      )
    },
    {
      title: 'Khởi hành',
      dataIndex: 'departureTime',
      key: 'departureTime',
      width: 120,
      render: (time: string) => (
        <span className="text-sm">{formatDateTime(time)}</span>
      )
    },
    {
      title: 'T.gian bay',
      dataIndex: 'flightDuration',
      key: 'flightDuration',
      width: 80,
      align: 'center',
      render: (duration: string) => (
        <span className="text-sm">{duration || 'N/A'}</span>
      )
    },
    {
      title: 'Ghế trống',
      key: 'emptySeats',
      width: 90,
      align: 'center',
      render: (_, record: IFlightWithSeats) => {
        const availableSeats = record.seatData?.availableSeats ?? 0;
        return (
          <div className="flex items-center justify-center space-x-1">
            <UserOutlined className="text-green-500 text-xs" />
            <span className="font-medium text-green-600 text-sm">
              {seatDataLoading ? '...' : availableSeats}
            </span>
          </div>
        );
      }
    },
    {
      title: 'Đã đặt',
      key: 'reservedSeats',
      width: 80,
      align: 'center',
      render: (_, record: IFlightWithSeats) => {
        const reservedSeats = record.seatData?.reservedSeats ?? 0;
        return (
          <div className="flex items-center justify-center space-x-1">
            <CheckCircleOutlined className="text-orange-500 text-xs" />
            <span className="font-medium text-orange-600 text-sm">
              {seatDataLoading ? '...' : reservedSeats}
            </span>
          </div>
        );
      }
    }
  ];
};