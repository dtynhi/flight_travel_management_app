import { memo } from 'react';

import PopoverFullWidth from './PopoverFullWidth';
import PopoverControlCloseComponent, { IPopoverContentProps } from './PopoverControlClose';

export type { IPopoverContentProps };
const PopoverControlClose = memo(PopoverControlCloseComponent);
export { PopoverFullWidth, PopoverControlClose };
