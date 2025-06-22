import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
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
  Typography,
  message,
  App as AntdApp
} from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;
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
        available_seats: Number(s.total_seats),
        ticket_price: Number(s.ticket_price)
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
    <AntdApp>
      <Row justify='center' style={{ marginTop: 32 }}>
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card style={{ boxShadow: '0 8px 32px rgba(60, 60, 130, 0.08)', borderRadius: 16 }}>
            <Title level={3} style={{ textAlign: 'center' }}>
              Thêm chuyến bay
            </Title>
            <Divider />
            <Form form={form} layout='vertical' onFinish={onFinish}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name='fromAirport'
                    label='Sân bay đi'
                    rules={[{ required: true, message: 'Vui lòng chọn sân bay đi' }]}
                  >
                    <Select placeholder='Chọn sân bay'>
                      {airports.map((a) => (
                        <Option key={a.id} value={a.id}>
                          {a.airport_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name='toAirport'
                    label='Sân bay đến'
                    rules={[{ required: true, message: 'Vui lòng chọn sân bay đến' }]}
                  >
                    <Select placeholder='Chọn sân bay'>
                      {airports.map((a) => (
                        <Option key={a.id} value={a.id}>
                          {a.airport_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name='departureTime'
                    label='Ngày giờ khởi hành'
                    rules={[{ required: true, message: 'Vui lòng chọn ngày giờ khởi hành' }]}
                  >
                    <DatePicker showTime format='YYYY-MM-DD HH:mm' style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name='flightDuration'
                    label='Thời gian bay (phút)'
                    rules={[{ required: true, message: 'Vui lòng nhập thời gian bay' }]}
                  >
                    <InputNumber min={1} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name='basePrice'
                label='Giá vé cơ bản (VND)'
                rules={[{ required: true, message: 'Vui lòng nhập giá vé cơ bản' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>

              <Divider orientation='left'>Sân bay trung gian</Divider>
              <Form.List name='intermediateAirports'>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                        <Form.Item
                          {...restField}
                          name={[name, 'id']}
                          rules={[{ required: true, message: 'Vui lòng chọn sân bay trung gian' }]}
                        >
                          <Select placeholder='Sân bay trung gian' style={{ width: 180 }}>
                            {airports.map((a) => (
                              <Option key={a.id} value={a.id}>
                                {a.airport_name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'stop_duration']}
                          rules={[{ required: true, message: 'Vui lòng nhập thời gian dừng' }]}
                        >
                          <InputNumber placeholder='Phút dừng' min={1} />
                        </Form.Item>
                        <Form.Item {...restField} name={[name, 'note']}>
                          <Input placeholder='Ghi chú' />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type='dashed' onClick={() => add()} icon={<PlusOutlined />}>
                        Thêm sân bay
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Divider orientation='left'>Cấu hình hạng ghế</Divider>
              <Form.List name='seatConfig'>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name }) => (
                      <Card
                        key={key}
                        size='small'
                        style={{ marginBottom: 16 }}
                        title={`Hạng ghế ${name + 1}`}
                        extra={
                          <Button danger onClick={() => remove(name)}>
                            Xoá
                          </Button>
                        }
                      >
                        <Row gutter={12}>
                          <Col span={8}>
                            <Form.Item
                              label='ID hạng'
                              name={[name, 'ticket_class_id']}
                              rules={[{ required: true, message: 'Vui lòng nhập ID hạng ghế' }]}
                            >
                              <InputNumber min={1} style={{ width: '100%' }} />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              label='Tổng ghế'
                              name={[name, 'total_seats']}
                              rules={[{ required: true, message: 'Vui lòng nhập tổng số ghế' }]}
                            >
                              <InputNumber min={0} style={{ width: '100%' }} />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              label='Giá vé'
                              name={[name, 'ticket_price']}
                              rules={[{ required: true, message: 'Vui lòng nhập giá vé' }]}
                            >
                              <InputNumber min={0} style={{ width: '100%' }} />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                    <Form.Item>
                      <Button type='dashed' onClick={() => add()} icon={<PlusOutlined />}>
                        Thêm hạng ghế
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Form.Item>
                <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
                  Tạo chuyến bay
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </AntdApp>
  );
};

export default AddFlight;


