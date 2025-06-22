import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';

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
  const [saving, setSaving] = useState(false);

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
    setSaving(true);
    setMessage('');
    
    axios.put('/api/v1/regulations', formData)
      .then(() => {
        setMessage('Cập nhật quy định thành công!');
      })
      .catch(() => {
        setMessage('Cập nhật thất bại. Vui lòng thử lại.');
      })
      .finally(() => setSaving(false));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-center mb-8">
        QUẢN LÝ QUY ĐỊNH HỆ THỐNG
      </h1>
      
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>

          <div className="flex justify-center mt-8">
            <Button
              type="primary"
              htmlType="submit"
              loading={saving}
              className="bg-gradient-to-r from-purple-600 to-purple-400 text-white hover:opacity-90 h-12 px-8 text-lg font-semibold"
              disabled={saving}
            >
              {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Button>
          </div>

          {message && (
            <div className={`mt-6 p-4 rounded-lg text-center font-medium ${
              message.includes('') 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {message}
            </div>
          )}
        </form>
      </div>
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
  <div className="space-y-2">
    <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
      {label}
    </label>
    <input
      type="number"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors duration-200 text-gray-700"
      inputMode="numeric"
      min={0}
    />
  </div>
);

export default RegulationPage;