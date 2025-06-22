import React, { useState } from 'react';
import { Card } from 'antd';

import type { IFlightSearchParams } from '~/types/app/flight-search.type';
import useAirport from '~/hooks/useAirport';
import useFlightSearch from '~/hooks/useFlightSearch';
import { FlightSearchForm, FlightResultsTable } from '~/components/FlightSearch';

const FlightSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useState<IFlightSearchParams>({});

  const { airports } = useAirport();
  const { searchResults: flights, loading, searchPerformed, searchFlights, clearResults } = useFlightSearch();

  const handleParamChange = (field: keyof IFlightSearchParams, value: string) => {
    setSearchParams((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = async () => {
    await searchFlights(searchParams);
  };

  const handleReset = () => {
    setSearchParams({});
    clearResults();
  };

  return (
    <div className='max-w-7xl mx-auto p-6 space-y-6'>
      {/* Page Header */}
      <div className='text-center'>
        <h1 className='text-3xl font-bold text-purple-600 mb-2'>Tra cứu chuyến bay</h1>
        <p className='text-gray-600'>Tìm kiếm thông tin chuyến bay nhanh chóng và chính xác</p>
      </div>

      {/* Search Form */}
      <Card className='shadow-sm'>
        <FlightSearchForm
          searchParams={searchParams}
          airports={airports}
          loading={loading}
          onParamChange={handleParamChange}
          onSearch={handleSearch}
          onReset={handleReset}
        />
      </Card>

      {/* Results Table */}
      {searchPerformed && (
        <Card className='shadow-sm'>
          <FlightResultsTable flights={flights} loading={loading} searchPerformed={searchPerformed} searchParams={searchParams} />
        </Card>
      )}
    </div>
  );
};

export default FlightSearchPage;
