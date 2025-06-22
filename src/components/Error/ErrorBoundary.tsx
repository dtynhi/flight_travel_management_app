import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import config from '~/constant/config';
import ErrorWhenCallApi from './ErrorComponent';
import routers from '~/routers/router';
import AntdErrorBoundary from 'antd/es/alert/ErrorBoundary';

interface ErrorBoundaryProps {
  children: ReactNode;
  navigate: ReturnType<typeof useNavigate>;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  clearErrorsAndNavigate = (path?: string) => {
    this.setState({ hasError: false });
    if (path !== undefined) {
      this.props.navigate(path);
    }
  };

  render() {
    if (this.state.hasError) {
      return config?.NODE_ENV === 'dev' ? (
        <div>
          <Button
            type='default'
            onClick={() => {
              this.clearErrorsAndNavigate();
            }}
            className='my-2 mx-auto'
          >
            Clear Error
          </Button>
          <AntdErrorBoundary>{this.props.children}</AntdErrorBoundary>
        </div>
      ) : (
        <div>
          <ErrorWhenCallApi />
          <div className='flex justify-center'>
            <Button
              type='default'
              onClick={() => {
                this.clearErrorsAndNavigate(routers.flightSearch.fullPath);
              }}
            >
              Back home
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
