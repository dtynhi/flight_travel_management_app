import { SuccessResponse } from '~/types/utils.type';
import http from '../http';
import type { IFlightSearchParams } from '~/types/app/flight-search.type';
import IFlight from '~/types/app/flight.type';
import { IBaseQueryRequest, IPageQueryResponse } from '~/query/query.type';

interface IFlightSearchResponse {
  flights: IFlight[];
  total: number;
}

const flightApi = {
  // GET /api/v1/flight/search
  searchFlights: async (params: IFlightSearchParams) => {
    const queryParams = new URLSearchParams();

    // Match your backend parameter names exactly
    if (params.departureAirport) {
      queryParams.append('departureAirport', params.departureAirport);
    }
    if (params.arrivalAirport) {
      queryParams.append('arrivalAirport', params.arrivalAirport);
    }
    if (params.flightDate) {
      queryParams.append('flightDate', params.flightDate);
    }

    return await http.get<SuccessResponse<IFlightSearchResponse>>(`/v1/flight/search?${queryParams.toString()}`);
  },

  // GET /api/v1/flight/ - Get all flights
  getAllFlights: async () => {
    return await http.get<SuccessResponse<IFlight[]>>('/v1/flight/');
  },

  // GET /api/v1/flight/{flight_id}
  getFlightById: async (flightId: number) => {
    return await http.get<SuccessResponse<IFlight>>(`/v1/flight/${flightId}`);
  },

  // POST /api/v1/flight/ (Protected - Admin only)
  createFlight: async (flightData: IFlight) => {
    return await http.post<SuccessResponse<IFlight>>('/v1/flight/', flightData);
  },

  // PUT /api/v1/flight/{flight_id}
  updateFlight: async (flightId: number, flightData: any) => {
    return await http.put<SuccessResponse<any>>(`/v1/flight/${flightId}`, flightData);
  },

  // Update intermediate airports
  updateFlightIntermediateAirports: async (flightId: number, data: any) => {
    return await http.put<SuccessResponse<any>>(`/v1/flight/${flightId}/intermediate-airports`, data);
  },

  // Update seat configuration
  updateFlightSeatConfig: async (flightId: number, data: any) => {
    return await http.put<SuccessResponse<any>>(`/v1/flight/${flightId}/seat-config`, data);
  }
};

export default flightApi;
