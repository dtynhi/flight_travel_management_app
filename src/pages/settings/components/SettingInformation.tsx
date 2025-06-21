import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';

import userApi from '~/api/app/user.api';
import { requiredMarkRender } from '~/components/AntdOverride/CustomizeRequiredMark';
import useAppContext from '~/hooks/useAppContext';
import useMessageContext from '~/hooks/useMessageContext';
import localStorageService from '~/service/local-storage.service';
import IUser from '~/types/app/user.type';
import { errorHandler } from '~/utils';
import UserAvatar from '~/components/UserAvatar/UserAvatar';

function SettingInformation() {
  const { profile, setProfile } = useAppContext();
  const { messageApi } = useMessageContext();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(profile);
  }, [profile, form]);

  const { isLoading, mutate } = useMutation({
    mutationFn: (formData: IUser) => {
      return userApi.updateProfile(formData);
    },
    onSuccess: (data) => {
      setProfile(data.data.data);
      messageApi.success('Profile updated successfully');
      localStorageService.setProfileToLS(data.data.data);
    },
    onError: (error) => {
      const { message } = errorHandler.handleApiError(error);
      messageApi.error(message);
    }
  });

  const handleSubmit = (values: IUser) => {
    mutate(values);
  };
  return (
    <div className='w-100 max-w-[600px] flex flex-col justify-center m-auto'>
      <div className='flex justify-center flex-col items-center mb-4'>
        <UserAvatar shape='circle' size={50} name={profile?.full_name || profile?.email} className='mb-2' />
      </div>
      <Form
        name='setting-information'
        onFinish={handleSubmit}
        form={form}
        layout='vertical'
        requiredMark={requiredMarkRender('font-semibold me-1')}
        validateTrigger={['onBlur', 'onSubmit']}
      >
        <Form.Item
          label='Họ và tên'
          name={'full_name'}
          rules={[
            {
              required: true,
              message: 'Hãy nhập họ và tên'
            }
          ]}
        >
          <Input placeholder='John Adam' showCount maxLength={150} allowClear />
        </Form.Item>

        <Form.Item name={'email'} label='Email' required className='flex-1'>
          <Input disabled placeholder='john@gmail.com' showCount maxLength={150} allowClear />
        </Form.Item>

        <Form.Item
          label='Số điện thoại'
          name={'phone_number'}
          rules={[
            {
              pattern: /^[0-9+\-\s]*$/,
              message: 'Hãy nhập số điện thoại hợp lệ'
            }
          ]}
        >
          <Input placeholder='+84 123456789' showCount maxLength={20} allowClear />
        </Form.Item>

        <Form.Item
          label='CCCD'
          name={'identification_number'}
          rules={[
            {
              message: 'Hãy nhập số CCCD hợp lệ'
            }
          ]}
        >
          <Input placeholder='ID number' showCount maxLength={50} allowClear />
        </Form.Item>

        <Form.Item>
          <Button loading={isLoading} disabled={isLoading} htmlType='submit' type='primary'>
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SettingInformation;
