import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, InputNumber, Button, Select, DatePicker, message, Typography, Card, Row, Col } from 'antd';
import dayjs from 'dayjs';
import routers from '~/routers/router';

const { Title } = Typography;
const { Option } = Select;

const EditFlight: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [airports, setAirports] = useState<any[]>([]);

  useEffect(() => {
    fetchAirports();
    if (id) fetchFlight(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchAirports = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/flight/airports');
      setAirports(res.data.data || []);
    } catch {
      message.error('Không thể tải sân bay');
    }
  };

  const fetchFlight = async (id: string) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/flight/${id}`);
      const data = res.data.data;
      form.setFieldsValue({
        fromAirport: data.from_airport_id,
        toAirport: data.to_airport_id,
        departureTime: dayjs(data.departure_time),
        flightDuration: data.flight_duration,
        basePrice: data.base_price,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        seatConfig: data.ticket_classes.map((c: any) => ({
          ticket_class_id: c.ticket_class_id,
          total_seats: c.total_seats,
          ticket_price: c.ticket_price
        }))
      });
    } catch {
      message.error('Không thể tải thông tin chuyến bay');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    const payload = {
      from_airport: parseInt(values.fromAirport),
      to_airport: parseInt(values.toAirport),
      departure_time: values.departureTime.format('YYYY-MM-DDTHH:mm:ss'),
      flight_time_minutes: parseInt(values.flightDuration),
      base_price: parseFloat(values.basePrice),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      seat_config: values.seatConfig.map((s: any) => ({
        ticket_class_id: parseInt(s.ticket_class_id),
        total_seats: parseInt(s.total_seats),
        available_seats: parseInt(s.total_seats),
        ticket_price: parseFloat(s.ticket_price)
      }))
    };

    try {
      await axios.put(`http://localhost:5000/api/v1/flight/flights/${id}`, payload);
      message.success('Cập nhật chuyến bay thành công');
      navigate(routers.flightList.fullPath);
    } catch {
      message.error('Lỗi cập nhật chuyến bay');
    }
  };

  return (
    <Card style={{ maxWidth: 700, margin: '0 auto', marginTop: 32 }}>
      <Title level={3}>Cập nhật chuyến bay</Title>
      <Form form={form} layout='vertical' onFinish={onFinish}>
        <Form.Item name='fromAirport' label='Sân bay đi' rules={[{ required: true }]}>
          <Select placeholder='Chọn sân bay'>
            {airports.map((a) => (
              <Option key={a.id} value={a.id}>
                {a.airport_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='toAirport' label='Sân bay đến' rules={[{ required: true }]}>
          <Select placeholder='Chọn sân bay'>
            {airports.map((a) => (
              <Option key={a.id} value={a.id}>
                {a.airport_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='departureTime' label='Ngày giờ khởi hành' rules={[{ required: true }]}>
          <DatePicker showTime style={{ width: '100%' }} format='YYYY-MM-DD HH:mm' />
        </Form.Item>
        <Form.Item name='flightDuration' label='Thời gian bay (phút)' rules={[{ required: true }]}>
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name='basePrice' label='Giá vé cơ bản (VND)' rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.List name='seatConfig'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Card
                  key={key}
                  size='small'
                  title={`Hạng ghế ${form.getFieldValue(['seatConfig', name, 'ticket_class_id']) || ''}`}
                  extra={
                    <Button danger onClick={() => remove(name)}>
                      Xoá
                    </Button>
                  }
                  style={{ marginBottom: 16 }}
                >
                  <Row gutter={12}>
                    <Col span={8}>
                      <Form.Item {...restField} label='ID hạng ghế' name={[name, 'ticket_class_id']} rules={[{ required: true, message: 'Nhập ID hạng ghế' }]}>
                        <InputNumber min={1} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item {...restField} label='Tổng ghế' name={[name, 'total_seats']} rules={[{ required: true, message: 'Nhập số ghế' }]}>
                        <InputNumber min={1} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item {...restField} label='Giá vé' name={[name, 'ticket_price']} rules={[{ required: true, message: 'Nhập giá vé' }]}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              ))}
              <Form.Item>
                <Button type='dashed' onClick={() => add()} block>
                  Thêm hạng ghế
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type='primary' htmlType='submit' block>
            Cập nhật chuyến bay
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditFlight;
