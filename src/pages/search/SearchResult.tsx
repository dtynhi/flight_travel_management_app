import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface TicketClass {
  class_name: string;
  price: number;
}

interface IntermediateStop {
  name: string;
  stop_duration: number;
  note: string;
}

interface Flight {
  id: number;
  from_airport: string;
  to_airport: string;
  departure_time: string;
  arrival_time: string;
  base_price: number;
  ticket_classes: TicketClass[];
  intermediate_airports: IntermediateStop[];
}

function SearchResult() {
  const [searchParams] = useSearchParams();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedDepartingFlight, setSelectedDepartingFlight] = useState<Flight | null>(null);
  const [selectedReturningFlight, setSelectedReturningFlight] = useState<Flight | null>(null);
  const [step, setStep] = useState<'departing' | 'returning' | 'summary'>('departing');
  const [loading, setLoading] = useState(true);

  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const departDate = searchParams.get('departDate');
  const returnDate = searchParams.get('returnDate');

  useEffect(() => {
    if (!from || !to || !departDate) return;

    const query = new URLSearchParams({ from, to, departDate }).toString();
    fetch(`http://localhost:5000/api/v1/flight/flights/search?${query}`)
      .then(res => res.json())
      .then(data => {
        setFlights(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Search failed:', err);
        setLoading(false);
      });
  }, [from, to, departDate]);

  const handleSelectFlight = (flight: Flight) => {
    if (step === 'departing') {
      setSelectedDepartingFlight(flight);
      if (returnDate) {
        setStep('returning');
        // fetch returning flights if needed
      } else {
        setStep('summary');
      }
    } else if (step === 'returning') {
      setSelectedReturningFlight(flight);
      setStep('summary');
    }
  };

  if (loading) return <p className="p-6">Loading flights...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {step === 'departing' ? 'Choose a departing flight' : step === 'returning' ? 'Choose a returning flight' : 'Booking Summary'}
      </h1>

      {step !== 'summary' && flights.length === 0 && <p>No flights found.</p>}

      {step !== 'summary' && flights.length > 0 && (
        flights.map(flight => (
          <div key={flight.id} className="border rounded-lg p-4 mb-4 shadow">
            <h2 className="text-xl font-semibold mb-2">
              {flight.from_airport} → {flight.to_airport}
            </h2>
            <p>Departure: {new Date(flight.departure_time).toLocaleString()}</p>
            <p>Arrival: {new Date(flight.arrival_time).toLocaleString()}</p>
            <p>Base Price: {flight.base_price.toLocaleString()} VND</p>

            <h3 className="font-semibold mt-3">Ticket Classes:</h3>
            <ul className="list-disc ml-6">
              {flight.ticket_classes.map((cls, i) => (
                <li key={i}>{cls.class_name}: {cls.price.toLocaleString()} VND</li>
              ))}
            </ul>

            {flight.intermediate_airports.length > 0 && (
              <>
                <h3 className="font-semibold mt-3">Stopovers:</h3>
                <ul className="list-disc ml-6">
                  {flight.intermediate_airports.map((stop, i) => (
                    <li key={i}>{stop.name} - {stop.stop_duration} minutes ({stop.note})</li>
                  ))}
                </ul>
              </>
            )}

            <button
              onClick={() => handleSelectFlight(flight)}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Select this flight
            </button>
          </div>
        ))
      )}

      {step === 'summary' && (
        <div className="space-y-4">
          <div className="border p-4 rounded">
            <h2 className="font-bold">Departing Flight</h2>
            {selectedDepartingFlight && (
              <>
                <p>{selectedDepartingFlight.from_airport} → {selectedDepartingFlight.to_airport}</p>
                <p>{new Date(selectedDepartingFlight.departure_time).toLocaleString()}</p>
              </>
            )}
          </div>
          {selectedReturningFlight && (
            <div className="border p-4 rounded">
              <h2 className="font-bold">Returning Flight</h2>
              <p>{selectedReturningFlight.from_airport} → {selectedReturningFlight.to_airport}</p>
              <p>{new Date(selectedReturningFlight.departure_time).toLocaleString()}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResult;

