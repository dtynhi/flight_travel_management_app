import React from 'react';
import dayjs from 'dayjs';

import type { IFlightSearchParams } from '~/types/app/flight-search.type';

interface IFlightSearchSummaryProps {
  searchParams: IFlightSearchParams;
  totalFlights: number;
}

const FlightSearchSummary: React.FC<IFlightSearchSummaryProps> = ({
  searchParams,
  totalFlights
}) => {
  const hasSearchCriteria = searchParams.departureAirport || 
                           searchParams.arrivalAirport || 
                           searchParams.flightDate;

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-800">
        {hasSearchCriteria ? `Kết quả tìm kiếm: ${totalFlights} chuyến bay` : `Tất cả chuyến bay: ${totalFlights} chuyến bay`}
      </h2>
      
      {hasSearchCriteria && (
        <div className="text-sm text-gray-600">
          Lọc theo: 
          {searchParams.departureAirport && ` Từ: ${searchParams.departureAirport}`}
          {searchParams.arrivalAirport && ` Đến: ${searchParams.arrivalAirport}`}
          {searchParams.flightDate && ` Ngày: ${dayjs(searchParams.flightDate).format('DD/MM/YYYY')}`}
        </div>
      )}
    </div>
  );
};

export default FlightSearchSummary;