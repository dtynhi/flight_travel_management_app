/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ticketApi from '~/api/app/ticket.api';

function BookingPage() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    flight_id: '',
    id_number: '',
    phone_number: '',
    email: '',
    passenger_name: '',
    ticket_class_id: 2
  });

  const { data, isLoading } = useQuery({
    queryKey: ['available-flights'],
    queryFn: ticketApi.getAvailableFlights
  });

  const flights = Array.isArray(data?.data?.data)
    ? data.data.data
    : Array.isArray(data?.data)
      ? data.data
      : [];

  const mutation = useMutation({
    mutationFn: (data: {
      flight_id: number;
      ticket_class_id: number;
      id_number: string;
      phone_number: string;
      email: string;
      passenger_name: string;
    }) => ticketApi.bookTicket(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['available-flights'] });
      alert('🎉 Đặt vé thành công!');
    },
    onError: () => {
      alert('❌ Đặt vé thất bại. Vui lòng thử lại.');
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({
      ...formData,
      flight_id: Number(formData.flight_id),
      ticket_class_id: Number(formData.ticket_class_id)
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-center mb-8">
        ĐẶT VÉ MÁY BAY
      </h1>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Chuyến bay</label>
            <select
              name="flight_id"
              className="w-full border border-purple-300 rounded-lg p-2 focus:border-purple-500"
              onChange={handleChange}
              value={formData.flight_id}
              required
            >
              <option value="">-- Chọn chuyến bay --</option>
              {isLoading && <option disabled>Đang tải chuyến bay...</option>}
              {!isLoading && flights.length === 0 && <option disabled>Không có chuyến bay khả dụng</option>}
              {flights.map((f: any) => (
                <option key={f.id} value={f.id}>
                  #{f.id} - {f.departure_time} - {f.base_price?.toLocaleString?.() ?? f.base_price} VNĐ
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Tên hành khách</label>
            <input
              name="passenger_name"
              placeholder="Tên hành khách"
              className="w-full border border-purple-300 rounded-lg p-2 focus:border-purple-500"
              value={formData.passenger_name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">CMND/CCCD</label>
            <input
              name="id_number"
              placeholder="CMND/CCCD"
              className="w-full border border-purple-300 rounded-lg p-2 focus:border-purple-500"
              value={formData.id_number}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Số điện thoại</label>
            <input
              name="phone_number"
              placeholder="Số điện thoại"
              className="w-full border border-purple-300 rounded-lg p-2 focus:border-purple-500"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full border border-purple-300 rounded-lg p-2 focus:border-purple-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Hạng vé</label>
            <select
              name="ticket_class_id"
              className="w-full border border-purple-300 rounded-lg p-2 focus:border-purple-500"
              value={formData.ticket_class_id}
              onChange={handleChange}
            >
              <option value={2}>Hạng 2 (Cơ bản)</option>
              <option value={1}>Hạng 1 (+5%)</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-purple-400 text-white py-2 px-4 rounded-lg hover:opacity-90 w-full font-semibold"
          >
            Đặt vé
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingPage;
