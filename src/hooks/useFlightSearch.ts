import { useState } from 'react';
import { message } from 'antd';
import axios from 'axios';

import type { IFlight, IFlightSearchParams } from '~/types/app/flight-search.type';

interface IUseFlightSearchReturn {
  searchResults: IFlight[];
  loading: boolean;
  error: string | null;
  searchPerformed: boolean;
  searchFlights: (params: IFlightSearchParams) => Promise<void>;
  clearResults: () => void;
}

const useFlightSearch = (): IUseFlightSearchReturn => {
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
      // Build query parameters
      const queryParams = new URLSearchParams();
      
      if (params.departureAirport) {
        queryParams.append('departureAirport', params.departureAirport);
      }
      if (params.arrivalAirport) {
        queryParams.append('arrivalAirport', params.arrivalAirport);
      }
      if (params.flightDate) {
        queryParams.append('flightDate', params.flightDate);
      }

      console.log('🔍 Searching flights with params:', queryParams.toString());

      // Call search API
      const response = await axios.get(
        `http://localhost:5000/api/v1/flight/search?${queryParams.toString()}`
      );

      console.log('Flight Search API Response:', response.data);

      // Extract flights from the nested response structure
      let searchResults = [];
      
      if (response.data && response.data.data) {
        if (response.data.data.flights && Array.isArray(response.data.data.flights)) {
          searchResults = response.data.data.flights;
        } else if (Array.isArray(response.data.data)) {
          searchResults = response.data.data;
        }
      }

      console.log('Processed search results:', searchResults);

      setSearchResults(searchResults);
      setSearchPerformed(true);
      
      if (searchResults.length === 0) {
        message.info('Không tìm thấy chuyến bay nào phù hợp');
      } else {
        message.success(`Tìm thấy ${searchResults.length} chuyến bay`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Lỗi khi tìm kiếm chuyến bay';
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