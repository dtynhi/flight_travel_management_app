import { useQuery } from '@tanstack/react-query';
import airportApi from '~/api/app/airport.api';

function AirportPage() {
  const fetchAirport = useQuery({
    queryKey: ['airport'],
    queryFn: () => airportApi.getAllAirports()
  });

  console.log(fetchAirport);

  return (
    <div>
      <h1>Airport Page</h1>
      <p>This is the airport page content.</p>
    </div>
  );
}

export default AirportPage;
