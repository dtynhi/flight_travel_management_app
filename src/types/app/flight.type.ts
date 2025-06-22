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
  // Basic ticket class info from flight API
  ticket_classes?: IBasicTicketClass[];
  // Intermediate airports from flight API
  intermediate_airports?: IIntermediateAirport[];
}

// Basic ticket class structure from flight API
export interface IBasicTicketClass {
  class_name: string;
  total_seats: number;
}

// Intermediate airport structure from flight API
export interface IIntermediateAirport {
  airport_name: string;
  note: string;
  stop_duration: number;
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
