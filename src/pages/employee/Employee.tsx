import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Table, Typography, Modal, Form, Tag, message } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { TableActionButton, TableContextMenuButton } from '~/components/Table';
import IUser from '~/types/app/user.type';
import employeeApi from '~/api/app/employee.api';

function EmployeePage() {
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<IUser | null>(null);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // Fetch employees
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['employees'],
    queryFn: () => employeeApi.getEmployees()
  });
  const employees: IUser[] = data?.data?.data || [];
  const filteredEmployees = employees.filter(
    (employee) => employee.full_name?.toLowerCase().includes(searchText.toLowerCase()) || employee.email.toLowerCase().includes(searchText.toLowerCase())
  );

  // Create employee
  const createEmployeeMutation = useMutation(
    (payload: { full_name?: string; email: string; password: string; phone_number?: string; identification_number?: string }) =>
      employeeApi.createEmployee(payload),
    {
      onSuccess: () => {
        message.success('Tạo nhân viên thành công');
        closeModal();
        queryClient.invalidateQueries({ queryKey: ['employees'] });
      },
      onError: (error: any) => {
        message.error(error.response?.data?.message || 'Lỗi tạo nhân viên, vui lòng thử lại!');
      }
    }
  );

  // Update employee
  const updateEmployeeMutation = useMutation(
    (data: {
      id: number;
      updateData: {
        full_name?: string;
        phone_number?: string;
        identification_number?: string;
      };
    }) => employeeApi.updateEmployee(data.id, data.updateData),
    {
      onSuccess: () => {
        message.success('Cập nhật nhân viên thành công');
        closeModal();
        queryClient.invalidateQueries({ queryKey: ['employees'] });
      },
      onError: (error: any) => {
        message.error(error.response?.data?.message || 'Lỗi cập nhật nhân viên, vui lòng thử lại!');
      }
    }
  );

  // Delete employee
  const deleteEmployeeMutation = useMutation((employeeId: number) => employeeApi.deleteEmployee(employeeId), {
    onSuccess: () => {
      message.success('Xóa nhân viên thành công');
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },

    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Lỗi xóa nhân viên, vui lòng thử lại!');
    }
  });

  const openModalForAdd = () => {
    setEditingEmployee(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openModalForEdit = (employee: IUser) => {
    setEditingEmployee(employee);
    form.setFieldsValue({
      full_name: employee.full_name,
      email: employee.email,
      phone_number: employee.phone_number,
      identification_number: employee.identification_number
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
    form.resetFields();
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingEmployee) {
          updateEmployeeMutation.mutate({
            id: editingEmployee.id,
            updateData: {
              full_name: values.full_name,
              phone_number: values.phone_number,
              identification_number: values.identification_number
            }
          });
        } else {
          createEmployeeMutation.mutate({
            full_name: values.full_name,
            email: values.email,
            password: values.password,
            phone_number: values.phone_number,
            identification_number: values.identification_number
          });
        }
      })
      .catch((err) => console.log('Validation Failed:', err));
  };

  return (
    <div>
      <div className='flex gap-4 mb-4 w-full'>
        <div className='flex-grow'>
          <Input
            placeholder='Tìm kiếm nhân viên...'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            allowClear
            className='w-full'
          />
        </div>
        <Button type='primary' icon={<PlusOutlined />} onClick={openModalForAdd} className='px-4 py-2'>
          Thêm nhân viên
        </Button>
      </div>

      <Modal
        title={editingEmployee ? 'Cập nhật nhân viên' : 'Tạo nhân viên mới'}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={closeModal}
        okText={editingEmployee ? 'Cập nhật' : 'Tạo'}
        cancelText='Hủy'
        confirmLoading={createEmployeeMutation.isLoading || updateEmployeeMutation.isLoading}
      >
        <Form form={form} layout='vertical'>
          <Form.Item label='Họ và tên' name='full_name' rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}>
            <Input placeholder='Nhập họ và tên' />
          </Form.Item>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' }
            ]}
          >
            <Input placeholder='Nhập email' disabled={!!editingEmployee} />
          </Form.Item>
          {!editingEmployee && (
            <Form.Item label='Mật khẩu' name='password' rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
              <Input.Password placeholder='Nhập mật khẩu' />
            </Form.Item>
          )}
          <Form.Item label='Số điện thoại' name='phone_number'>
            <Input placeholder='Nhập số điện thoại' />
          </Form.Item>
          <Form.Item label='CMND/CCCD' name='identification_number'>
            <Input placeholder='Nhập CMND/CCCD' />
          </Form.Item>
        </Form>
      </Modal>

      <div className='p-6 bg-white rounded-xl shadow-md'>
        <Typography.Title level={3} className='!mb-4 !text-gray-800'>
          Danh sách Nhân viên
        </Typography.Title>
        <Table<IUser> rowKey='id' dataSource={filteredEmployees} loading={isLoading || isFetching} scroll={{ x: 'max-content' }} bordered pagination={false}>
          <Table.Column<IUser>
            title={<span className='text-sm font-semibold uppercase text-gray-500'>Mã nhân viên</span>}
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
          <Table.Column<IUser>
            title={<span className='text-sm font-semibold uppercase text-gray-500'>Họ và tên</span>}
            dataIndex='full_name'
            render={(full_name) => <Typography.Text strong>{full_name}</Typography.Text>}
          />
          <Table.Column<IUser> title={<span className='text-sm font-semibold uppercase text-gray-500'>Email</span>} dataIndex='email' />
          <Table.Column<IUser> title={<span className='text-sm font-semibold uppercase text-gray-500'>Số điện thoại</span>} dataIndex='phone_number' />
          <Table.Column<IUser> title={<span className='text-sm font-semibold uppercase text-gray-500'>CMND/CCCD</span>} dataIndex='identification_number' />
          <Table.Column<IUser> title={<span className='text-sm font-semibold uppercase text-gray-500'>Vai trò</span>} dataIndex='role' align='center' />
          <Table.Column<IUser>
            title={<span className='text-sm font-semibold uppercase text-gray-500'>Trạng thái</span>}
            dataIndex='status'
            align='center'
            render={(status) => <Tag color={status === 'ACTIVE' ? 'green' : 'red'}>{status === 'ACTIVE' ? 'Hoạt động' : 'Ngừng hoạt động'}</Tag>}
          />
          <Table.Column<IUser>
            title={<span className='text-sm font-semibold uppercase text-gray-500'>HÀNH ĐỘNG</span>}
            key='actions'
            render={(_, record) => (
              <TableContextMenuButton>
                {({ onClose }) => (
                  <>
                    <TableActionButton.Edit
                      onClick={() => {
                        openModalForEdit(record);
                        onClose();
                      }}
                    />
                    <TableActionButton.Delete
                      onClick={() => {
                        deleteEmployeeMutation.mutate(record.id);
                        onClose();
                      }}
                      loading={deleteEmployeeMutation.isLoading}
                    />
                  </>
                )}
              </TableContextMenuButton>
            )}
          />
        </Table>
      </div>
    </div>
  );
}

export default EmployeePage;
