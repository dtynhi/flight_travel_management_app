import { createContext } from 'react';
import { message, notification } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import { NotificationInstance } from 'antd/es/notification/interface';

interface IMessageContext {
  messageApi: MessageInstance;
  notificationApi: NotificationInstance;
}

const initialContext = {
  messageApi: {} as MessageInstance,
  notificationApi: {} as NotificationInstance
};

export const MessageContext = createContext<IMessageContext>(initialContext);

export const MessageContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [messageApi, messageContextHolder] = message.useMessage();
  const [notificationApi, notificationContextHolder] = notification.useNotification();
  return (
    <MessageContext.Provider
      value={{
        messageApi,
        notificationApi
      }}
    >
      {messageContextHolder}
      {notificationContextHolder}
      {children}
    </MessageContext.Provider>
  );
};
