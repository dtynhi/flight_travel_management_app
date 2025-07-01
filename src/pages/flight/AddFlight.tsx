/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Button,
  Space,
  Divider,
  Row,
  Col,
  message,
} from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const AddFlight: React.FC = () => {
  const [airports, setAirports] = useState<any[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/v1/flight/airports')
      .then((res) => {
        setAirports(res.data.data || []);
      })
      .catch(() => {
        message.error('Không lấy được danh sách sân bay');
      });
  }, []);

  const onFinish = (values: any) => {
    const basePrice = Number(values.basePrice);

    if (values.fromAirport === values.toAirport) {
      message.error('Sân bay đi và đến không được trùng nhau!');
      return;
    }

    if (
      values.intermediateAirports?.some(
        (stop: any) => stop.id === values.fromAirport || stop.id === values.toAirport
      )
    ) {
      message.error('Sân bay trung gian không được trùng sân bay đi/đến!');
      return;
    }

    const payload = {
      from_airport: Number(values.fromAirport),
      to_airport: Number(values.toAirport),
      departure_time: values.departureTime.format('YYYY-MM-DDTHH:mm:ss'),
      flight_time_minutes: Number(values.flightDuration),
      base_price: basePrice,
      intermediate_airports: (values.intermediateAirports || []).map((stop: any, idx: number) => ({
        id: Number(stop.id),
        stop_duration: Number(stop.stop_duration),
        stop_order: idx + 1,
        note: stop.note || ''
      })),
      seat_config: (values.seatConfig || []).map((s: any) => ({
        ticket_class_id: Number(s.ticket_class_id),
        total_seats: Number(s.total_seats),
        available_seats: Number(s.total_seats)
      }))
    };

    axios
      .post('http://localhost:5000/api/v1/flight/', payload, { withCredentials: true })
      .then(() => {
        message.success('Tạo chuyến bay thành công');
        form.resetFields();
      })
      .catch((err) => {
        console.error('API Error:', err.response?.data || err.message);
        message.error(err.response?.data?.message || 'Lỗi tạo chuyến bay, vui lòng thử lại!');
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-center mb-8">
        THÊM CHUYẾN BAY
      </h1>
      
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <Form form={form} layout='vertical' onFinish={onFinish} className="space-y-6">
          {/* Thông tin cơ bản */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Sân bay đi</label>
              <Form.Item
                name='fromAirport'
                rules={[{ required: true, message: 'Vui lòng chọn sân bay đi' }]}
                className="mb-0"
              >
                <Select 
                  placeholder='Chọn sân bay' 
                  className="w-full"
                  size="large"
                >
                  {airports.map((a) => (
                    <Option key={a.id} value={a.id}>
                      {a.airport_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Sân bay đến</label>
              <Form.Item
                name='toAirport'
                rules={[{ required: true, message: 'Vui lòng chọn sân bay đến' }]}
                className="mb-0"
              >
                <Select 
                  placeholder='Chọn sân bay' 
                  className="w-full"
                  size="large"
                >
                  {airports.map((a) => (
                    <Option key={a.id} value={a.id}>
                      {a.airport_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Ngày giờ khởi hành</label>
              <Form.Item
                name='departureTime'
                rules={[{ required: true, message: 'Vui lòng chọn ngày giờ khởi hành' }]}
                className="mb-0"
              >
                <DatePicker 
                  showTime 
                  format='YYYY-MM-DD HH:mm' 
                  className="w-full" 
                  size="large"
                />
              </Form.Item>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Thời gian bay (phút)</label>
              <Form.Item
                name='flightDuration'
                rules={[{ required: true, message: 'Vui lòng nhập thời gian bay' }]}
                className="mb-0"
              >
                <InputNumber 
                  min={1} 
                  className="w-full" 
                  size="large"
                  placeholder="Nhập thời gian bay"
                  style={{
                    width: '100%',
                    height: '40px'
                  }}
                  controls={{
                    upIcon: '⬆️',
                    downIcon: '⬇️'
                  }}
                />
              </Form.Item>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">Giá vé cơ bản (VND)</label>
              <Form.Item
                name='basePrice'
                rules={[{ required: true, message: 'Vui lòng nhập giá vé cơ bản' }]}
                className="mb-0"
              >
                <InputNumber 
                  min={0} 
                  className="w-full" 
                  size="large"
                  placeholder="Nhập giá vé cơ bản"
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value?.replace(/\$\s?|(,*)/g, '') || ''}
                  style={{
                    width: '100%',
                    height: '40px'
                  }}
                  addonAfter="VND"
                />
              </Form.Item>
            </div>
          </div>

          <Divider className="border-purple-200">
            <span className="text-purple-600 font-semibold">Sân bay trung gian</span>
          </Divider>

          {/* Sân bay trung gian */}
          <Form.List name='intermediateAirports'>
            {(fields, { add, remove }) => (
              <div className="space-y-4">
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Sân bay trung gian</label>
                        <Form.Item
                          {...restField}
                          name={[name, 'id']}
                          rules={[{ required: true, message: 'Vui lòng chọn sân bay trung gian' }]}
                          className="mb-0"
                        >
                          <Select placeholder='Sân bay trung gian' size="large">
                            {airports.map((a) => (
                              <Option key={a.id} value={a.id}>
                                {a.airport_name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Thời gian dừng (phút)</label>
                        <Form.Item
                          {...restField}
                          name={[name, 'stop_duration']}
                          rules={[{ required: true, message: 'Vui lòng nhập thời gian dừng' }]}
                          className="mb-0"
                        >
                          <InputNumber placeholder='Phút dừng' min={1} className="w-full" size="large" />
                        </Form.Item>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Ghi chú</label>
                        <div className="flex gap-2">
                          <Form.Item {...restField} name={[name, 'note']} className="mb-0 flex-1">
                            <Input placeholder='Ghi chú' size="large" />
                          </Form.Item>
                          <Button 
                            danger 
                            onClick={() => remove(name)}
                            icon={<MinusCircleOutlined />}
                            size="large"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button 
                  type='dashed' 
                  onClick={() => add()} 
                  icon={<PlusOutlined />} 
                  className="w-full border-purple-300 text-purple-600 hover:border-purple-500"
                  size="large"
                >
                  Thêm sân bay trung gian
                </Button>
              </div>
            )}
          </Form.List>

          <Divider className="border-purple-200">
            <span className="text-purple-600 font-semibold">Cấu hình hạng ghế</span>
          </Divider>

          {/* Cấu hình hạng ghế */}
          <Form.List name='seatConfig'>
            {(fields, { add, remove }) => (
              <div className="space-y-4">
                {fields.map(({ key, name }) => (
                  <div key={key} className="p-6 border border-purple-200 rounded-lg bg-purple-50">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-700">Hạng ghế {name + 1}</h3>
                      <Button 
                        danger 
                        onClick={() => remove(name)}
                        icon={<MinusCircleOutlined />}
                      >
                        Xoá
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">ID hạng ghế</label>
                        <Form.Item
                          name={[name, 'ticket_class_id']}
                          rules={[{ required: true, message: 'Vui lòng nhập ID hạng ghế' }]}
                          className="mb-0"
                        >
                          <InputNumber min={1} className="w-full" size="large" placeholder="ID hạng" />
                        </Form.Item>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Tổng số ghế</label>
                        <Form.Item
                          name={[name, 'total_seats']}
                          rules={[{ required: true, message: 'Vui lòng nhập tổng số ghế' }]}
                          className="mb-0"
                        >
                          <InputNumber min={0} className="w-full" size="large" placeholder="Số ghế" />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                ))}
                <Button 
                  type='dashed' 
                  onClick={() => add()} 
                  icon={<PlusOutlined />} 
                  className="w-full border-purple-300 text-purple-600 hover:border-purple-500"
                  size="large"
                >
                  Thêm hạng ghế
                </Button>
              </div>
            )}
          </Form.List>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <Button 
              type='primary' 
              htmlType='submit' 
              className="bg-gradient-to-r from-purple-600 to-purple-400 text-white hover:opacity-90 h-12 px-8 text-lg font-semibold"
              size="large"
            >
              Tạo chuyến bay
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddFlight;