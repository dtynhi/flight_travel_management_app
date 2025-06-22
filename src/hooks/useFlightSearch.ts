import { useState, useCallback } from 'react';
import { App } from 'antd';

import type { IFlightSearchParams } from '~/types/app/flight-search.type';
import flightApi from '~/api/app/flight.api';
import IFlight from '~/types/app/flight.type';

interface IUseFlightSearchReturn {
  searchResults: IFlight[];
  allFlights: IFlight[];
  loading: boolean;
  error: string | null;
  searchPerformed: boolean;
  searchFlights: (params: IFlightSearchParams) => Promise<void>;
  clearResults: () => void;
  loadAllFlights: () => Promise<void>;
}

const useFlightSearch = (): IUseFlightSearchReturn => {
  const { message } = App.useApp();
  const [allFlights, setAllFlights] = useState<IFlight[]>([]);
  const [searchResults, setSearchResults] = useState<IFlight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Memoize loadAllFlights to prevent unnecessary re-renders
  const loadAllFlights = useCallback(async () => {
    // Prevent multiple calls
    if (loading || hasInitialized) {
      console.log('Skipping loadAllFlights - already loading or initialized');
      return;
    }

    setLoading(true);
    setError(null);
    setHasInitialized(true);

    try {
      console.log('Loading all flights...');
      const response = await flightApi.getAllFlights();
      console.log('API Response:', response);

      const flights = response.data.data || [];
      console.log('Extracted flights:', flights);

      setAllFlights(flights);
      setSearchResults(flights);
      setSearchPerformed(true);

      if (flights.length === 0) {
        console.log('No flights found in response');
        message.info('Chưa có chuyến bay nào trong hệ thống');
      } else {
        console.log(`Loaded ${flights.length} flights successfully`);
      }
    } catch (err: unknown) {
      console.error('Load flights error:', err);
      setHasInitialized(false); // Reset on error so it can be retried

      interface ErrorWithResponse {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      }
      let errorMessage = 'Lỗi khi tải danh sách chuyến bay';
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
      setAllFlights([]);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, [loading, hasInitialized, message]);

  const searchFlights = useCallback(
    async (params: IFlightSearchParams) => {
      // If no search criteria, show all flights
      if (!params.departureAirport && !params.arrivalAirport && !params.flightDate) {
        setSearchResults(allFlights);
        setSearchPerformed(true);
        return;
      }

      // Filter flights based on search criteria
      const filteredFlights = allFlights.filter((flight) => {
        const matchesDeparture = !params.departureAirport || flight.departureAirport?.toLowerCase().includes(params.departureAirport.toLowerCase());

        const matchesArrival = !params.arrivalAirport || flight.arrivalAirport?.toLowerCase().includes(params.arrivalAirport.toLowerCase());

        const matchesDate = !params.flightDate || flight.departureTime?.startsWith(params.flightDate);

        return matchesDeparture && matchesArrival && matchesDate;
      });

      setSearchResults(filteredFlights);
      setSearchPerformed(true);

      if (filteredFlights.length === 0) {
        message.info('Không tìm thấy chuyến bay nào phù hợp với tiêu chí tìm kiếm');
      } else {
        message.success(`Tìm thấy ${filteredFlights.length} chuyến bay`);
      }
    },
    [allFlights, message]
  );

  const clearResults = useCallback(() => {
    setSearchResults(allFlights);
    setSearchPerformed(true);
    setError(null);
  }, [allFlights]);

  return {
    searchResults,
    allFlights,
    loading,
    error,
    searchPerformed,
    searchFlights,
    clearResults,
    loadAllFlights
  };
};

export default useFlightSearch;
