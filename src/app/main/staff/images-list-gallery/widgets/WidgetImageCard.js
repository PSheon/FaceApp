import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import copy from 'copy-to-clipboard';

import { imageNameToPathConverter } from 'app/utils';
import * as Actions from 'app/store/actions';

const useStyles = makeStyles(theme => ({
  root: {
    cursor: 'pointer'
  },
  headerWrapper: {
    backgroundColor: '#394051',
  },
  media: {
    filter: 'blur(1px)',
    transition: 'filter .5s',
    '&:hover': {
      filter: 'blur(0px)',
    }
  },
  avatar: {
    backgroundColor: '#303030',
  },
}));

function WidgetImageCard(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { image } = props;

  function handleCopyImageLink() {
    copy(imageNameToPathConverter(image.imageName))
    dispatch(Actions.showMessage({ message: '已複製圖片網址.' }));
  }

  return (
    <Card className={clsx(classes.root, "w-full rounded-12")} onClick={handleCopyImageLink}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar} src={image.author.photoURL} />
        }
        action={
          <Tooltip title="複製圖片網址" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} placement="top">
            <IconButton aria-label="Copy button">
              <FileCopyIcon />
            </IconButton>
          </Tooltip>
        }
        title={image.author.displayName}
        subheader={moment(image.updatedAt).format('YYYY-MM-DD hh:mm')}
        className={clsx(classes.headerWrapper)}
      />
      <img className={classes.media} src={imageNameToPathConverter(image.imageName)} alt={image.description} />
    </Card>
  );
}

export default React.memo(WidgetImageCard);
