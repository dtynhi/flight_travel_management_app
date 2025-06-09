import axios, { AxiosError } from 'axios';

import HttpStatusCode from '~/constant/http-status-code';
import config from '~/constant/config';
import { ErrorResponse } from '~/types/utils.type';
import LocalStorageService from '~/service/local-storage.service';

const http = axios.create({
  baseURL: `${config.BACK_END_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    // Check 401 and 403 status code
    if (error?.response?.status) {
      const statusCode = error.response.status;
      if (statusCode === HttpStatusCode.Unauthorized) {
        LocalStorageService.removeProfileFromLS();
        const currentUrl = new URL(window.location.href);
        LocalStorageService.setRedirectUrlToLS(currentUrl.pathname + currentUrl.search);
        window.location.reload();
      }
      if (statusCode === HttpStatusCode.Forbidden) {
        window.location.href = '/403';
      }
      if (statusCode >= HttpStatusCode.InternalServerError && import.meta.env.NODE_ENV === 'production') {
        const message = error?.response?.data?.message || 'Internal server error';
        const errorCode = error?.response?.data?.errorCode || '';
        window.location.href = `/5xx?status=${error?.response?.status}&message=${message}&errorCode=${errorCode}`;
      }
    }

    return Promise.reject(error);
  }
);

export default http;
