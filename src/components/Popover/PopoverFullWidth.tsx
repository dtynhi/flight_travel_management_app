import { Popover, PopoverProps } from 'antd';
import React, { useEffect } from 'react';

function PopoverFullWidth(props: PopoverProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState<string | undefined>(undefined);

  useEffect(() => {
    if (ref.current) {
      const elementWidth = ref.current.offsetWidth;
      setWidth(elementWidth + 'px');
    }
  }, []);

  return (
    <Popover overlayStyle={{ width }} {...props}>
      <div ref={ref}>{props.children}</div>
    </Popover>
  );
}

export default PopoverFullWidth;
