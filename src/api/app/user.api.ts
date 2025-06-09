import { SuccessResponse } from '~/types/utils.type';
import http from '../http';
import IUser from '~/types/app/user.type';
import { IUpdatePasswordForm } from '~/pages/settings/components/SettingSecurity';

const userApi = {
  getUserProfile: async () => {
    return await http.get<SuccessResponse<IUser>>('/v1/user/profile');
  },
  updateProfile: async (formData: IUser) => {
    return await http.put<SuccessResponse<IUser>>('/v1/user/profile', formData, {
      headers: {
        'Content-Type': undefined
      }
    });
  },
  updatePassword: async (payload: IUpdatePasswordForm) => {
    return await http.put<SuccessResponse<object>>('/v1/user/password', payload);
  }
};

export default userApi;
