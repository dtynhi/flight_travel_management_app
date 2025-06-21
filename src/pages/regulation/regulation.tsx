import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Regulation {
  number_of_airports: number;
  minimum_flight_duration: number;
  max_intermediate_stops: number;
  minimum_stop_duration: number;
  maximum_stop_duration: number;
  booking_deadline: number;
}

const RegulationPage = () => {
  const [formData, setFormData] = useState<Regulation>({
    number_of_airports: 0,
    minimum_flight_duration: 0,
    max_intermediate_stops: 0,
    minimum_stop_duration: 0,
    maximum_stop_duration: 0,
    booking_deadline: 0,
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/v1/regulations')
      .then((res) => {
        setFormData(res.data);
      })
      .catch(() => {
        setMessage('Không thể tải dữ liệu quy định hệ thống.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!isNaN(Number(value))) {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.put('/api/v1/regulations', formData)
      .then(() => {
        setMessage('✅ Cập nhật quy định thành công!');
      })
      .catch(() => {
        setMessage('❌ Cập nhật thất bại. Vui lòng thử lại.');
      });
  };

  if (loading) return <div className="p-4 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Quản lý Quy định Hệ thống</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <FormItem
          label="Số lượng sân bay (QĐ1)"
          name="number_of_airports"
          value={formData.number_of_airports}
          onChange={handleChange}
        />

        <FormItem
          label="Thời gian bay tối thiểu (phút) (QĐ1)"
          name="minimum_flight_duration"
          value={formData.minimum_flight_duration}
          onChange={handleChange}
        />

        <FormItem
          label="Số sân bay trung gian tối đa (QĐ1)"
          name="max_intermediate_stops"
          value={formData.max_intermediate_stops}
          onChange={handleChange}
        />

        <FormItem
          label="Thời gian dừng tối thiểu (phút) (QĐ1)"
          name="minimum_stop_duration"
          value={formData.minimum_stop_duration}
          onChange={handleChange}
        />

        <FormItem
          label="Thời gian dừng tối đa (phút) (QĐ1)"
          name="maximum_stop_duration"
          value={formData.maximum_stop_duration}
          onChange={handleChange}
        />

        <FormItem
          label="Thời gian đặt vé trễ nhất (giờ trước khi bay)"
          name="booking_deadline"
          value={formData.booking_deadline}
          onChange={handleChange}
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Lưu thay đổi
        </button>

        {message && <p className="mt-3 text-green-600">{message}</p>}
      </form>
    </div>
  );
};

interface FormItemProps {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormItem: React.FC<FormItemProps> = ({ label, name, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block mb-1 font-semibold">{label}</label>
    <input
      type="number"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border rounded"
      inputMode="numeric"
      min={0}
    />
  </div>
);

export default RegulationPage;
