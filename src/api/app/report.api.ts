// ~/api/app/report.api.ts
import http from '~/api/http';

export const getMonthlyReports = async (year: number, month: number) => {
  try {
    const res = await http.get(`/v1/reports/monthly?year=${year}&month=${month}`);
    console.log('API Request URL:', `/v1/reports/monthly?year=${year}&month=${month}`);
    console.log('API Response:', res.data); 
    return res.data.data || []; // Trả về mảng rỗng nếu data không tồn tại
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getMonthlyReportDetails = async (reportId: number) => {
  try {
    const res = await http.get(`/v1/reports/monthly/${reportId}/details`);
    console.log('API Response Details:', res.data);
    return res.data.data || []; // Trả về mảng rỗng nếu data không tồn tại
  } catch (error) {
    console.error('API Error Details:', error);
    throw error;
  }
};

export const getYearlyReports = async (year: number) => {
  try {
    const res = await http.get(`/v1/reports/yearly?year=${year}`);
    console.log('API Response:', res.data); // Log để debug
    return res.data.data || []; // Trả về mảng rỗng nếu data không tồn tại
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};