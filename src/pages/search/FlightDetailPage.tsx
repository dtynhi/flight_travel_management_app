import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  Descriptions, 
  Button, 
  Tag, 
  Space, 
  Spin, 
  Alert,
  Modal,
  Input,
  Select,
  DatePicker,
  InputNumber,
  message,
  Row,
  Col,
  Table,
  List,
  Form,
  Divider
} from 'antd';
import { 
  EditOutlined, 
  ArrowLeftOutlined, 
  EnvironmentOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  StopOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  SettingOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

import flightApi from '~/api/app/flight.api';
import flightTicketClassApi from '~/api/app/flight_ticket_class.api';
import useAirport from '~/hooks/useAirport';
import useTicketClass from '~/hooks/useTicketClass';
import type IFlight from '~/types/app/flight.type';
import type { IFlightTicketClass } from '~/types/app/flight.type';
import { takeCoverage } from 'v8';

const { Option } = Select;

const FlightDetailPage: React.FC = () => {
  const { flightId } = useParams<{ flightId: string }>();
  const navigate = useNavigate();
  const { airports } = useAirport();
  const { ticketClasses } = useTicketClass();
  
  const [flight, setFlight] = useState<IFlight | null>(null);
  const [ticketClassDetails, setTicketClassDetails] = useState<IFlightTicketClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [seatLoading, setSeatLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  
  // New modals for managing intermediate airports and seat config
  const [airportModalVisible, setAirportModalVisible] = useState(false);
  const [airportLoading, setAirportLoading] = useState(false);
  const [airportForm] = Form.useForm();
  
  const [seatConfigModalVisible, setSeatConfigModalVisible] = useState(false);
  const [seatConfigLoading, setSeatConfigLoading] = useState(false);
  const [seatForm] = Form.useForm();
  
  // Form state for flight edit
  const [editFormData, setEditFormData] = useState({
    fromAirport: null as number | null,
    toAirport: null as number | null,
    departureTime: null as any,
    flightDuration: 0,
    basePrice: 0,
    status: 'ACTIVE',
  });

  // Load flight details and seat data
  useEffect(() => {
    if (flightId) {
      loadFlightDetails(parseInt(flightId));
      loadSeatDetails(parseInt(flightId));
    }
  }, [flightId]);

  const loadFlightDetails = async (id: number) => {
    setLoading(true);
    try {
      const response = await flightApi.getFlightById(id);
      const flightData = response.data.data;
      console.log('Flight data:', flightData);
      setFlight(flightData);
    } catch (error) {
      console.error('Error loading flight:', error);
      message.error('Không thể tải thông tin chuyến bay');
    } finally {
      setLoading(false);
    }
  };

  const loadSeatDetails = async (id: number) => {
    setSeatLoading(true);
    try {
      const response = await flightTicketClassApi.getTicketClassesByFlight(id);
      const seatData = response.data.data;
      console.log('Seat data:', seatData);
      
      if (seatData && seatData.ticketClasses && seatData.ticketClasses.length > 0) {
        setTicketClassDetails(seatData.ticketClasses);
      } else {
        setTicketClassDetails([]);
      }
    } catch (error) {
      console.error('Error loading seat details:', error);
      message.error('Không thể tải thông tin ghế ngồi');
      setTicketClassDetails([]);
    } finally {
      setSeatLoading(false);
    }
  };

  // Handle intermediate airports management
  const handleManageAirports = () => {
    if (flight && flight.intermediate_airports) {
      console.log('Raw intermediate airports data:', flight.intermediate_airports);
      console.log('Available airports:', airports);
      
      const formData = flight.intermediate_airports.map((stop: any, index: number) => {
        console.log('Processing stop:', stop);
        
        // First try to get direct ID fields
        let airportId = stop.airport_id || 
                     stop.intermediate_airport_id || 
                     stop.airportId || 
                     stop.id;
      
        // If no direct ID found, try to find airport by name
        if (!airportId && stop.airport_name) {
          const foundAirport = airports.find(airport => 
            airport.airportName === stop.airport_name ||
            airport.airportName.toLowerCase() === stop.airport_name.toLowerCase()
          );
          
          if (foundAirport) {
            airportId = foundAirport.id;
            console.log(`Found airport ID ${airportId} for name "${stop.airport_name}"`);
          } else {
            console.warn(`Could not find airport ID for name: "${stop.airport_name}"`);
          }
        }
      
        console.log('Final mapped airport ID:', airportId);
      
        return {
          id: airportId,
          stop_duration: stop.stop_duration,
          stop_order: index + 1,
          note: stop.note || stop.notes || ''
        };
      });
      
      console.log('Form data to set:', formData);
      
      airportForm.setFieldsValue({
        intermediateAirports: formData
      });
    } else {
      airportForm.setFieldsValue({
        intermediateAirports: []
      });
    }
    setAirportModalVisible(true);
  };

  const handleSaveAirports = async (values: any) => {
    if (!flight) return;

    setAirportLoading(true);
    try {
      const intermediateAirports = (values.intermediateAirports || []).map((stop: any, idx: number) => ({
        id: Number(stop.id),
        stop_duration: Number(stop.stop_duration),
        stop_order: idx + 1,
        note: stop.note || ''
      }));

      const payload = {
        intermediate_airports: intermediateAirports
      };

      console.log('Sending airports payload:', payload);

      await flightApi.updateFlight(flight.id, payload);
      message.success('Cập nhật sân bay trung gian thành công');
      setAirportModalVisible(false);
      
      loadFlightDetails(flight.id);
    } catch (error: any) {
      console.error('Update airports error:', error);
      const errorMessage = error.response?.data?.message || 'Lỗi cập nhật sân bay trung gian';
      message.error(errorMessage);
    } finally {
      setAirportLoading(false);
    }
  };

  // Handle seat configuration management
  const handleManageSeatConfig = () => {
      console.log('Flight data:', flight);
      console.log('Available ticket classes:', ticketClasses);
      console.log('Ticket class details:', ticketClassDetails);
      
      if (flight && flight.ticket_classes) {
        console.log('Using flight.ticket_classes:', flight.ticket_classes);
        
        // Use data from flight API response
        const formData = flight.ticket_classes.map((tc: any) => {
          console.log('Processing ticket class from flight:', tc);
          
          // Find the ticket class ID by name
          let classId = tc.class_id || tc.ticket_class_id;
          
          // If no direct ID found, try to find by class name
          if (!classId && tc.class_name) {
            const foundClass = ticketClasses.find(ticketClass => 
              ticketClass.className === tc.class_name ||
              ticketClass.className.toLowerCase() === tc.class_name.toLowerCase()
            );
            
            if (foundClass) {
              classId = foundClass.id;
              console.log(`Found ticket class ID ${classId} for name "${tc.class_name}"`);
            } else {
              console.warn(`Could not find ticket class ID for name: "${tc.class_name}"`);
            }
          }
          
          console.log('Final mapped class ID:', classId);
          
          return {
            class_id: classId,
            total_seats: tc.total_seats,
            price_multiplier: tc.price_multiplier || 1
          };
        });
        
        console.log('Form data from flight.ticket_classes:', formData);
        seatForm.setFieldsValue({
          seatConfig: formData
        });
      } else if (ticketClassDetails && ticketClassDetails.length > 0) {
        console.log('Using ticketClassDetails fallback:', ticketClassDetails);
        
        // Fallback to ticket class details
        const formData = ticketClassDetails.map((tc: any) => {
          console.log('Processing ticket class from details:', tc);
          
          const classId = tc.ticketClass?.id || 
                        tc.ticketClassId || 
                        tc.class_id ||
                        tc.ticket_class_id;
          
          console.log('Mapped class ID:', classId);
          
          return {
            class_id: classId,
            total_seats: tc.totalSeats,
            price_multiplier: tc.ticketClass?.priceMultiplier || tc.price_multiplier || 1
          };
        });
        
        console.log('Form data from ticketClassDetails:', formData);
        seatForm.setFieldsValue({
          seatConfig: formData
        });
      } else {
        console.log('No seat configuration data found, setting empty form');
        seatForm.setFieldsValue({
          seatConfig: []
        });
      }
      setSeatConfigModalVisible(true);
    };

  const handleSaveSeatConfig = async (values: any) => {
    if (!flight) return;

    setSeatConfigLoading(true);
    try {
      // Transform form data to match backend API structure
      const seatConfig = (values.seatConfig || []).map((seat: any) => ({
        ticket_class_id: Number(seat.class_id),
        total_seats: Number(seat.total_seats),
      }));

      // Use the existing updateFlight API with seat_classes field
      const payload = {
        "seat_config": seatConfig
      };

      console.log('Sending seat config payload:', payload);

      await flightApi.updateFlight(flight.id, payload);
      message.success('Cập nhật cấu hình ghế thành công');
      setSeatConfigModalVisible(false);
      
      // Reload both flight details and seat details
      loadFlightDetails(flight.id);
      loadSeatDetails(flight.id);
    } catch (error: any) {
      console.error('Update seat config error:', error);
      const errorMessage = error.response?.data?.message || 'Lỗi cập nhật cấu hình ghế';
      message.error(errorMessage);
    } finally {
      setSeatConfigLoading(false);
    }
  };

  // Existing handlers for flight edit
  const handleEdit = () => {
    if (flight) {
      setEditFormData({
        fromAirport: flight.departureAirportId,
        toAirport: flight.arrivalAirportId,
        departureTime: flight.departureTime ? dayjs(flight.departureTime) : null,
        flightDuration: flight.flightDuration ? parseInt(flight.flightDuration.replace(/\D/g, '')) : 0,
        basePrice: flight.basePrice,
        status: flight.status,
      });
    }
    setEditModalVisible(true);
  };

  const handleModalCancel = () => {
    setEditModalVisible(false);
    setEditFormData({
      fromAirport: null,
      toAirport: null,
      departureTime: null,
      flightDuration: 0,
      basePrice: 0,
      status: 'ACTIVE',
    });
  };

  const validateForm = () => {
    if (!editFormData.fromAirport) {
      message.error('Vui lòng chọn sân bay đi');
      return false;
    }
    if (!editFormData.toAirport) {
      message.error('Vui lòng chọn sân bay đến');
      return false;
    }
    if (!editFormData.departureTime) {
      message.error('Vui lòng chọn thời gian khởi hành');
      return false;
    }
    if (!editFormData.flightDuration || editFormData.flightDuration < 30) {
      message.error('Thời gian bay phải ít nhất 30 phút');
      return false;
    }
    if (!editFormData.basePrice || editFormData.basePrice <= 0) {
      message.error('Giá cơ bản phải lớn hơn 0');
      return false;
    }
    return true;
  };

  const handleUpdateFlight = async () => {
    if (!flight || !validateForm()) return;

    setEditLoading(true);
    try {
      const payload = {
        from_airport: editFormData.fromAirport,
        to_airport: editFormData.toAirport,
        departure_time: editFormData.departureTime.format('YYYY-MM-DDTHH:mm:ss'),
        flight_time_minutes: editFormData.flightDuration,
        base_price: editFormData.basePrice,
        status: editFormData.status,
      };

      await flightApi.updateFlight(flight.id, payload);
      message.success('Cập nhật chuyến bay thành công');
      setEditModalVisible(false);
      
      loadFlightDetails(flight.id);
      loadSeatDetails(flight.id);
    } catch (error: any) {
      console.error('Update error:', error);
      message.error(error.response?.data?.message || 'Lỗi cập nhật chuyến bay');
    } finally {
      setEditLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'green';
      case 'cancelled': return 'red';
      case 'scheduled': return 'blue';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'Hoạt động';
      case 'cancelled': return 'Đã hủy';
      case 'scheduled': return 'Hoàn thành';
      default: return status || 'N/A';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <Spin size="large" />
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Alert
          message="Không tìm thấy chuyến bay"
          description="Chuyến bay không tồn tại hoặc đã bị xóa"
          type="error"
          showIcon
        />
      </div>
    );
  }

  // Table columns for seat configuration
  const seatConfigColumns = [
    {
      title: 'Hạng ghế',
      dataIndex: ['ticketClass', 'className'],
      key: 'className',
      render: (className: string) => (
        <Tag color="blue" className="text-sm font-medium">
          {className || 'N/A'}
        </Tag>
      ),
    },
    {
      title: 'Tổng ghế',
      dataIndex: 'totalSeats',
      key: 'totalSeats',
      align: 'center' as const,
      render: (seats: number) => (
        <span className="font-medium text-blue-600 text-lg">{seats || 0}</span>
      ),
    },
    {
      title: 'Ghế đã đặt',
      key: 'reservedSeats',
      align: 'center' as const,
      render: (record: IFlightTicketClass) => {
        const reserved = record.totalSeats - record.availableSeats;
        return (
          <span className="font-medium text-orange-600 text-lg">{reserved}</span>
        );
      },
    },
    {
      title: 'Giá vé',
      dataIndex: 'ticketPrice',
      key: 'ticketPrice',
      align: 'right' as const,
      render: (price: number) => (
        <span className="text-green-600 font-medium text-lg">
          {price ? `${price.toLocaleString()} VND` : 'N/A'}
        </span>
      ),
    }
  ];

  // Calculate totals
  const totalSeats = ticketClassDetails.reduce((sum, record) => sum + (record.totalSeats || 0), 0);
  const totalAvailable = ticketClassDetails.reduce((sum, record) => sum + (record.availableSeats || 0), 0);
  const totalReserved = totalSeats - totalAvailable;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-purple-600">
            Chi tiết chuyến bay {flight.id}
          </h1>
        </div>
        <Button 
          type="primary" 
          icon={<EditOutlined />}
          onClick={handleEdit}
        >
          Chỉnh sửa
        </Button>
      </div>

      {/* Flight Basic Info */}
      <Card title="Thông tin cơ bản" className="shadow-sm">
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Mã chuyến bay" span={1}>
            <strong>{flight.id}</strong>
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái" span={1}>
            <Tag color={getStatusColor(flight.status)}>
              {getStatusLabel(flight.status)}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Sân bay đi" span={1}>
            <Space>
              <EnvironmentOutlined className="text-blue-500" />
              {flight.departureAirport}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Sân bay đến" span={1}>
            <Space>
              <EnvironmentOutlined className="text-green-500" />
              {flight.arrivalAirport}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Thời gian khởi hành" span={1}>
            <Space>
              <ClockCircleOutlined />
              {flight.departureTime ? dayjs(flight.departureTime).format('DD/MM/YYYY HH:mm') : 'N/A'}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Thời gian đến" span={1}>
            <Space>
              <ClockCircleOutlined />
              {flight.arrivalTime ? dayjs(flight.arrivalTime).format('DD/MM/YYYY HH:mm') : 'N/A'}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Thời gian bay" span={1}>
            {flight.flightDuration}
          </Descriptions.Item>
          <Descriptions.Item label="Giá cơ bản" span={1}>
            <Space>
              <DollarOutlined className="text-green-500" />
              <strong>{flight.basePrice?.toLocaleString()} VND</strong>
            </Space>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Intermediate Airports with Management Button */}
      <Card 
        title={
          <div className="flex justify-between items-center">
            <Space>
              <span>Sân bay trung gian</span>
            </Space>
            <Button 
              type="primary" 
              size="small"
              icon={<SettingOutlined />}
              onClick={handleManageAirports}
            >
              Quản lý
            </Button>
          </div>
        } 
        className="shadow-sm"
      >
        {flight.intermediate_airports && flight.intermediate_airports.length > 0 ? (
          <List
            dataSource={flight.intermediate_airports}
            renderItem={(stop: any, index: number) => (
              <List.Item key={`stop-${index}`}>
                <div className="w-full flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <EnvironmentOutlined className="text-orange-500" />
                        <span className="font-medium text-lg">{stop.airport_name}</span>
                      </div>
                      {(stop.note || stop.notes) && (
                        <div className="text-sm text-gray-600 mt-1">
                          Ghi chú: {stop.note || stop.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-orange-600">
                      <ClockCircleOutlined />
                      <span className="font-medium">{stop.stop_duration} phút</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Thời gian dừng</div>
                  </div>
                </div>
              </List.Item>
            )}
          />
        ) : (
          <div className="text-center py-8 text-gray-500">
            <StopOutlined className="text-4xl mb-2" />
            <p>Không có sân bay trung gian</p>
            <Button 
              type="dashed" 
              icon={<PlusOutlined />}
              onClick={handleManageAirports}
              className="mt-2"
            >
              Thêm sân bay trung gian
            </Button>
          </div>
        )}
      </Card>

      {/* Seat Configuration with Management Button */}
      <Card 
        title={
          <div className="flex justify-between items-center">
            <span>Cấu hình hạng ghế</span>
            <Button 
              type="primary" 
              size="small"
              icon={<SettingOutlined />}
              onClick={handleManageSeatConfig}
            >
              Quản lý
            </Button>
          </div>
        } 
        className="shadow-sm" 
        loading={seatLoading}
      >
        {ticketClassDetails && ticketClassDetails.length > 0 ? (
          <Table
            columns={seatConfigColumns}
            dataSource={ticketClassDetails}
            rowKey={(record) => `seat-${record.ticketClassId}`}
            pagination={false}
            size="small"
            summary={() => (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                  <strong>Tổng cộng</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} align="center">
                  <strong className="text-blue-600 text-lg">{totalSeats}</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2} align="center">
                  <strong className="text-orange-600 text-lg">{totalReserved}</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  <strong>-</strong>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            )}
          />
        ) : (
          <div className="text-center py-8 text-gray-500">
            <DollarOutlined className="text-4xl mb-2" />
            <p>Chưa có cấu hình hạng ghế</p>
            <Button 
              type="dashed" 
              icon={<PlusOutlined />}
              onClick={handleManageSeatConfig}
              className="mt-2"
            >
              Thêm cấu hình ghế
            </Button>
          </div>
        )}
      </Card>

      {/* Flight Edit Modal */}
      <Modal
        title="Chỉnh sửa chuyến bay"
        open={editModalVisible}
        onCancel={handleModalCancel}
        onOk={handleUpdateFlight}
        confirmLoading={editLoading}
        width={800}
      >
        <div style={{ padding: '16px 0' }}>
          <Row gutter={16}>
            <Col span={12}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
                  Sân bay đi <span style={{ color: 'red' }}>*</span>
                </label>
                <Select
                  placeholder="Chọn sân bay"
                  value={editFormData.fromAirport}
                  onChange={(value) => setEditFormData(prev => ({ ...prev, fromAirport: value }))}
                  style={{ width: '100%' }}
                >
                  {airports.map((a) => (
                    <Option key={a.id} value={a.id}>
                      {a.airportName}
                    </Option>
                  ))}
                </Select>
              </div>
            </Col>
            <Col span={12}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
                  Sân bay đến <span style={{ color: 'red' }}>*</span>
                </label>
                <Select
                  placeholder="Chọn sân bay"
                  value={editFormData.toAirport}
                  onChange={(value) => setEditFormData(prev => ({ ...prev, toAirport: value }))}
                  style={{ width: '100%' }}
                >
                  {airports.map((a) => (
                    <Option key={a.id} value={a.id}>
                      {a.airportName}
                    </Option>
                  ))}
                </Select>
              </div>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
                  Thời gian khởi hành <span style={{ color: 'red' }}>*</span>
                </label>
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm"
                  value={editFormData.departureTime}
                  onChange={(value) => setEditFormData(prev => ({ ...prev, departureTime: value }))}
                  style={{ width: '100%' }}
                />
              </div>
            </Col>
            <Col span={8}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
                  Thời gian bay (phút) <span style={{ color: 'red' }}>*</span>
                </label>
                <InputNumber
                  min={30}
                  value={editFormData.flightDuration}
                  onChange={(value) => setEditFormData(prev => ({ ...prev, flightDuration: value || 0 }))}
                  style={{ width: '100%' }}
                />
              </div>
            </Col>
            <Col span={8}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
                  Giá cơ bản (VND) <span style={{ color: 'red' }}>*</span>
                </label>
                <InputNumber
                  min={0}
                  value={editFormData.basePrice}
                  onChange={(value) => setEditFormData(prev => ({ ...prev, basePrice: value || 0 }))}
                  style={{ width: '100%' }}
                />
              </div>
            </Col>
          </Row>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
              Trạng thái <span style={{ color: 'red' }}>*</span>
            </label>
            <Select
              value={editFormData.status}
              onChange={(value) => setEditFormData(prev => ({ ...prev, status: value }))}
              style={{ width: '100%' }}
            >
              <Option value="ACTIVE">Hoạt động</Option>
              <Option value="CANCELLED">Đã hủy</Option>
              <Option value="SCHEDULED">Hoàn thành</Option>
            </Select>
          </div>
        </div>
      </Modal>

      {/* Intermediate Airports Management Modal */}
      <Modal
        title="Quản lý sân bay trung gian"
        open={airportModalVisible}
        onCancel={() => {
          setAirportModalVisible(false);
          airportForm.resetFields();
        }}
        onOk={() => airportForm.submit()}
        confirmLoading={airportLoading}
        width={800}
        okText="Lưu thay đổi"
        cancelText="Hủy"
      >
        <Form
          form={airportForm}
          onFinish={handleSaveAirports}
          layout="vertical"
        >
          <Form.List name="intermediateAirports">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} style={{ marginBottom: 16, padding: 16, border: '1px solid #d9d9d9', borderRadius: 6 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <strong>Sân bay trung gian {name + 1}</strong>
                      <Button 
                        type="text" 
                        danger 
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                      >
                        Xóa
                      </Button>
                    </div>
                    
                    <Row gutter={12}>
                      <Col span={12}>
                        <Form.Item 
                          {...restField} 
                          name={[name, 'id']} 
                          label="Sân bay"
                          rules={[{ required: true, message: 'Vui lòng chọn sân bay' }]}
                        >
                          <Select placeholder="Chọn sân bay trung gian">
                            {airports.map((a) => (
                              <Option key={a.id} value={a.id}>
                                {a.airportName}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item 
                          {...restField} 
                          name={[name, 'stop_duration']} 
                          label="Thời gian dừng (phút)"
                          rules={[
                            { required: true, message: 'Nhập thời gian dừng' },
                            { type: 'number'}
                          ]}
                        >
                          <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item {...restField} name={[name, 'note']} label="Ghi chú">
                          <Input placeholder="Ghi chú (tùy chọn)" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                ))}
                
                <Form.Item>
                  <Button 
                    type="dashed" 
                    onClick={() => add()} 
                    icon={<PlusOutlined />}
                    style={{ width: '100%' }}
                  >
                    Thêm sân bay trung gian
                  </Button>
                </Form.Item>
                
                {fields.length === 0 && (
                  <div style={{ textAlign: 'center', padding: 24, color: '#999' }}>
                    <StopOutlined style={{ fontSize: 48, marginBottom: 8 }} />
                    <p>Chưa có sân bay trung gian nào</p>
                  </div>
                )}
              </>
            )}
          </Form.List>
        </Form>
      </Modal>

      {/* Seat Configuration Management Modal */}
      <Modal
        title="Quản lý cấu hình hạng ghế"
        open={seatConfigModalVisible}
        onCancel={() => {
          setSeatConfigModalVisible(false);
          seatForm.resetFields();
        }}
        onOk={() => seatForm.submit()}
        confirmLoading={seatConfigLoading}
        width={900}
        okText="Lưu thay đổi"
        cancelText="Hủy"
      >
        <Form
          form={seatForm}
          onFinish={handleSaveSeatConfig}
          layout="vertical"
        >
          <Form.List name="seatConfig">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} style={{ marginBottom: 16, padding: 16, border: '1px solid #d9d9d9', borderRadius: 6 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <strong>Cấu hình hạng ghế {name + 1}</strong>
                      <Button 
                        type="text" 
                        danger 
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                      >
                        Xóa
                      </Button>
                    </div>
                    
                    <Row gutter={12}>
                      <Col span={8}>
                        <Form.Item 
                          {...restField} 
                          name={[name, 'class_id']} 
                          label="Hạng ghế"
                          rules={[{ required: true, message: 'Vui lòng chọn hạng ghế' }]}
                        >
                          <Select placeholder="Chọn hạng ghế">
                            {ticketClasses.map((tc) => (
                              <Option key={tc.id} value={tc.id}>
                                {tc.className}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item 
                          {...restField} 
                          name={[name, 'total_seats']} 
                          label="Tổng số ghế"
                          rules={[
                            { required: true, message: 'Nhập số ghế' },
                            { type: 'number', min: 1, message: 'Ít nhất 1 ghế' }
                          ]}
                        >
                          <InputNumber min={1} max={500} style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                ))}
                
                <Form.Item>
                  <Button 
                    type="dashed" 
                    onClick={() => add()} 
                    icon={<PlusOutlined />}
                    style={{ width: '100%' }}
                  >
                    Thêm cấu hình hạng ghế
                  </Button>
                </Form.Item>
                
                {fields.length === 0 && (
                  <div style={{ textAlign: 'center', padding: 24, color: '#999' }}>
                    <DollarOutlined style={{ fontSize: 48, marginBottom: 8 }} />
                    <p>Chưa có cấu hình hạng ghế nào</p>
                  </div>
                )}
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default FlightDetailPage;