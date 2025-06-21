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
        {/* Departure Airport */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Sân bay khởi hành
          </label>
          <AutoComplete
            className="w-full"
            placeholder="Chọn sân bay khởi hành"
            value={searchParams.departureAirport}
            options={filterAirports(searchParams.departureAirport || '')}
            onSearch={(value) => onParamChange('departureAirport', value)}
            onSelect={(value) => onParamChange('departureAirport', value)}
            allowClear
          />
        </div>

        {/* Arrival Airport */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Sân bay đến
          </label>
          <AutoComplete
            className="w-full"
            placeholder="Chọn sân bay đến"
            value={searchParams.arrivalAirport}
            options={filterAirports(searchParams.arrivalAirport || '')}
            onSearch={(value) => onParamChange('arrivalAirport', value)}
            onSelect={(value) => onParamChange('arrivalAirport', value)}
            allowClear
          />
        </div>

        {/* Flight Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Ngày bay
          </label>
          <DatePicker
            className="w-full"
            placeholder="Chọn ngày bay"
            value={searchParams.flightDate ? dayjs(searchParams.flightDate) : null}
            onChange={handleDateChange}
            format="DD/MM/YYYY"
            allowClear
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={onSearch}
          loading={loading}
          size="large"
          className="px-8"
        >
          Tìm kiếm
        </Button>
        <Button
          icon={<ReloadOutlined />}
          onClick={onReset}
          size="large"
          className="px-8"
        >
          Đặt lại
        </Button>
      </div>
    </div>
  );
};

export default FlightSearchForm;