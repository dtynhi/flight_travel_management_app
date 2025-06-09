export type TOrder = 'asc' | 'desc';

export function getBasePageQueryResponse<T>(): IPageQueryResponse<T> {
  return {
    page: 0,
    pageSize: 0,
    totalPages: 0,
    totalElements: 0,
    numberOfElements: 0,
    isFirst: false,
    isLast: false,
    params: {},
    datas: []
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultPageQueryResponse: IPageQueryResponse<any> = {
  page: 0,
  pageSize: 0,
  totalPages: 0,
  totalElements: 0,
  numberOfElements: 0,
  isFirst: false,
  isLast: false,
  params: {},
  datas: []
};

export interface IPageQueryResponse<T> {
  page: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  isFirst: boolean;
  isLast: boolean;
  params: IBaseQueryRequest;
  datas: T[];
}

export interface IBaseQueryRequest {
  page?: string;
  pageSize?: string;
  query?: string;
  sort?: string;
  order?: TOrder;
  includes?: string;
  excludes?: string;
  deleted?: string;
  fromTime?: string;
  toTime?: string;
  sellerIds?: string;
  markets?: string;
  statuses?: string;
  types?: string;
}

export interface IFinanceQueryRequest extends IBaseQueryRequest {
  types?: string;
}
