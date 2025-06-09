import React from 'react';
import { Alert, Button, Form, Input } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

import customizeRequiredMark from '~/components/AntdOverride/CustomizeRequiredMark';
import authApi, { AuthFormData } from '~/api/auth.api';
import { IFormAlertState } from '~/types/utils.type';
import useAppContext from '~/hooks/useAppContext';
import useQueryParams from '~/hooks/useQueryParams';
import { errorHandler } from '~/utils';
import LocalStorageService from '~/service/local-storage.service';
import routers from '~/routers/router';

function Login() {
  const { setIsAuthenticated, setProfile } = useAppContext();
  const navigate = useNavigate();
  const { error } = useQueryParams();
  const [form] = Form.useForm();
  const [responseState, setResponseState] = React.useState<IFormAlertState>({
    message: error || '',
    type: error ? 'error' : 'success',
    show: !!error
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: AuthFormData) => {
      return authApi.login(data);
    },
    onSuccess: (data) => {
      if (data?.data?.success) {
        setIsAuthenticated(true);
        setProfile(data.data.data);
        LocalStorageService.setProfileToLS(data.data.data);
        navigate(LocalStorageService.getRedirectUrlFromLS());
      }
    },
    onError: (error) => {
      const { message } = errorHandler.handleApiError(error);
      setResponseState({ message, type: 'error', show: true });
    }
  });

  const handleLogin = (values: AuthFormData) => {
    mutate(values);
  };

  return (
    <div className='flex flex-col justify-center'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>
          Welcome to <span className='text-primary'>Flight Travel</span>
        </h1>
      </div>
      <div className='my-2'>Seamless Flight Booking and Personalized Travel Experience</div>
      <div className='mt-6'>
        <Form
          validateTrigger='onSubmit'
          requiredMark={customizeRequiredMark}
          name='login'
          layout='vertical'
          autoComplete='on'
          form={form}
          onFinish={handleLogin}
        >
          <Form.Item
            label={<span className='font-semibold'>Email</span>}
            name='email'
            rules={[
              { required: true, message: 'Please input your email!' },
              { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email is invalid!' }
            ]}
          >
            <Input size='large' placeholder='Enter your email' />
          </Form.Item>

          <Form.Item
            label={<span className='font-semibold'>Password</span>}
            name='password'
            rules={[
              { required: true, message: 'Please input your password!' },
              {
                min: 6,
                max: 32,
                message: 'Password must contain 8 to 32 characters.'
              }
            ]}
          >
            <Input.Password size='large' placeholder='********' />
          </Form.Item>
          <div className='flex justify-end'>
            <Link to={routers.auth.forgotPassword.fullPath} className='!text-primary font-semibold my-2'>
              Forgot password?
            </Link>
          </div>
          <Form.Item>
            <Button loading={isLoading} size='large' className='w-full mt-3' type='primary' htmlType='submit'>
              Login
            </Button>
          </Form.Item>
        </Form>
        {responseState.show && <Alert message={responseState.message} type={responseState.type} showIcon />}
        <div className='flex mt-1'>
          <span className='me-2 '>Don't have an account?</span>
          <Link to={routers.auth.register.fullPath} className='text-primary font-semibold'>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
