import { useQueryClient, QueryKey, InvalidateQueryFilters, InvalidateOptions } from '@tanstack/react-query';

interface CacheServiceOptions {
  queryKey?: QueryKey;
  filters?: InvalidateQueryFilters;
  options?: InvalidateOptions;
}

function useCacheService() {
  const queryClient = useQueryClient();

  const invalidateQuery = ({ queryKey, filters, options }: CacheServiceOptions) => {
    queryClient.invalidateQueries(queryKey, filters, options);
  };
  const clearAll = () => {
    queryClient.clear();
  };

  return {
    invalidateQuery,
    clearAll
  };
}

export default useCacheService;
