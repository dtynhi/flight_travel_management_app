import { useMutation } from '@tanstack/react-query';
import { Alert, Button, Form, Input } from 'antd';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import authApi from '~/api/auth.api';
import customizeRequiredMark from '~/components/AntdOverride/CustomizeRequiredMark';
import useQueryParams from '~/hooks/useQueryParams';
import routers from '~/routers/router';
import { errorHandler } from '~/utils';

function ResetPassword() {
  const queryParams = useQueryParams();
  const [form] = Form.useForm();
  const [responseState, setResponseState] = useState({ message: '', success: false });

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ password }: { password: string }) => {
      return authApi.resetPassword({ password, token: queryParams.token as string });
    },
    onSuccess: (data) => {
      form.resetFields();
      setResponseState({ message: data.data.message, success: data.data.success });
    },
    onError: (error) => {
      const { message } = errorHandler.handleApiError(error);
      setResponseState({ message, success: false });
    }
  });

  const handleResetPassword = (values: { password: string }) => {
    mutate(values);
  };

  if (!queryParams?.token) {
    return (
      <Navigate
        to={{
          pathname: routers.auth.forgotPassword.fullPath,
          search: `?error=Link is expired or invalid. Please try again.`
        }}
      />
    );
  }

  return (
    <div>
      <div className='text-2xl my-4 font-semibold'>Reset your password</div>
      <div className=''>
        <Form
          validateTrigger='onSubmit'
          requiredMark={customizeRequiredMark}
          name='login'
          layout='vertical'
          autoComplete='on'
          form={form}
          onFinish={handleResetPassword}
        >
          <Form.Item
            style={{ marginBottom: '8px' }}
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
            <Input.Password maxLength={32} placeholder='******' />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: '8px' }}
            label={<span className='font-semibold'>Confirm Password</span>}
            name='confirmPassword'
            rules={[
              { required: true, message: 'Please input your confirm password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                }
              })
            ]}
          >
            <Input.Password placeholder='******' maxLength={32} />
          </Form.Item>

          <Form.Item style={{ marginBottom: '8px' }}>
            <Button loading={isLoading} disabled={isLoading} size='large' className='w-full mt-5' type='primary' htmlType='submit'>
              Send
            </Button>
          </Form.Item>
        </Form>
        {responseState.message && <Alert message={responseState.message} type={responseState.success ? 'success' : 'error'} showIcon />}
        <div className='flex  text-md mt-2'>
          <span className='me-1 text-gray-700'>Back to</span>
          <Link to={routers.auth.login.fullPath} className='text-primary font-semibold'>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
