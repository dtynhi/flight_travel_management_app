/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios';
import { omitBy } from 'lodash';
import { createSearchParams } from 'react-router-dom';

import IUser from '~/types/app/user.type';
import { SelectProps } from 'antd';

class CommonUtils {
  isAxiosError<T>(error: unknown): error is AxiosError<T> {
    return axios.isAxiosError(error);
  }

  createSearchQuery(params: Record<string, any>): string {
    return createSearchParams(omitBy(params, (value) => !value)).toString();
  }

  getFullName(user: IUser | undefined | null, defaultValue?: keyof IUser): string {
    if (!user) {
      return '';
    }
    let fullName = '';
    fullName = `${user.firstName || ''} ${user.lastName || ''}`;
    if (!fullName.trim()) {
      fullName = defaultValue ? (user[defaultValue] as string) : '';
    }
    // uppercase the first letter
    const firstLetter = fullName.charAt(0).toUpperCase();
    return firstLetter + fullName.slice(1);
  }

  getColorByName(name: string) {
    const firstCharacter = name?.trim()?.charAt(0)?.toUpperCase() || '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const arr = characters.match(/.{1,2}/g);
    const colors = [
      '#ef4444',
      '#fb923c',
      '#db2777',
      '#84cc16',
      '#16a34a',
      '#10b981',
      '#14b8a6',
      '#06b6d4',
      '#0ea5e9',
      '#2563eb',
      '#4f46e5',
      '#8b5cf6',
      '#a855f7',
      '#d946ef'
    ];
    if (Array.isArray(arr)) {
      for (let i = 0; i < arr?.length; i++) {
        if (arr[i].includes(firstCharacter)) {
          return {
            character: firstCharacter,
            color: colors[i]
          };
        }
      }
    }
    return {
      character: firstCharacter,
      color: colors[0]
    };
  }

  selectSearchByLabel: SelectProps['filterOption'] = (input, option) => {
    return ((option?.label as string) || '').toLowerCase().includes(input.toLowerCase());
  };

  async downloadFileByUrl(url: string, fileName?: string) {
    if (!url) {
      return;
    }
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || url.split('/').pop() || 'download';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

export default new CommonUtils();
