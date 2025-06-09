import { useContext } from 'react';

import { AppContext } from '~/context/app.context';

export default function useAppContext() {
  return useContext(AppContext);
}
