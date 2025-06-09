import { ApiResponse, SuccessResponse } from '~/types/utils.type';
import http from './http';
import IUser from '~/types/app/user.type';

export interface AuthFormData {
  email: string;
  password: string;
}

const authApi = {
  login: async function (body: AuthFormData) {
    return http.post<SuccessResponse<IUser>>('/v1/auth/login', body);
  },

  register: async function (body: AuthFormData) {
    return http.post<ApiResponse>('/v1/auth/register', body);
  },

  logout: async function () {
    return http.get<ApiResponse>('/v1/auth/logout');
  },

  resendCode: async function ({ email }: { email: string }) {
    return http.get<ApiResponse>('/v1/auth/resend-verification-code', { params: { email } });
  },

  verifyEmail: async function ({ email, code }: { email: string; code: string }) {
    return http.post<SuccessResponse<IUser>>('/v1/auth/verify-email', { email, code });
  },

  forgotPassword: async function ({ email }: { email: string }) {
    return http.get<ApiResponse>('/v1/auth/forgot-password', { params: { email } });
  },

  resetPassword: async function (body: { password: string; token: string }) {
    return http.post<ApiResponse>('/v1/auth/reset-password', body);
  }
};

export default authApi;
