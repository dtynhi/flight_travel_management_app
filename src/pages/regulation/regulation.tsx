import React, { useEffect } from 'react';
import { Card, Form, InputNumber, Checkbox, Button, Space, Divider, message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// API gọi
const fetchRegulations = async () => {
  const { data } = await axios.get('/api/v1/regulations');
  return data.data; // dữ liệu trong data.data
};

const updateRegulation = async (regulation: { key: string; value: string }) => {
  const { data } = await axios.put('/api/v1/regulations', regulation, {
    headers: { 'Content-Type': 'application/json' }
  });
  return data;
};

const RegulationPage: React.FC = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // React Query lấy data
  const { data, isLoading } = useQuery(['regulations'], fetchRegulations);

  // Mutation cập nhật 1 quy định
  const mutation = useMutation(updateRegulation, {
    onSuccess: () => {
      message.success('Cập nhật quy định thành công');
      queryClient.invalidateQueries(['regulations']); // làm mới dữ liệu
    },
    onError: () => {
      message.error('Cập nhật quy định thất bại');
    },
  });

  // Transform dữ liệu từ API về form fields
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformFromApi = (regs: any[]) => {
    const QD1 = regs.find(r => r.key === 'QD1')?.value || '';
    const QD2 = regs.find(r => r.key === 'QD2')?.value || '';
    const QD3 = regs.find(r => r.key === 'QD3')?.value || '';

    let qd1Data = { numberOfAirports: 10, minFlightTime: 30, maxStopoverAirports: 2, minStopoverTime: 10, maxStopoverTime: 20 };
    let qd2Data = { numberOfTicketClasses: 2, ticketClass1PriceRate: 1.05, ticketClass2PriceRate: 1.0 };
    let qd3Data = { latestBookingDaysBefore: 1, cancelOnDepartureDay: true };

    try {
      if (QD1) qd1Data = JSON.parse(QD1);
      if (QD2) qd2Data = JSON.parse(QD2);
      if (QD3) qd3Data = JSON.parse(QD3);
    } catch {
      message.warning('Dữ liệu quy định không đúng định dạng JSON, dùng giá trị mặc định.');
    }

    return {
      ...qd1Data,
      ...qd2Data,
      ...qd3Data,
    };
  };

  // Transform form values thành mảng quy định (key, value)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformToApi = (values: any) => {
    return [
      {
        key: 'QD1',
        value: JSON.stringify({
          numberOfAirports: values.numberOfAirports,
          minFlightTime: values.minFlightTime,
          maxStopoverAirports: values.maxStopoverAirports,
          minStopoverTime: values.minStopoverTime,
          maxStopoverTime: values.maxStopoverTime,
        }),
      },
      {
        key: 'QD2',
        value: JSON.stringify({
          numberOfTicketClasses: values.numberOfTicketClasses,
          ticketClass1PriceRate: values.ticketClass1PriceRate,
          ticketClass2PriceRate: values.ticketClass2PriceRate,
        }),
      },
      {
        key: 'QD3',
        value: JSON.stringify({
          latestBookingDaysBefore: values.latestBookingDaysBefore,
          cancelOnDepartureDay: values.cancelOnDepartureDay,
        }),
      },
      {
        key: 'QD6',
        value: 'Người dùng có thể thay đổi các quy định QD1, QD2, QD3 theo yêu cầu.',
      }
    ];
  };

  // Khi data load xong, set lên form
  useEffect(() => {
    if (data) {
      const formData = transformFromApi(data);
      form.setFieldsValue(formData);
    }
  }, [data, form]);

  // Xử lý submit: gọi mutation cho từng quy định
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    const regsToUpdate = transformToApi(values);
    try {
      await Promise.all(regsToUpdate.map(reg => mutation.mutateAsync(reg)));
    } catch {
      // lỗi đã được báo trong onError mutation
    }
  };

  return (
    <Card title="Quản lý Quy Định" loading={isLoading}>
      <Form form={form} layout="vertical" onFinish={onFinish}>

        <Divider>QĐ1: Số sân bay, thời gian bay, sân bay trung gian</Divider>
        <Form.Item name="numberOfAirports" label="Số lượng sân bay" rules={[{ required: true }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="minFlightTime" label="Thời gian bay tối thiểu (phút)" rules={[{ required: true }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="maxStopoverAirports" label="Số sân bay trung gian tối đa" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name="minStopoverTime" label="Thời gian dừng tối thiểu tại sân bay trung gian (phút)" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name="maxStopoverTime" label="Thời gian dừng tối đa tại sân bay trung gian (phút)" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>

        <Divider>QĐ2: Vé và giá vé</Divider>
        <Form.Item name="numberOfTicketClasses" label="Số lượng hạng vé" rules={[{ required: true }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="ticketClass1PriceRate" label="Tỉ lệ giá vé hạng 1 (ví dụ 1.05 = 105%)" rules={[{ required: true}]}>
          <InputNumber min={0} step={0.01} />
        </Form.Item>
        <Form.Item name="ticketClass2PriceRate" label="Tỉ lệ giá vé hạng 2 (ví dụ 1 = 100%)" rules={[{ required: true}]}>
          <InputNumber min={0} step={0.01} />
        </Form.Item>

        <Divider>QĐ3: Đặt vé và hủy vé</Divider>
        <Form.Item name="latestBookingDaysBefore" label="Số ngày chậm nhất khi đặt vé" rules={[{ required: true}]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name="cancelOnDepartureDay" valuePropName="checked">
          <Checkbox>Hủy tất cả phiếu đặt vào ngày khởi hành</Checkbox>
        </Form.Item>

        <Divider>QĐ6: Quyền thay đổi quy định</Divider>
        <p>Người dùng có thể thay đổi các quy định QĐ1, QĐ2, QĐ3 như trên.</p>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={mutation.isLoading}>Lưu thay đổi</Button>
            <Button onClick={() => form.resetFields()}>Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RegulationPage;
