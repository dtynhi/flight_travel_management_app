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

  // Helper function to get status color and label
  const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return { color: 'green', label: 'Hoạt động' };
      case 'cancelled':
        return { color: 'red', label: 'Đã hủy' };
      case 'scheduled':
        return { color: 'blue', label: 'Hoàn thành' };
      default:
        return { color: 'default', label: status || 'N/A' };
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
      title: 'Đến',
      dataIndex: 'arrivalTime',
      key: 'arrivalTime',
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
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center',
      render: (status: string) => {
        const { color, label } = getStatusConfig(status);
        return (
          <Tag color={color} className="text-xs font-medium">
            {label}
          </Tag>
        );
      }
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