import React from 'react';
import { Button, Space, DatePicker, AutoComplete } from 'antd';
import { SearchOutlined, ReloadOutlined, EnvironmentOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import type { IFlightSearchFormProps, IFlightSearchParams } from '~/types/app/flight-search.type';

const FlightSearchForm: React.FC<IFlightSearchFormProps> = ({
  searchParams,
  airports,
  loading,
  onParamChange,
  onSearch,
  onReset
}) => {
  // Handle date change
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    const dateString = date ? date.format('YYYY-MM-DD') : '';
    onParamChange('flightDate', dateString);
  };

  // Filter airports for autocomplete
  const filterAirports = (inputValue: string) => {
    return airports
      .filter(airport => 
        airport.airportName.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map(airport => ({
        value: airport.airportName,
        label: (
          <div className="flex items-center space-x-2">
            <EnvironmentOutlined className="text-purple-500" />
            <span>{airport.airportName}</span>
          </div>
        ),
        key: airport.id
      }));
  };

  return (
    <div className="space-y-6">
      {/* Search Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <EnvironmentOutlined className="mr-1 text-blue-500" />
            Sân bay khởi hành
          </label>
          <AutoComplete
            className="w-full"
            placeholder="Nhập tên sân bay khởi hành..."
            value={searchParams.departureAirport || ''}
            onChange={(value) => onParamChange('departureAirport', value)}
            options={filterAirports(searchParams.departureAirport || '')}
            filterOption={false}
            allowClear
            showSearch
            notFoundContent={
              <div className="text-center py-2 text-gray-500">
                Không tìm thấy sân bay
              </div>
            }
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <EnvironmentOutlined className="mr-1 text-green-500" />
            Sân bay đến
          </label>
          <AutoComplete
            className="w-full"
            placeholder="Nhập tên sân bay đến..."
            value={searchParams.arrivalAirport || ''}
            onChange={(value) => onParamChange('arrivalAirport', value)}
            options={filterAirports(searchParams.arrivalAirport || '')}
            filterOption={false}
            allowClear
            showSearch
            notFoundContent={
              <div className="text-center py-2 text-gray-500">
                Không tìm thấy sân bay
              </div>
            }
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            📅 Ngày khởi hành
          </label>
          <DatePicker
            placeholder="Chọn ngày khởi hành"
            className="w-full focus:border-purple-400"
            value={searchParams.flightDate ? dayjs(searchParams.flightDate) : null}
            onChange={handleDateChange}
            format="DD/MM/YYYY"
            allowClear
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center">
        <Space size="middle">
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={onSearch}
            icon={<SearchOutlined />}
            className="bg-purple-600 hover:bg-purple-700 border-purple-600"
          >
            {loading ? 'Đang tìm kiếm...' : 'Tra cứu'}
          </Button>
          
          <Button
            size="large"
            onClick={onReset}
            icon={<ReloadOutlined />}
            className="border-gray-300 text-gray-600 hover:border-gray-400"
          >
            Đặt lại
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default FlightSearchForm;