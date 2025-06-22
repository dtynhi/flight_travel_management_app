import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Booking() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [flights, setFlights] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    flight_id: '',
    passenger_name: '',
    id_number: '',
    phone_number: '',
    email: '',
    ticket_class: 'Hạng 2'
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/ticket/available-flights').then((res) => setFlights(res.data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'flight_id') {
      const flight = flights.find((f) => f.id === parseInt(value));
      setSelectedFlight(flight);
    }
  };

  const calculatePrice = () => {
    if (!selectedFlight) return 0;
    const base = selectedFlight.base_price;
    return formData.ticket_class === 'Hạng 1' ? Math.round(base * 1.05) : base;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/ticket/book-ticket', {
        ...formData,
        flight_id: parseInt(formData.flight_id)
      });
      setMessage('🎉 Đặt vé thành công!');
    } catch (err) {
      setMessage('❌ Đặt vé thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className='max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-4'>
      <h1 className='text-2xl font-bold text-center'>Đặt vé máy bay</h1>

      {message && <div className='text-center text-green-600 font-semibold'>{message}</div>}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block mb-1 font-medium'>Chuyến bay</label>
          <select name='flight_id' className='w-full border px-3 py-2 rounded' value={formData.flight_id} onChange={handleChange} required>
            <option value=''>-- Chọn chuyến bay --</option>
            {flights.map((flight) => (
              <option key={flight.id} value={flight.id}>
                #{flight.id} - {flight.departure_time} - {flight.base_price.toLocaleString()} VNĐ
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='block mb-1 font-medium'>Tên hành khách</label>
          <input
            type='text'
            name='passenger_name'
            className='w-full border px-3 py-2 rounded'
            value={formData.passenger_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className='block mb-1 font-medium'>CMND/CCCD</label>
          <input type='text' name='id_number' className='w-full border px-3 py-2 rounded' value={formData.id_number} onChange={handleChange} required />
        </div>

        <div>
          <label className='block mb-1 font-medium'>Số điện thoại</label>
          <input type='text' name='phone_number' className='w-full border px-3 py-2 rounded' value={formData.phone_number} onChange={handleChange} required />
        </div>

        <div>
          <label className='block mb-1 font-medium'>Email</label>
          <input type='email' name='email' className='w-full border px-3 py-2 rounded' value={formData.email} onChange={handleChange} required />
        </div>

        <div>
          <label className='block mb-1 font-medium'>Hạng vé</label>
          <select name='ticket_class' className='w-full border px-3 py-2 rounded' value={formData.ticket_class} onChange={handleChange}>
            <option value='Hạng 2'>Hạng 2 (Cơ bản)</option>
            <option value='Hạng 1'>Hạng 1 (+5%)</option>
          </select>
        </div>

        <div className='bg-gray-50 p-3 rounded-md'>
          <p>
            <strong>Giá tiền:</strong> {selectedFlight ? <span>{calculatePrice().toLocaleString()} VNĐ</span> : 'Chưa chọn chuyến'}
          </p>
          <p>
            <strong>Ngày bay:</strong> {selectedFlight ? selectedFlight.departure_time : 'Chưa chọn chuyến'}
          </p>
        </div>

        <button type='submit' className='w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700'>
          Đặt vé
        </button>
      </form>
    </div>
  );
}
