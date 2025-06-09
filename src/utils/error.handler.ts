import { isAxiosError } from 'axios';
import BackEndStatusCode from '~/constant/backend-status-code';
import { ErrorResponse } from '~/types/utils.type';

class ErrorHandler {
  handleApiError = (error: unknown): ErrorResponse => {
    const defaultMessage = 'Oops! Some error occurred. Please try again later.';
    if (isAxiosError(error)) {
      if (error.code === 'ERR_NETWORK') {
        return {
          message: 'Network error. Please check your internet connection.',
          errorCode: BackEndStatusCode.UNKNOWN_ERROR,
          success: false,
          errors: {}
        };
      }
      if (error?.response?.data) {
        return { ...error.response.data, message: error.response.data.message || defaultMessage } as ErrorResponse;
      }
    }
    return { message: defaultMessage, errorCode: BackEndStatusCode.UNKNOWN_ERROR, success: false, errors: {} };
  };
}

export default new ErrorHandler();
