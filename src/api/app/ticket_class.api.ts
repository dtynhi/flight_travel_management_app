import { SuccessResponse } from '~/types/utils.type';
import http from '../http';

interface ITicketClass {
  id: number;
  className: string;
  priceMultiplier: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface ITicketClassResponse {
  ticketClasses: ITicketClass[];
  total: number;
}

const ticketClassApi = {
  // GET /api/v1/ticket-class/
  getAllTicketClasses: async () => {
    return await http.get<SuccessResponse<ITicketClassResponse>>('/v1/ticket-class/');
  },

  // GET /api/v1/ticket-class/{ticket_class_id}
  getTicketClassById: async (ticketClassId: number) => {
    return await http.get<SuccessResponse<ITicketClass>>(`/v1/ticket-class/${ticketClassId}`);
  },

  // GET /api/v1/ticket-class/search?name={search_term}
  searchTicketClasses: async (name?: string) => {
    const queryParams = new URLSearchParams();
    if (name) queryParams.append('name', name);
    return await http.get<SuccessResponse<ITicketClassResponse>>(`/v1/ticket-class/search?${queryParams.toString()}`);
  },

  // POST /api/v1/ticket-class/
  createTicketClass: async (data: any) => {
    return await http.post<SuccessResponse<ITicketClass>>('/v1/ticket-class/', data);
  },

  // PUT /api/v1/ticket-class/{ticket_class_id}
  updateTicketClass: async (ticketClassId: number, data: any) => {
    return await http.put<SuccessResponse<ITicketClass>>(`/v1/ticket-class/${ticketClassId}`, data);
  },

  // PATCH /api/v1/ticket-class/{ticket_class_id}/status
  updateTicketClassStatus: async (ticketClassId: number, status: string) => {
    return await http.patch<SuccessResponse<ITicketClass>>(`/v1/ticket-class/${ticketClassId}/status`, { status });
  }
};

export default ticketClassApi;