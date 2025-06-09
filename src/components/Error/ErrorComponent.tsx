import { Result } from 'antd';
import { ResultStatusType } from 'antd/es/result';
import { isAxiosError } from 'axios';

import images from '~/assets/images';

function ErrorComponent({ error, message = '', extra = '' }: { error?: unknown; message?: string; extra?: string }) {
  if (isAxiosError(error)) {
    let responseCode = error?.response?.status || 500;
    if (![404, 403, 500].includes(responseCode)) {
      responseCode = 500;
    }
    const responseMessage = error?.response?.data?.message || 'Oops! Something went wrong';
    return <Result status={(responseCode + '') as ResultStatusType} title={message || responseMessage} extra={extra} />;
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <div>
        <img src={images.errorCommon} alt='' />
      </div>
      <article className='text-wrap'>
        <h3 className='text-2xl font-bold text-center'>{message || 'Oops! Something went wrong'}</h3>
        <p>{extra || 'You may also refresh the page or try again later.'}</p>
      </article>
    </div>
  );
}

export default ErrorComponent;
