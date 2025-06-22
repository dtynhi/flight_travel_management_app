import { SuccessResponse } from '~/types/utils.type';
import http from '../http';
import IAirport from '~/types/app/airport.type';

const airportApi = {
  // GET /api/v1/airport/
  getAllAirports: async () => {
    return await http.get<SuccessResponse<IAirport[]>>('/v1/airport');
  },

  // GET /api/v1/airport/{airport_id}
  getAirportById: async (airportId: number) => {
    return await http.get<SuccessResponse<IAirport>>(`/v1/airport/${airportId}`);
  },

  // GET /api/v1/airport/search?name={search_term}
  searchAirports: async (name?: string) => {
    const queryParams = new URLSearchParams();
    if (name) queryParams.append('name', name);

    return await http.get<SuccessResponse<IAirport[]>>(`/v1/airport/search?${queryParams.toString()}`);
  },

  // POST /api/v1/airport/ (Protected - Admin only)
  createAirport: async (airportData: unknown) => {
    return await http.post<SuccessResponse<IAirport>>('/v1/airport/', airportData);
  },

  // PUT /api/v1/airport/{airport_id} (Protected - Admin only)
  updateAirport: async (airportId: number, airportData: unknown) => {
    return await http.put<SuccessResponse<IAirport>>(`/v1/airport/${airportId}`, airportData);
  },

  // PATCH /api/v1/airport/{airport_id}/status (Protected - Admin only)
  updateAirportStatus: async (airportId: number, status: string) => {
    return await http.patch<SuccessResponse<IAirport>>(`/v1/airport/${airportId}/status`, { status });
  }
};

export default airportApi;
