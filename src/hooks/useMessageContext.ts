import { useContext } from 'react';
import { MessageContext } from '~/context/message.context';

export default function useMessageContext() {
  return useContext(MessageContext);
}
