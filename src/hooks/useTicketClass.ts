import { useState, useEffect } from 'react';
import { App } from 'antd';
import ticketClassApi from '~/api/app/ticket_class.api';

interface ITicketClass {
  id: number;
  className: string;
  priceMultiplier: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface IUseTicketClassReturn {
  ticketClasses: ITicketClass[];
  loading: boolean;
  error: string | null;
  reload: () => void;
}

const useTicketClass = (): IUseTicketClassReturn => {
  const { message } = App.useApp();
  
  const [ticketClasses, setTicketClasses] = useState<ITicketClass[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTicketClasses = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await ticketClassApi.getAllTicketClasses();
      const data = response.data.data;
      
      if (data && data.ticketClasses) {
        setTicketClasses(data.ticketClasses.filter(tc => tc.status === 'ACTIVE'));
      } else {
        setTicketClasses([]);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Lỗi khi tải danh sách hạng ghế';
      setError(errorMessage);
      console.error('Error loading ticket classes:', err);
      message.error(errorMessage);
      setTicketClasses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTicketClasses();
  }, []);

  return {
    ticketClasses,
    loading,
    error,
    reload: loadTicketClasses
  };
};

export default useTicketClass;