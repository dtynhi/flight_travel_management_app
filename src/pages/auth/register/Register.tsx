import React from 'react';
import { Alert, Button, Divider, Form, Input } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

import customizeRequiredMark from '~/components/AntdOverride/CustomizeRequiredMark';
import authApi, { AuthFormData } from '~/api/auth.api';
import { IFormAlertState } from '~/types/utils.type';
import routers from '~/routers/router';
import useQueryParams from '~/hooks/useQueryParams';
import { errorHandler } from '~/utils';

function Register() {
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
      return authApi.register(data);
    },
    onSuccess: () => {
      navigate(routers.home.fullPath);
    },
    onError: (error) => {
      const { message } = errorHandler.handleApiError(error);
      setResponseState({ message, type: 'error', show: true });
    }
  });

  const handleRegister = (values: AuthFormData & { confirmPassword: string }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...apiData } = values;
    mutate(apiData);
  };

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>
          Welcome to <span className='text-primary'>Flight Travel</span>
        </h1>
      </div>
      <div className='my-2'>Discover Destinations with Comfort and Confidence</div>
      <Divider>
        <span className='text-gray-400 font-thin'>or</span>
      </Divider>
      <div className='mt-6'>
        <Form
          validateTrigger='onSubmit'
          requiredMark={customizeRequiredMark}
          name='login'
          layout='vertical'
          autoComplete='on'
          form={form}
          onFinish={handleRegister}
        >
          <Form.Item
            label={<span className='font-semibold'>Email</span>}
            name='email'
            rules={[
              { required: true, message: 'Please input your email!' },
              { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email is invalid!' }
            ]}
          >
            <Input placeholder='Enter your email' />
          </Form.Item>

          <Form.Item
            label={<span className='font-semibold'>Password</span>}
            name='password'
            rules={[
              { required: true, message: 'Please input your password!' },
              {
                min: 6,
                max: 32,
                message: 'Password must contain 6 to 32 characters.'
              }
            ]}
          >
            <Input.Password placeholder='********' />
          </Form.Item>

          <Form.Item
            label={<span className='font-semibold'>Confirm Password</span>}
            name='confirmPassword'
            rules={[
              { required: true, message: 'Please input your confirm password!' },
              ({ getFieldValue }: unknown) => ({
                validator(_: unknown, value: string) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                }
              })
            ]}
          >
            <Input.Password placeholder='********' />
          </Form.Item>

          <Form.Item>
            <Button loading={isLoading} size='large' className='w-full mt-5' type='primary' htmlType='submit'>
              Register
            </Button>
          </Form.Item>
        </Form>
        {responseState.show && <Alert message={responseState.message} type={responseState.type} showIcon />}
        <div className='flex text-md mt-2'>
          <span className='me-1 text-gray-700'>Already have an account?</span>
          <Link to={routers.auth.login.fullPath} className='text-primary font-semibold'>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
