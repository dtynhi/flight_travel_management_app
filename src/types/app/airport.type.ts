export default interface IAirport {
  id: number;
  airportName: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface IAirportSearchParams {
  name?: string;
}

export interface ICreateAirportRequest {
  airportName: string;
  status?: string;
}

export interface IUpdateAirportRequest {
  airportName?: string;
  status?: string;
}