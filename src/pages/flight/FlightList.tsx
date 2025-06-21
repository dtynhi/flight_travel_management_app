import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Space, Tag, Popconfirm, message } from 'antd';
import { FiEdit } from 'react-icons/fi';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import routers from '~/routers/router'; // ✅ thêm dòng này

interface Flight {
  id: number;
  from_airport_id: number;
  to_airport_id: number;
  from_airport: string;
  to_airport: string;
  departure_time: string;
  status: string;
}

const ListFlights: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/v1/flight/flights');
      setFlights(res.data.data);
    } catch (err) {
      message.error('Không thể tải chuyến bay');
    } finally {
      setLoading(false);
    }
  };

  const deleteFlight = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/flight/flights/${id}`);
      message.success('Đã xoá chuyến bay');
      fetchFlights();
    } catch (err) {
      message.error('Lỗi khi xoá chuyến bay');
    }
  };

  const columns = [
    {
      title: 'Mã chuyến',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Từ',
      dataIndex: 'from_airport',
      key: 'from_airport',
    },
    {
      title: 'Đến',
      dataIndex: 'to_airport',
      key: 'to_airport',
    },
    {
      title: 'Khởi hành',
      dataIndex: 'departure_time',
      key: 'departure_time',
      render: (time: string) => new Date(time).toLocaleString(),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'ACTIVE' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Flight) => (
        <Space>
          <Button
            icon={<FiEdit />}
            type='link'
            onClick={() => navigate(routers.editFlight.fullPath.replace(':id', record.id.toString()))}
          >
            Sửa
          </Button>
          <Popconfirm
            title='Xác nhận xoá?'
            onConfirm={() => deleteFlight(record.id)}
            okText='Xoá'
            cancelText='Huỷ'
          >
            <Button icon={<FaRegTrashCan />} type='link' danger>
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h3>Danh sách chuyến bay</h3>
      <Table
        columns={columns}
        dataSource={flights}
        rowKey='id'
        loading={loading}
      />
    </div>
  );
};

export default ListFlights;

