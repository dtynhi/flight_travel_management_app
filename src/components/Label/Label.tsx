/* eslint-disable react-refresh/only-export-components */
import { Divider } from 'antd';
import clsx from 'clsx';
import React from 'react';
import { CopyButton } from '../Button';
export interface ILabelProps {
  label?: React.ReactNode;
  required?: boolean;
  content?: string | number;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
  labelClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
  contentClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
  divider?: boolean;
  dividerPosition?: 'start' | 'end';
  dividerClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
  allowCopy?: boolean;
  hiddenOnEmpty?: boolean;
}
const defaultOptions: ILabelProps = {
  className: 'flex flex-wrap items-center gap-1',
  labelClassName: 'font-semibold text-gray-700',
  contentClassName: '',
  dividerPosition: 'end',
  dividerClassName: '!border-gray-700',
  required: false,
  hiddenOnEmpty: false
};
function Label(props: ILabelProps) {
  props = { ...defaultOptions, ...props };
  if (props.hiddenOnEmpty && !props.content) {
    return null;
  }
  const dividerNode = <Divider type='vertical' className={clsx(defaultOptions.dividerClassName, props.dividerClassName)} />;
  return (
    <div className={clsx(defaultOptions.className, props.className)}>
      {props.divider && defaultOptions.dividerPosition === 'start' && dividerNode}
      {props.required && <span className='text-red-500 translate-y-[3px]'>*</span>}
      {props.label && <div className={clsx(defaultOptions.labelClassName, props.labelClassName)}>{props.label}</div>}
      <div className={clsx(defaultOptions.contentClassName, props.contentClassName)}>{props.content}</div>
      {props.divider && defaultOptions.dividerPosition === 'end' && dividerNode}
      {props.allowCopy && <CopyButton content={props.content} />}
    </div>
  );
}

export default Label;
