import { useState, useEffect } from 'react';
import { App } from 'antd';

import type { IFlight } from '~/types/app/flight-search.type';
import flightTicketClassApi from '~/api/app/flight_ticket_class.api';

interface ISeatData {
  availableSeats: number;
  reservedSeats: number;
  totalSeats: number;
}

interface IFlightWithSeats extends IFlight {
  seatData?: ISeatData;
}

interface IUseFlightSeatsReturn {
  flightsWithSeats: IFlightWithSeats[];
  seatDataLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const useFlightSeats = (flights: IFlight[]): IUseFlightSeatsReturn => {
  const { message } = App.useApp();
  
  const [flightsWithSeats, setFlightsWithSeats] = useState<IFlightWithSeats[]>([]);
  const [seatDataLoading, setSeatDataLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate seats from ticket classes
  const calculateSeatsFromTicketClasses = (ticketClasses: any[]): ISeatData => {
    if (!ticketClasses || ticketClasses.length === 0) {
      return { availableSeats: 0, reservedSeats: 0, totalSeats: 0 };
    }

    const totalSeats = ticketClasses.reduce((sum, tc) => sum + (tc.totalSeats || 0), 0);
    const availableSeats = ticketClasses.reduce((sum, tc) => sum + (tc.availableSeats || 0), 0);
    const reservedSeats = totalSeats - availableSeats;

    return { totalSeats, availableSeats, reservedSeats };
  };

  // Fetch seat data for all flights
  const fetchSeatData = async () => {
    if (!flights || flights.length === 0) {
      setFlightsWithSeats([]);
      return;
    }

    setSeatDataLoading(true);
    setError(null);

    try {
      const flightsWithSeatData = await Promise.all(
        flights.map(async (flight) => {
          try {
            const response = await flightTicketClassApi.getTicketClassesByFlight(flight.id);
            const ticketClasses = response.data?.data?.ticketClasses || [];
            const seatData = calculateSeatsFromTicketClasses(ticketClasses);
            
            return { ...flight, seatData };
          } catch (error) {
            console.error(`Error fetching seat data for flight ${flight.id}:`, error);
            return {
              ...flight,
              seatData: { availableSeats: 0, reservedSeats: 0, totalSeats: 0 }
            };
          }
        })
      );

      setFlightsWithSeats(flightsWithSeatData);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Lỗi khi tải dữ liệu ghế';
      setError(errorMessage);
      message.error(errorMessage);
      
      // Still show flights without seat data
      setFlightsWithSeats(flights.map(flight => ({
        ...flight,
        seatData: { availableSeats: 0, reservedSeats: 0, totalSeats: 0 }
      })));
    } finally {
      setSeatDataLoading(false);
    }
  };

  useEffect(() => {
    fetchSeatData();
  }, [flights]);

  return {
    flightsWithSeats,
    seatDataLoading,
    error,
    refetch: fetchSeatData
  };
};

export default useFlightSeats;
export type { IFlightWithSeats, ISeatData };