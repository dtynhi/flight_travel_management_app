import http from '../http';
import type { IFlightTicketClass } from '~/types/app/flight.type';

interface IFlightTicketClassResponse {
  flightId: number;
  ticketClasses: IFlightTicketClass[];
  total: number;
}

const flightTicketClassApi = {
  getTicketClassesByFlight: (flightId: number) => {
    return http.get<IFlightTicketClassResponse>(`/v1/flight-ticket-class/flight/${flightId}`);
  },

  getAvailableClassesForFlight: (flightId: number) => {
    return http.get<IFlightTicketClassResponse>(`/v1/flight-ticket-class/flight/${flightId}/available`);
  }
};

export default flightTicketClassApi;