import { useState } from 'react';
import { App } from 'antd';

import type { IFlight, IFlightSearchParams } from '~/types/app/flight-search.type';
import flightApi from '~/api/app/flight.api';

interface IUseFlightSearchReturn {
  searchResults: IFlight[];
  loading: boolean;
  error: string | null;
  searchPerformed: boolean;
  searchFlights: (params: IFlightSearchParams) => Promise<void>;
  clearResults: () => void;
}

const useFlightSearch = (): IUseFlightSearchReturn => {
  const { message } = App.useApp();
  const [searchResults, setSearchResults] = useState<IFlight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const searchFlights = async (params: IFlightSearchParams) => {
    // Validation: at least one criteria must be filled
    if (!params.departureAirport && !params.arrivalAirport && !params.flightDate) {
      message.warning('Vui lòng nhập ít nhất một tiêu chí tìm kiếm');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      console.log('🔍 Searching flights with params:', params);

      // Use your backend API
      const response = await flightApi.searchFlights(params);
      
      console.log('Flight Search API Response:', response.data);

      // Your backend returns: { data: { flights: [...], total: number } }
      const searchResults = response.data.data?.flights || [];
      
      console.log('Processed search results:', searchResults);

      setSearchResults(searchResults);
      setSearchPerformed(true);
      
      if (searchResults.length === 0) {
        message.info('Không tìm thấy chuyến bay nào phù hợp');
      } else {
        message.success(`Tìm thấy ${searchResults.length} chuyến bay`);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Lỗi khi tìm kiếm chuyến bay';
      setError(errorMessage);
      message.error(errorMessage);
      console.error('Flight search error:', err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setSearchResults([]);
    setSearchPerformed(false);
    setError(null);
  };

  return {
    searchResults,
    loading,
    error,
    searchPerformed,
    searchFlights,
    clearResults
  };
};

export default useFlightSearch;