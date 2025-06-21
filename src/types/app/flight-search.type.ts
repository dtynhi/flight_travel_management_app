import IAirport from './airport.type';
import IFlight from './flight.type';

export interface IFlightSearchParams {
  departureAirport?: string;
  arrivalAirport?: string;
  flightDate?: string;
}

export interface IFlightSearchFormProps {
  searchParams: IFlightSearchParams;
  airports: IAirport[];
  loading: boolean;
  onParamChange: (field: keyof IFlightSearchParams, value: string) => void;
  onSearch: () => void;
  onReset: () => void;
}

export interface IFlightResultsTableProps {
  flights: IFlight[];
  loading: boolean;
  searchPerformed: boolean;
  searchParams: IFlightSearchParams;
}
