import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { FaCopy, FaRegCopy } from 'react-icons/fa';

interface ICopiedButtonProps {
  content?: string | number;
  className?: string;
}

function CopyButton({ content, className }: ICopiedButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(() => {
    (async () => {
      try {
        await navigator.clipboard.writeText((content as string) || '');
        setCopied((state) => !state);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    })();
  }, [content]);
  if (!content) {
    return null;
  }
  const classes = clsx('text-lg', 'cursor-pointer', 'text-primary', className);
  return copied ? <FaCopy className={classes} onClick={copyToClipboard} /> : <FaRegCopy className={classes} onClick={copyToClipboard} />;
}

export default CopyButton;
