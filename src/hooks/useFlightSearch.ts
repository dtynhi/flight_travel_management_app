import { useState } from 'react';
import { App } from 'antd';

import type { IFlightSearchParams } from '~/types/app/flight-search.type';
import flightApi from '~/api/app/flight.api';
import IFlight from '~/types/app/flight.type';

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
      const response = await flightApi.searchFlights(params);

      const searchResults = response.data.data?.flights || [];

      setSearchResults(searchResults);
      setSearchPerformed(true);

      if (searchResults.length === 0) {
        message.info('Không tìm thấy chuyến bay nào phù hợp');
      } else {
        message.success(`Tìm thấy ${searchResults.length} chuyến bay`);
      }
    } catch (err: unknown) {
      interface ErrorWithResponse {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      }
      let errorMessage = 'Lỗi khi tìm kiếm chuyến bay';
      if (typeof err === 'object' && err !== null) {
        const typedErr = err as ErrorWithResponse;
        if (typedErr.response?.data?.message && typeof typedErr.response.data.message === 'string') {
          errorMessage = typedErr.response.data.message;
        } else if (typedErr.message && typeof typedErr.message === 'string') {
          errorMessage = typedErr.message;
        }
      }
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
