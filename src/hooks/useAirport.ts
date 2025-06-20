import { useState, useEffect } from 'react';
import { App } from 'antd';

import type { IAirport } from '~/types/app/airport.type';
import airportApi from '~/api/app/airport.api';

interface IUseAirportReturn {
  airports: IAirport[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const useAirport = (): IUseAirportReturn => {
  const { message } = App.useApp();
  
  const [airports, setAirports] = useState<IAirport[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAirports = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔍 Fetching airports from API...');
      
      // Use your backend API
      const response = await airportApi.getAllAirports();
      
      console.log('Airport API Response:', response.data);
      
      // Your backend returns: { data: [...] }
      const airportData = response.data.data || [];
      setAirports(airportData);
      console.log('Airports loaded:', airportData.length);
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Không thể tải danh sách sân bay';
      setError(errorMessage);
      console.error('Airport fetch error:', err);
      
      // Fallback to mock data
      const mockAirports: IAirport[] = [
        { 
          id: 1, 
          airportName: 'Tan Son Nhat International Airport',
          name: 'Tan Son Nhat International Airport',
          status: 'active',
          createdAt: '2025-01-15T10:00:00',
          updatedAt: null
        },
        { 
          id: 2, 
          airportName: 'Noi Bai International Airport',
          name: 'Noi Bai International Airport',
          status: 'active',
          createdAt: '2025-01-15T10:05:00',
          updatedAt: null
        },
        { 
          id: 3, 
          airportName: 'Da Nang International Airport',
          name: 'Da Nang International Airport',
          status: 'active',
          createdAt: '2025-01-15T10:10:00',
          updatedAt: null
        }
      ];
      
      setAirports(mockAirports);
      message.warning('Không thể kết nối API, sử dụng dữ liệu mẫu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAirports();
  }, []);

  return { 
    airports, 
    loading, 
    error, 
    refetch: fetchAirports 
  };
};

export default useAirport;