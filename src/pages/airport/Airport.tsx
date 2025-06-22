import { useQuery } from '@tanstack/react-query';
import { Button, Input, Table, Typography } from 'antd';
import airportApi from '~/api/app/airport.api';
import IAirport from '~/types/app/airport.type';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
function AirportPage() {
  const [searchText, setSearchText] = useState('');
  const fetchAirport = useQuery({
    queryKey: ['airport'],
    queryFn: () => airportApi.getAllAirports()
  });

  const lsAirports = fetchAirport.data?.data?.data || [];
  const filteredAirports = lsAirports.filter(
    (airport) => airport.name.toLowerCase().includes(searchText.toLowerCase()) || airport.id.toString().includes(searchText)
  );
  const handleAddAirport = () => {
    // TODO: Implement add airport functionality
    console.log('Add airport button clicked');
    // You can open a modal or navigate to an add airport page
  };

  return (
    <div>
      <div className='flex gap-4 mb-4 w-full'>
        {/* Input chiếm 100% không gian còn lại */}
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

        {/* Nút cố định độ rộng */}
        <div>
          <Button type='primary' icon={<PlusOutlined />} onClick={handleAddAirport} className='w-full h-full'>
            Thêm sân bay
          </Button>
        </div>
      </div>

      <div className='p-6 bg-white rounded-xl shadow-md'>
        <Typography.Title level={3} className='!mb-4 !text-gray-800'>
          Danh sách Sân bay
        </Typography.Title>

        <Table<IAirport>
          rowKey='id'
          dataSource={filteredAirports}
          loading={fetchAirport.isLoading || fetchAirport.isFetching}
          scroll={{ x: 'max-content', y: 'calc(80vh - 160px)' }}
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
            render={(status) => (
              <Typography.Text type={status === 'ACTIVE' ? 'success' : 'danger'}>{status === 'ACTIVE' ? 'Hoạt động' : 'Ngừng hoạt động'}</Typography.Text>
            )}
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
        </Table>
      </div>
    </div>
  );
}

export default AirportPage;
