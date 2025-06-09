import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input } from 'antd';

import userApi from '~/api/app/user.api';
import { requiredMarkRender } from '~/components/AntdOverride/CustomizeRequiredMark';
import useMessageContext from '~/hooks/useMessageContext';
import { errorHandler } from '~/utils';

export interface IUpdatePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

function SettingSecurity() {
  const [form] = Form.useForm();
  const { messageApi } = useMessageContext();

  const { isLoading, mutate } = useMutation({
    mutationFn: (formData: IUpdatePasswordForm) => {
      return userApi.updatePassword(formData);
    },
    onSuccess: () => {
      messageApi.success('Password updated successfully');
      form.resetFields();
    },
    onError: (error) => {
      const { message } = errorHandler.handleApiError(error);
      messageApi.error(message);
    }
  });

  const handleSubmit = (values: IUpdatePasswordForm) => {
    mutate(values);
  };

  return (
    <div className='w-100 max-w-[600px] flex flex-col justify-center m-auto'>
      <h1 className='font-semibold text-xl mb-5 text-center'>Change Your Password</h1>
      <Form
        onFinish={handleSubmit}
        requiredMark={requiredMarkRender('font-semibold me-1')}
        form={form}
        name='change_pwd'
        layout='vertical'
        validateTrigger={['onBlur', 'onSubmit']}
      >
        <Form.Item
          label={<span className='font-semibold'>Current Password</span>}
          name='current_password'
          rules={[
            { required: true, message: 'Please input your current password!' },
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
          label={<span className='font-semibold'>New Password</span>}
          name='new_password'
          rules={[
            { required: true, message: 'Please input your new password!' },
            {
              min: 6,
              max: 32,
              message: 'Password must contain 8 to 32 characters.'
            }
          ]}
        >
          <Input.Password placeholder='********' />
        </Form.Item>

        <Form.Item
          label={<span className='font-semibold'>Confirm Password</span>}
          name='confirm_password'
          rules={[
            { required: true, message: 'Please input your confirm password!' },
            ({ getFieldValue }: unknown) => ({
              validator(_: unknown, value: string) {
                if (!value || getFieldValue('new_password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The confirm password does not match!'));
              }
            })
          ]}
        >
          <Input.Password placeholder='********' />
        </Form.Item>
        <Form.Item>
          <Button loading={isLoading} htmlType='submit' disabled={isLoading} type='primary'>
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SettingSecurity;
