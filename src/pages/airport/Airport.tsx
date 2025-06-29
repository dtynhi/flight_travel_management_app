import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Table, Typography, Modal, Form, Tag, message } from 'antd';
import airportApi from '~/api/app/airport.api';
import IAirport from '~/types/app/airport.type';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { TableActionButton, TableContextMenuButton } from '~/components/Table';

function AirportPage() {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAirport, setEditingAirport] = useState<IAirport | null>(null);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const fetchAirport = useQuery({
    queryKey: ['airport'],
    queryFn: () => airportApi.getAllAirports()
  });

  const lsAirports: IAirport[] = fetchAirport.data?.data?.data || [];
  const filteredAirports = lsAirports.filter(
    (airport) => airport.name.toLowerCase().includes(searchText.toLowerCase()) || airport.id.toString().includes(searchText)
  );

  // Mutation for creating an airport
  const createAirportMutation = useMutation((payload: { name: string }) => airportApi.createAirport(payload), {
    onSuccess: () => {
      message.success('Tạo sân bay thành công');
      setIsModalVisible(false);
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ['airport'] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Lỗi tạo sân bay, vui lòng thử lại!');
    }
  });

  // Mutation for updating an airport
  const updateAirportMutation = useMutation((data: { id: number; updateData: { name: string } }) => airportApi.updateAirport(data.id, data.updateData), {
    onSuccess: () => {
      message.success('Cập nhật sân bay thành công');
      setIsModalVisible(false);
      setEditingAirport(null);
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ['airport'] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Lỗi cập nhật sân bay, vui lòng thử lại!');
    }
  });

  // Mutation for deleting an airport
  const deleteAirportMutation = useMutation((airportId: number) => airportApi.deleteAirport(airportId), {
    onSuccess: () => {
      message.success('Xóa sân bay thành công');
      queryClient.invalidateQueries({ queryKey: ['airport'] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Lỗi xóa sân bay, vui lòng thử lại!');
    }
  });

  const handleAddAirport = () => {
    setEditingAirport(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditAirport = (airport: IAirport) => {
    setEditingAirport(airport);
    form.setFieldsValue({ name: airport.name });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingAirport) {
          updateAirportMutation.mutate({ id: editingAirport.id, updateData: { name: values.name } });
        } else {
          createAirportMutation.mutate({ name: values.name });
        }
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingAirport(null);
    form.resetFields();
  };

  return (
    <div>
      <div className='flex gap-4 mb-4 w-full'>
        <div className='flex-grow'>
          <Input
            placeholder='Tìm kiếm sân bay...'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            allowClear
            className='w-full'
          />
        </div>

        <div>
          <Button type='primary' icon={<PlusOutlined />} onClick={handleAddAirport} className='w-full h-full'>
            Thêm sân bay
          </Button>
        </div>
      </div>

      <Modal
        title={editingAirport ? 'Cập nhật sân bay' : 'Tạo sân bay mới'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editingAirport ? 'Cập nhật' : 'Tạo'}
        cancelText='Hủy'
        confirmLoading={createAirportMutation.isLoading || updateAirportMutation.isLoading}
      >
        <Form form={form} layout='vertical'>
          <Form.Item label='Tên sân bay' name='name' rules={[{ required: true, message: 'Vui lòng nhập tên sân bay' }]}>
            <Input placeholder='Nhập tên sân bay' />
          </Form.Item>
        </Form>
      </Modal>

      <div className='p-6 bg-white rounded-xl shadow-md'>
        <Typography.Title level={3} className='!mb-4 !text-gray-800'>
          Danh sách Sân bay
        </Typography.Title>

        <Table<IAirport>
          rowKey='id'
          dataSource={filteredAirports}
          loading={fetchAirport.isLoading || fetchAirport.isFetching}
          scroll={{ x: 'max-content' }}
          bordered
          pagination={false}
        >
          <Table.Column<IAirport>
            title={<span className='text-sm font-semibold uppercase text-gray-500'>Mã sân bay</span>}
            align='center'
            dataIndex='id'
            sorter={(a, b) => a.id - b.id}
            defaultSortOrder='ascend'
            render={(id) => (
              <Typography.Text strong style={{ color: '#1677ff' }}>
                #{id}
              </Typography.Text>
            )}
          />

          <Table.Column<IAirport>
            title={<span className='text-sm font-semibold uppercase text-gray-500'>Tên sân bay</span>}
            dataIndex='name'
            render={(name) => <Typography.Text strong>{name}</Typography.Text>}
          />

          <Table.Column<IAirport>
            title={<span className='text-sm font-semibold uppercase text-gray-500'>Trạng thái sân bay</span>}
            dataIndex='status'
            align='center'
            render={(status) => <Tag color={status === 'ACTIVE' ? 'green' : 'red'}>{status === 'ACTIVE' ? 'Hoạt động' : 'Ngừng hoạt động'}</Tag>}
          />

          <Table.Column<IAirport>
            title={<span className='text-sm font-semibold uppercase text-gray-500'>Thời gian cập nhật</span>}
            dataIndex='updatedAt'
            align='center'
            render={(updatedAt) => (
              <Typography.Text type='secondary'>
                {new Date(updatedAt).toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Typography.Text>
            )}
          />

          <Table.Column<IAirport>
            title={<span className='text-sm font-semibold uppercase text-gray-500'>HÀNH ĐỘNG</span>}
            key='actions'
            render={(_, record) => (
              <TableContextMenuButton>
                {({ onClose }) => {
                  return (
                    <>
                      <TableActionButton.Edit
                        onClick={() => {
                          handleEditAirport(record);
                          onClose();
                        }}
                      />
                      <TableActionButton.Delete
                        onClick={() => {
                          deleteAirportMutation.mutate(record.id);
                          onClose();
                        }}
                        loading={deleteAirportMutation.isLoading}
                      />
                    </>
                  );
                }}
              </TableContextMenuButton>
            )}
          />
        </Table>
      </div>
    </div>
  );
}

export default AirportPage;
