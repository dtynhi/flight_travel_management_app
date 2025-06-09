import { createRef, forwardRef, memo, useCallback, useImperativeHandle, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Image as AntImage, Upload } from 'antd';
import { UploadRef } from 'antd/es/upload/Upload';
import { RcFile, UploadFile, UploadListProps, UploadProps } from 'antd/es/upload/interface';

import fileApi from '~/api/file/file.api';
import { AcceptableFileType } from '~/constant/app.constant';
import useMessageContext from '~/hooks/useMessageContext';
import { fileUtil } from '~/utils';

export type ICustomizeUploadFile = UploadFile & {
  position?: number;
};

export type ICustomizeUpload = {
  acceptFileType?: AcceptableFileType[];
  maxFileSize?: number;
  initialFileList?: ICustomizeUploadFile[];
  realTimeUploadProgress?: boolean;
  autoUpload: boolean;
  onChangeFiles?: (props: { fileList: ICustomizeUploadFile[]; file: ICustomizeUploadFile; newFileList: ICustomizeUploadFile[] }) => void;
  onRemoveFile?: (file: ICustomizeUploadFile) => void;
};
type ICustomizeUploadProps = UploadProps & Partial<UploadListProps> & ICustomizeUpload;
export interface ICustomizeUploadHandler {
  getFiles: () => ICustomizeUploadFile[];
  setFiles: (files: ICustomizeUploadFile[]) => void;
}

const defaultUploadProps: ICustomizeUploadProps = {
  listType: 'picture-card',
  multiple: false,
  showUploadList: true,
  showDownloadIcon: true,
  showRemoveIcon: true,
  showPreviewIcon: true,
  maxCount: 1,
  action: '',
  acceptFileType: ['images'],
  maxFileSize: 1024 * 1024, // 1MB
  initialFileList: [],
  realTimeUploadProgress: false,
  autoUpload: true
};

const CustomizeUpload = forwardRef<ICustomizeUploadHandler, ICustomizeUploadProps>((props, ref) => {
  const { messageApi } = useMessageContext();
  const [fileList, setFileList] = useState<ICustomizeUploadFile[]>(props.initialFileList || []);
  const [previewState, setPreviewState] = useState<{ open: boolean; src: string }>({ open: false, src: '' });
  const uploadRef = createRef<UploadRef>();

  props = {
    ...defaultUploadProps,
    ...props,
    accept: fileUtil.getAcceptableFileType(props?.acceptFileType || defaultUploadProps.acceptFileType || [])
  };

  const uploadImage = useMutation({
    mutationFn: (file: RcFile) => {
      let uploadProgress = undefined;
      if (props.realTimeUploadProgress) {
        uploadProgress = (percentage: number) => {
          const fileIndex = fileList.findIndex((item) => item.uid === file.uid);
          if (fileIndex >= 0) {
            setFileList((prev) => {
              const newFileList = [...prev];
              newFileList[fileIndex].percent = percentage;
              return newFileList;
            });
          }
        };
      }
      return fileApi.uploadFile({
        file: file as Blob,
        files: [],
        uploadProgress: uploadProgress
      });
    },
    onSuccess: (response, file) => {
      const fileResponse = response.data.data as ICustomizeUploadFile;
      fileResponse.uid = file.uid;
      fileResponse.url = fileResponse.url || '';
      const fileIndex = fileList.findIndex((item) => item.uid === file.uid);
      if (fileIndex >= 0) {
        setFileList((prev) => {
          const newFileList = [...prev];
          newFileList[fileIndex] = fileResponse;
          return newFileList;
        });
      }
    },
    onError: (_, file) => {
      const fileResponse = fileUtil.convertRcFileToUploadFile(file);
      fileResponse.status = 'error';
      fileResponse.response = 'Upload failed';
      const fileIndex = fileList.findIndex((item) => item.uid === file.uid);
      if (fileIndex >= 0) {
        setFileList((prev) => {
          const newFileList = [...prev];
          newFileList[fileIndex] = fileResponse;
          return newFileList;
        });
      }
    }
  });

  // Handle the ref
  useImperativeHandle(
    ref,
    () => ({
      getFiles: () => {
        if (uploadRef.current) {
          return uploadRef.current.fileList;
        }
        return [];
      },
      setFiles: (files: ICustomizeUploadFile[]) => {
        setFileList(files);
      }
    }),
    [uploadRef]
  );

  const handleFileListChange = useCallback<Required<ICustomizeUploadProps>['onChange']>(
    async ({ file, fileList: newFileList }: { file: ICustomizeUploadFile; fileList: ICustomizeUploadFile[] }) => {
      if (file.status && file.status === 'uploading') {
        if (props.autoUpload) {
          setFileList([...newFileList]);
        } else {
          const fileIndex = newFileList.findIndex((item) => item === file);
          if (fileIndex !== -1) {
            const reader = new FileReader();
            reader.onload = (e) => {
              file.url = e?.target?.result as string;
              file.status = 'done';
              newFileList[fileIndex] = file;
              setFileList(newFileList);
              if (props.onChangeFiles) {
                props.onChangeFiles({ fileList, file, newFileList });
              }
            };
            // Read the file
            reader.readAsDataURL(file.originFileObj as Blob);
          }
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.autoUpload, props.onChangeFiles]
  );

  const beforeUpload = useCallback(
    async (file: RcFile) => {
      if (props.maxCount && fileList.length > props.maxCount) {
        messageApi.error(`You can only upload ${props.maxCount} file(s)`);
        return Upload.LIST_IGNORE;
      }
      if (props.maxFileSize && file.size) {
        if (file.size > props.maxFileSize) {
          messageApi.error(`File size must be less than ${props.maxFileSize / (1024 * 1024)}MB`);
          return Upload.LIST_IGNORE;
        }
      }
      return true;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.maxCount, props.fileList, props.maxFileSize]
  );

  const onRemove = useCallback(
    (file: ICustomizeUploadFile) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      if (props.onRemoveFile) {
        props.onRemoveFile(file);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fileList, props.onRemoveFile]
  );

  const handlePreview = useCallback(async (file: ICustomizeUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await fileUtil.getBase64(file);
    }
    setPreviewState({
      open: true,
      src: file.url || (file.preview as string)
    });
  }, []);

  const customRequest = useCallback<Required<ICustomizeUploadProps>['customRequest']>(
    async ({ file }) => {
      if (!props.autoUpload) {
        return;
      }
      if (typeof file !== 'string') {
        const newFile = file as RcFile;
        uploadImage.mutate(newFile);
      }
    },
    [uploadImage, props.autoUpload]
  );

  return (
    <>
      <Upload
        fileList={fileList}
        onRemove={onRemove}
        onPreview={handlePreview}
        onChange={handleFileListChange}
        ref={uploadRef}
        customRequest={customRequest}
        beforeUpload={beforeUpload}
        disabled={uploadImage.isLoading}
        {...props}
      >
        {props.maxCount && fileList.length < props.maxCount && <div>{props?.children || '+ Upload'}</div>}
      </Upload>
      {previewState.src && (
        <AntImage
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewState.open,
            onVisibleChange: (visible) => setPreviewState((prev) => ({ ...prev, open: visible })),
            afterOpenChange: (visible) => !visible && setPreviewState((prev) => ({ ...prev, src: '' }))
          }}
          src={previewState.src}
        />
      )}
    </>
  );
});

const MemoCustomizeUpload = memo(CustomizeUpload);

export default MemoCustomizeUpload;
