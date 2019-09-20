import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Icon, Avatar } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { FuseAnimateGroup, FuseAnimate } from '@fuse';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import { imageNameToPathConverter, avatarNameToPathConverter } from 'app/utils';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';
import * as Actions from 'app/store/actions';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main)
  },
  board: {
    cursor: 'pointer',
    boxShadow: theme.shadows[0],
    transitionProperty: 'box-shadow border-color',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    '&:hover': {
      boxShadow: theme.shadows[6]
    }
  },
  boardInfoWrapper: {
    background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.9))'
  },
  newBoard: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: fade(theme.palette.getContrastText(theme.palette.primary.main), 0.6),
    '&:hover': {
      borderColor: fade(theme.palette.getContrastText(theme.palette.primary.main), 0.8)
    }
  }
}));

function CarouselsListPage(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const CAROUSEL = useSelector(({ homePage }) => homePage.carousels)
  const carousels = CAROUSEL.docs;
  const isSyncing = CAROUSEL.loading;

  useEffect(() => {
    dispatch(Actions.syncHomePageCarousels());
  }, [dispatch])

  return (
    <div className={clsx(classes.root, "flex flex-grow flex-shrink-0 flex-col items-center")}>
      <div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">
        <FuseAnimate>
          <Typography className="mt-44 sm:mt-88 sm:py-24 text-32 sm:text-40 font-300" color="inherit">輪播圖片列表</Typography>
        </FuseAnimate>
        <FuseAnimate>
          <Typography className="mt-22 sm:mt-22 sm:py-12 text-20 sm:text-24 font-600 text-center" color="inherit">
            僅支援
            <br />
            <span className="text-blue">JPG</span> 和 <span className="text-blue">PNG</span> 以及 <span className="text-blue">上限 5 張</span> 的圖片種類
          </Typography>
        </FuseAnimate>

        <FuseAnimateGroup
          className="flex flex-wrap w-full justify-center py-32 px-16"
          enter={{
            animation: "transition.slideUpBigIn",
            duration: 300
          }}
        >
          {carousels.length < 5 && (
            <div className="w-320 h-320 p-16">
              <Link to="/staff/carousels-list/new" className={clsx(classes.board, classes.newBoard, "flex flex-col items-center justify-center w-full h-full rounded py-24 rounded-lg")} role="button">
                <Icon className="text-56">add_circle</Icon>
                <Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">新增輪播圖片</Typography>
              </Link>
            </div>
          )}
          {carousels.map(carousel => (
            <Link to={`/staff/carousels-list/${carousel._id}`} role="button" key={carousel._id}>
              <div className="w-320 h-320 p-16">
                <div className={clsx(classes.board, "flex flex-col items-center justify-end w-full h-full rounded pt-24 rounded-lg")} style={{ backgroundImage: `url(${imageNameToPathConverter(carousel.imageName)})` }}>
                  <div className={clsx(classes.boardInfoWrapper, "flex justify-start items-center rounded-b-lg w-full")}>
                    <Avatar src={avatarNameToPathConverter(carousel.author.photoURL)} className="mx-10 my-5" alt={carousel.author.displayName} />
                    <Typography className="text-16 font-300 pr-32" color="inherit">{carousel.author.displayName}</Typography>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <div className="flex justify-center items-center w-full min-h-10">
            {isSyncing && <LoadingSpinner width={128} height={128} />}
          </div>
        </FuseAnimateGroup>
      </div>
    </div>
  );
}

export default CarouselsListPage;
