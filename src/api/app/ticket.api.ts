import http from '~/api/http';
import { SuccessResponse } from '~/types/utils.type';

export interface BookTicketPayload {
  passenger_name: string;
  id_number: string;
  phone_number: string;
  email: string;
  flight_id: number;
  ticket_class_id: number;
}

const ticketApi = {
  bookTicket: async (data: BookTicketPayload) => {
    return http.post<SuccessResponse<unknown>>('/v1/tickets/book', data);
  },

  getMyTickets: async () => {
    return http.get<SuccessResponse<unknown[]>>('/v1/tickets/my');
  },

  getAvailableFlights: async () => {
    return http.get<SuccessResponse<unknown[]>>('/v1/tickets/available-flights');
  }
};

export default ticketApi;
