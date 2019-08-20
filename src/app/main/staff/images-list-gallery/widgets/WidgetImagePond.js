import React from 'react';
import { useDispatch } from 'react-redux';
import { FilePond, registerPlugin } from 'react-filepond';
import clsx from 'clsx';
import { AppBar, Card, CardContent, Toolbar, Typography, } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import * as Actions from 'app/store/actions';
import { AUTH_REST_BASE_END_POINT } from 'app/fuse-configs/envsConfig';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginImageCrop,
);

const useStyles = makeStyles(theme => ({
  root: {
    transition: 'width .3s',
  },
  filePondWrapper: {
    minHeight: '15em',
    opacity: '.6',
    transition: 'opacity .3s',

    '& .filepond--root': {
      minHeight: '15em',

      '& .filepond--drop-label': {
        color: 'white',
        fontSize: '1.5em',
        fontWeight: '600',
        minHeight: '10em',
      },

      '& .filepond--file-status': {
        fontSize: '2em',
      },
      '& .filepond--file-action-button': {
        fontSize: '2em',
      },

      '& .filepond--file-info-main': {
        fontSize: '2em',
      },

      '& .filepond--file-info-sub': {
        fontSize: '1.5em',
      },
    },
    '& .filepond--panel-root': {
      fontSize: '1.75em',
      backgroundColor: 'transparent',
    },
    '&:hover, &.active': {
      opacity: '1',
      cursor: 'pointer',
    },
  }
}));

function WidgetImagePond({ newImage, setNewImage }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card className={clsx(classes.root, "h-full rounded-16")}>
      <AppBar position="static" elevation={0}>
        <Toolbar className="pl-16 pr-8">
          <Typography variant="subtitle1" color="inherit" className="flex-1">
            上傳圖片
          </Typography>
        </Toolbar>
      </AppBar>
      <CardContent className={clsx(newImage && "active", classes.filePondWrapper)}>
        <div className="rounded-12 border-3 border-dotted">
          <FilePond
            labelIdle="點擊 或 拖曳來 <span class='filepond--label-action'>上傳圖片 </span>"
            labelInvalidField="請上傳圖片"
            labelFileWaitingForSize="檢查圖片大小"
            labelFileSizeNotAvailable="圖片檔案太大了"
            labelFileLoading="載入中"
            labelFileLoadError="出錯了"
            labelFileProcessing="上傳中"
            labelFileProcessingComplete="上傳完成"
            labelFileProcessingAborted="上傳已取消"
            labelTapToCancel="取消"
            labelTapToRetry="重新上傳"
            labelButtonRemoveItem="移除圖片"
            labelButtonProcessItem="上傳"
            allowMultiple={false}
            labelFileTypeNotAllowed="不支援的圖片格式"
            acceptedFileTypes={['image/jpeg', 'image/png', 'image/svg+xml']}
            dropValidation={true}
            maxFileSize="12MB"
            imageCropAspectRatio="1:1"
            instantUpload={false}
            fileValidateTypeLabelExpectedTypesMap={{ 'image/jpeg': '.jpg', 'image/png': '.png', 'image/svg+xml': '.svg' }}
            onupdatefiles={files => {
              if (files.length)
                setNewImage(files[0]);
              else
                setNewImage(null);
            }}
            server={{
              url: `${AUTH_REST_BASE_END_POINT}/api/image`,
              timeout: 7000,
              process: (fieldName, file, metadata, load, error, progress, abort) => {
                const formData = new FormData();
                formData.append('imageData', file, file.name);
                formData.append('imageName', file.name);
                formData.append('mimeType', file.type);
                formData.append('imageSize', file.size);

                const request = new XMLHttpRequest();
                request.open('POST', `${AUTH_REST_BASE_END_POINT}/api/image`);
                request.setRequestHeader('Authorization', 'Bearer ' + window.localStorage.getItem('jwt_access_token'));

                request.upload.onprogress = (e) => {
                  progress(e.lengthComputable, e.loaded, e.total);
                };

                request.onload = function () {
                  if (request.status >= 200 && request.status < 300) {
                    // the load method accepts either a string (id) or an object
                    load(request.responseText);

                    // console.log('JSON.parse(request.responseText) ', JSON.parse(request.responseText))

                    dispatch({
                      type: Actions.ADD_IMAGE_TO_UPLOADED_IMAGES_LIST,
                      payload: (JSON.parse(request.responseText))
                    })
                  }
                  else {
                    // Can call the error method if something is wrong, should exit after
                    error('oh no');
                  }
                };

                request.send(formData);

                // Should expose an abort method so the request can be cancelled
                return {
                  abort: () => {
                    // This function is entered if the user has tapped the cancel button
                    request.abort();

                    // Let FilePond know the request has been cancelled
                    abort();
                  }
                };
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default WidgetImagePond;
