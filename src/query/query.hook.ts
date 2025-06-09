import { omitBy } from 'lodash';

import { numberUtil } from '~/utils';
import useQueryParams from '~/hooks/useQueryParams';
import { IBaseQueryRequest, IFinanceQueryRequest } from './query.type';
import { timeUtil } from '~/utils';
import { MarketplaceEnum } from '~/constant/app.constant';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TGetBaseQueryConfig = (params: any, requiredMarket?: boolean) => IBaseQueryRequest;
const getBaseQueryConfig: TGetBaseQueryConfig = (params, requiredMarket = true): IBaseQueryRequest => {
  if (typeof params !== 'object') {
    params = {};
  }
  return {
    page: numberUtil.isPositiveIntegerStrNumber(params?.page) ? params?.page : '',
    pageSize: numberUtil.isPositiveIntegerStrNumber(params?.pageSize) ? params?.pageSize : '',
    query: params?.query || '',
    sort: params?.sorts || '',
    order: ['asc', 'desc'].includes(params?.orders) ? params?.orders : '',
    includes: params?.includes || '',
    excludes: params?.excludes || '',
    deleted: ['1', '0', 'true', 'false'].includes(params?.deleted) ? params?.deleted : '',
    fromTime: timeUtil.isValidDateQuery(params?.fromTime) ? params?.fromTime : '',
    toTime: timeUtil.isValidDateQuery(params?.toTime) ? params?.toTime : '',
    markets: params?.markets || (requiredMarket ? MarketplaceEnum.US : ''), // Default us market,
    sellerIds: params?.sellerIds || '',
    statuses: params?.statuses || '',
    types: params?.types || ''
  };
};

export const useQueryConfig = (): IBaseQueryRequest => {
  const queryParams = useQueryParams();
  return omitBy(
    {
      ...getBaseQueryConfig(queryParams)
    },
    (value) => !value
  );
};

export const useOrderQueryConfig = (): IBaseQueryRequest => {
  const queryParams = useQueryParams();
  return omitBy(
    {
      ...getBaseQueryConfig(queryParams),
      markets: queryParams?.markets || ''
    },
    (value) => !value
  );
};

export const useFinanceQueryConfig = (): IFinanceQueryRequest => {
  const queryParams = useQueryParams();
  return omitBy(
    {
      ...getBaseQueryConfig(queryParams, false),
      types: queryParams?.types || ''
    },
    (value) => !value
  );
};
