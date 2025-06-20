export default interface IFlight {
  id: number;
  flightCode: string;
  departureAirportId: number;
  arrivalAirportId: number;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  flightDuration: string;
  basePrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  ticketClasses?: IFlightTicketClass[]; // For seat calculation
}

export interface IFlightTicketClass {
  id: number;
  flightId: number;
  ticketClassId: number;
  totalSeats: number;
  availableSeats: number;
  priceMultiplier: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateFlightRequest {
  departureAirportId: number;
  arrivalAirportId: number;
  departureTime: string;
  arrivalTime: string;
  flightDuration: number;
  basePrice: number;
  status?: string;
}

export interface IUpdateFlightRequest {
  departureAirportId?: number;
  arrivalAirportId?: number;
  departureTime?: string;
  arrivalTime?: string;
  flightDuration?: number;
  basePrice?: number;
  status?: string;
}