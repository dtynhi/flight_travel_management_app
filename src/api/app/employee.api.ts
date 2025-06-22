import { SuccessResponse } from '~/types/utils.type';
import http from '../http';
import IUser from '~/types/app/user.type';

const employeeApi = {
  getEmployees: async () => {
    return await http.get<SuccessResponse<IUser[]>>('/v1/admin/employees');
  },
  createEmployee: async (payload: {
    email: string;
    password: string;
    full_name?: string;
    role?: string;
    phone_number?: string;
    identification_number?: string;
    permission?: string[];
  }) => {
    return await http.post<SuccessResponse<IUser>>('/v1/admin/employees/create', payload);
  },
  updateEmployee: async (
    id: number,
    updateData: {
      full_name?: string;
      phone_number?: string;
      identification_number?: string;
    }
  ) => {
    return await http.patch<SuccessResponse<IUser>>(`/v1/admin/employees/${id}/update`, updateData);
  },
  deleteEmployee: async (employeeId: number) => {
    return await http.delete<SuccessResponse<null>>(`/v1/admin/employees/${employeeId}/delete`);
  }
};

export default employeeApi;
