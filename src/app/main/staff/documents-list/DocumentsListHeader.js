import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { FuseAnimate } from '@fuse';
import { fade } from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';

import { AUTH_REST_BASE_END_POINT } from 'app/fuse-configs/envsConfig';
import DashboardBreadcrumbs from 'app/main/shared/DashboardBreadcrumbs';
import * as Actions from 'app/store/actions';

registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main)
  },
  headerIcon: {
    position: 'absolute',
    top: -15,
    left: 0,
    opacity: 0.04,
    fontSize: 256,
    width: 256,
    height: 256,
    pointerEvents: 'none'
  },
  board: {
    cursor: 'pointer',
    boxShadow: theme.shadows[0],
    transitionProperty: 'box-shadow border-color',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    background: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    '&:hover': {
      boxShadow: theme.shadows[6]
    }
  },
  newBoard: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: fade(
      theme.palette.getContrastText(theme.palette.primary.main),
      0.6
    ),
    '&:hover': {
      borderColor: fade(
        theme.palette.getContrastText(theme.palette.primary.main),
        0.8
      )
    }
  },
  closeButton: {
    position: 'absolute',
    right: 5,
    top: '5px'
  },
  submitLoading: {
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -15,
    color: theme.palette.primary
  },
  exchangeImgWrapper: {
    backgroundColor: 'transparent',
    width: '5em'
  },
  filePondWrapper: {
    opacity: '.6',
    transition: 'opacity .3s',

    '& .filepond--root': {
      borderBottom: 'none',

      '& .filepond--drop-label': {
        color: 'white',
        fontSize: '2em',
        fontWeight: '600'
      },

      '& .filepond--file-status': {
        fontSize: '2em'
      },
      '& .filepond--file-action-button': {
        fontSize: '2em'
      },

      '& .filepond--file-info-main': {
        fontSize: '2em'
      },

      '& .filepond--file-info-sub': {
        fontSize: '1.5em'
      }
    },
    '& .filepond--panel-root': {
      fontSize: '1.75em',
      backgroundColor: 'transparent'
    },
    '&:hover, &.active': {
      opacity: '1',
      cursor: 'pointer'
    }
  }
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DocumentsListHeader(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();

  const [dialogOpen, setDialogOpen] = useState(false);

  function handleClose() {
    setDialogOpen(false);
  }

  function handleOpenUploader() {
    setDialogOpen(true);
  }

  return (
    <div className="flex flex-col flex-1 p-8 sm:p-12 relative">
      <DashboardBreadcrumbs pageNames={['上傳管理', '文件列表']} />
      <div className="flex flex-1 items-end">
        <FuseAnimate delay={200}>
          <Typography className="flex flex-1 pl-72 pb-12 text-16 sm:text-24">
            <span className="flex items-center">
              上傳 <Icon>chevron_right</Icon> 文件列表
            </span>
          </Typography>
        </FuseAnimate>
        <FuseAnimate animation="transition.expandIn" delay={600}>
          <Fab
            color="secondary"
            aria-label="add"
            className="absolute bottom-0 right-0 mr-24 sm:mr-16 -mb-28 z-999"
            onClick={handleOpenUploader}
          >
            <Icon>add</Icon>
          </Fab>
        </FuseAnimate>

        <Dialog
          classes={{ paper: 'rounded-12' }}
          fullWidth
          fullScreen={false}
          open={dialogOpen}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <DialogTitle
            id="alert-dialog-title"
            disableTypography
            className="text-center text-20 sm:text-24 font-semibold"
          >
            上傳我的文件
            <IconButton
              aria-label="Close"
              className={classes.closeButton}
              onClick={() => {
                setDialogOpen(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent className="-mt-10">
            <FuseAnimate>
              <Typography
                className="mt-22 sm:mt-22 sm:py-12 text-14 sm:text-20 font-600 text-center pb-10"
                color="inherit"
              >
                目前僅支援類型
                <br />
                <span className="text-blue">PDF</span> 和{' '}
                <span className="text-blue">Word</span> 的文件
              </Typography>
            </FuseAnimate>

            <div
              className={clsx(
                classes.filePondWrapper,
                'mb-12 rounded-12 border-3 border-dotted'
              )}
            >
              <FilePond
                labelIdle="點擊 或 拖曳來 <span class='filepond--label-action'>上傳文件 </span>"
                labelInvalidField="請上傳文件"
                labelFileWaitingForSize="檢查文件大小"
                labelFileSizeNotAvailable="文件檔案太大了"
                labelFileLoading="載入中"
                labelFileLoadError="出錯了"
                labelFileProcessing="上傳中"
                labelFileProcessingComplete="上傳完成"
                labelFileProcessingAborted="上傳已取消"
                labelTapToCancel="取消"
                labelTapToRetry="重新上傳"
                labelButtonRemoveItem="移除文件"
                labelButtonProcessItem="上傳"
                allowMultiple={false}
                labelFileTypeNotAllowed="不支援的文件格式"
                acceptedFileTypes={[
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                  'application/pdf'
                ]}
                dropValidation={true}
                maxFileSize="30MB"
                instantUpload={false}
                fileValidateTypeLabelExpectedTypesMap={{
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                    '.docx',
                  'application/pdf': '.pdf'
                }}
                server={{
                  url: `${AUTH_REST_BASE_END_POINT}/api/document`,
                  timeout: 7000,
                  process: (
                    fieldName,
                    file,
                    metadata,
                    load,
                    error,
                    progress,
                    abort
                  ) => {
                    const formData = new FormData();
                    formData.append('documentData', file, file.name);
                    formData.append('documentName', file.name);
                    formData.append('mimeType', file.type);
                    formData.append('documentSize', file.size);

                    const request = new XMLHttpRequest();
                    request.open(
                      'POST',
                      `${AUTH_REST_BASE_END_POINT}/api/document`
                    );
                    request.setRequestHeader(
                      'Authorization',
                      'Bearer ' +
                        window.localStorage.getItem('jwt_access_token')
                    );

                    request.upload.onprogress = e => {
                      progress(e.lengthComputable, e.loaded, e.total);
                    };

                    request.onload = function() {
                      if (request.status >= 200 && request.status < 300) {
                        // the load method accepts either a string (id) or an object
                        load(request.responseText);

                        // console.log('JSON.parse(request.responseText) ', JSON.parse(request.responseText))

                        dispatch({
                          type: Actions.ADD_DOCUMENT_TO_UPLOADED_DOCUMENTS_LIST,
                          payload: JSON.parse(request.responseText)
                        });
                        dispatch({
                          type: Actions.SHOW_MESSAGE,
                          options: { message: '文件上傳成功' }
                        });
                        setDialogOpen(false);
                      } else {
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

            <FuseAnimate>
              <Typography
                className="mt-22 sm:mt-22 sm:py-12 text-14 sm:text-20 font-600 text-center pb-10"
                color="inherit"
              >
                大小限制 <span className="text-blue">30 MB</span>
              </Typography>
            </FuseAnimate>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default DocumentsListHeader;
