import { ConfigProvider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StyleProvider } from '@ant-design/cssinjs';

import { AppContextProvider } from '~/context/app.context';
import useRouteElement from '~/routers/useRouteElement';
import theme from './constant/theme';
import ErrorBoundary from '~/components/Error/ErrorBoundary';
import { commonUtil } from './utils';
import { MessageContextProvider } from './context/message.context';
import ApplicationEventListener from './components/Event/ApplicationEventListener';
import { MantineProvider } from '@mantine/core';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 24, // 1 day
      retry: (failureCount, error) => {
        if (commonUtil.isAxiosError(error) && error.response) {
          return !(failureCount > 2 || [401, 403, 404].includes(error.response.status) || error.response.status >= 500);
        }
        return true;
      }
    }
  }
});
function App() {
  const routeElements = useRouteElement();
  const navigate = useNavigate();
  return (
    <ErrorBoundary navigate={navigate}>
      <QueryClientProvider client={queryClient}>
        <MessageContextProvider>
          <AppContextProvider>
            <ApplicationEventListener>
              <StyleProvider hashPriority='high'>
                <ConfigProvider
                  theme={{
                    ...theme
                  }}
                >
                  <MantineProvider>{routeElements}
                  </MantineProvider>
                </ConfigProvider>
              </StyleProvider>
            </ApplicationEventListener>
          </AppContextProvider>
        </MessageContextProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
