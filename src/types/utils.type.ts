export interface ApiResponse {
  message: string;
  success: boolean;
}

export interface ErrorResponse extends ApiResponse {
  errorCode: number;
  errors: unknown;
}

export interface SuccessResponse<T> extends ApiResponse {
  data: T;
}

export interface IContextProviderProps<T> {
  children: React.ReactNode;
  defaultValue?: T;
}

export type ImageFileExtension = 'image/png' | 'image/jpeg' | 'image/jpg';
// Allow csv, excel, pdf, word
export type DocumentFileExtension =
  | 'application/vnd.ms-excel'
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  | 'application/pdf'
  | 'application/msword'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export type FileExtension = ImageFileExtension & DocumentFileExtension;

export interface IFormAlertState {
  message?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  show?: boolean;
}

export interface ISelectOption {
  label: string;
  value: string;
}
