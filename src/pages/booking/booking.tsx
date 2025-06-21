import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

export default function Booking() {
  const [flightName, setFlightName] = useState('');
  const [price, setPrice] = useState(0);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [ticketClass, setTicketClass] = useState('Phổ thông');
  const [email, setEmail] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [message, setMessage] = useState('');

  const bookingMutation = useMutation({
    mutationFn: (data: unknown) =>
      axios.post('http://localhost:5000/api/v1/bookings', data, {
        withCredentials: true,
      }),
    onSuccess: () => {
      setMessage('✅ Đặt vé thành công!');
    },
    onError: (error) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as AxiosError<any>;
      console.log('🔥 Lỗi backend:', err.response?.data?.debug);
      setMessage(`❌ ${err.response?.data?.message || 'Đặt vé thất bại.'}`);
    },
  });

  const handleBooking = () => {
    bookingMutation.mutate({
      flight_name: flightName,
      price,
      full_name: fullName,
      phone,
      id_number: idNumber,
      email,
      ticket_class: ticketClass,
      departure_date: departureDate,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      {/* Nội dung chính */}
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto mt-10 bg-white p-6 rounded shadow-md">
        {/* Form bên trái */}
        <div className="flex-1 pr-6">
          <h2 className="text-xl font-semibold text-indigo-700 mb-2">Vé chuyến bay</h2>
          <p className="text-sm text-gray-600 mb-4">
            Nhập chính xác thông tin hành khách và đảm bảo số CMND/CCCD trùng khớp với giấy tờ tùy thân khi làm thủ tục.
          </p>

          <input placeholder="Chuyến bay*" className="border p-2 w-full mb-3" value={flightName} onChange={(e) => setFlightName(e.target.value)} />
          <input placeholder="Giá tiền*" type="number" className="border p-2 w-full mb-3" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          <input placeholder="Hành khách*" className="border p-2 w-full mb-3" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <input placeholder="CMND/CCCD*" className="border p-2 w-full mb-3" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
          <input placeholder="Điện thoại*" className="border p-2 w-full mb-3" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input placeholder="Hạng vé*" className="border p-2 w-full mb-3" value={ticketClass} onChange={(e) => setTicketClass(e.target.value)} />
          <input placeholder="Email*" className="border p-2 w-full mb-3" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="date" className="border p-2 w-full mb-4" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />

          <button
            onClick={handleBooking}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400"
            disabled={bookingMutation.isLoading}
          >
            {bookingMutation.isLoading ? 'Đang gửi...' : 'Lưu và đóng'}
          </button>

          <button className="ml-4 px-4 py-2 border rounded hover:bg-gray-100">Chọn ghế</button>

          {message && <p className="mt-4 text-center text-sm">{message}</p>}

          {/* Thông tin hành lý */}
          <div className="mt-6 text-sm text-gray-600">
            <strong>Thông tin hành lý</strong>
            <p>
              Mỗi hành khách được mang theo một kiện hành lý xách tay và một vật dụng cá nhân miễn phí. Kiện hành lý ký gửi đầu tiên được miễn phí. Hành khách là thành viên chương trình khách hàng thân thiết được miễn phí kiện thứ hai. Xem chi tiết <a href="#" className="text-blue-500 underline">chính sách hành lý</a>.
            </p>
            <div className="mt-2">
              <div className="font-medium">Hành khách 1</div>
              <div className="flex items-center gap-2 mt-1">
                <span>Hành lý ký gửi</span>
                <button className="border px-2">−</button>
                <span>1</span>
                <button className="border px-2">+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Hình minh họa */}
        <div className="flex-1 flex justify-center items-center mt-10 md:mt-0">
          <img src="/booking/baggage.png" alt="Minh họa hành lý" className="max-w-xs" />
        </div>
      </div>

      {/* Ảnh chân trang */}
      <img src="/booking/footer.png" alt="Chân trang" className="w-full mt-10" />
    </div>
  );
}
