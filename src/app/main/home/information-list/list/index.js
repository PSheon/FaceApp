import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisibilitySensor from "react-visibility-sensor";
import { Icon, Typography, Avatar } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { FuseAnimateGroup, FuseAnimate } from '@fuse';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';

import { imageNameToPathConverter, avatarNameToPathConverter, informationTagConverter } from 'app/utils';
import * as Actions from 'app/store/actions';
import eventBusService from 'app/services/eventBusService';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

const useStyles = makeStyles(theme => ({
  dateLabel: {
    top: '2.5rem',
    left: '-1rem',
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
      boxShadow: theme.shadows[6],
      transform: 'translate(-3px, -3px)',

      '& $boardInfoWrapper': {
        paddingTop: '2rem',
        paddingBottom: '2.5rem',
      },
      '& $boardContent': {
        transform: 'translateY(0)',
      }
    }
  },
  boardInfoWrapper: {
    transition: 'padding .3s',
    background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.9))'
  },
  boardTag: {
    width: 'fit-content',
  },
  boardContent: {
    transition: 'transform .3s',
    transform: 'translateY(3rem)'
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

function InformationListPage(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const INFORMATION = useSelector(({ homePage }) => homePage.information)
  const isSyncing = INFORMATION.loading;
  const informationList = INFORMATION.docs;
  const [isLoadingNextPageInformation, setIsLoadingNextPageInformation] = useState(false);

  useEffect(() => {
    dispatch(Actions.syncHomePageInformation());
  }, [dispatch])

  function handleOnPageBottom() {
    if (!INFORMATION.hasNextPage) return
    setIsLoadingNextPageInformation(true);

    const params = {
      page: INFORMATION.nextPage,
      limit: 20,
      sort: 'updatedAt',
      order: -1
    }

    eventBusService.getHomePageInformation(params)
      .then(response => {
        dispatch({
          type: Actions.APPEND_NEXT_PAGE_INFORMATION_LIST,
          payload: response
        });

        setIsLoadingNextPageInformation(false)
      })
  }

  if (isSyncing || !informationList.length) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <LoadingSpinner width="128" height="128" />
      </div>
    )
  }

  return (
    <div className={clsx(classes.root, "flex flex-grow flex-shrink-1 flex-col items-start container px-16 md:px-24")}>
      <FuseAnimate animation="transition.slideRightIn" delay={300}>
        <Typography className="mt-16 sm:mt-40 flex items-center sm:mb-12" component={Link} role="button" to="/home" color="inherit">
          <Icon className="mr-4 text-20">arrow_back</Icon>
          返回 YS 首頁
        </Typography>
      </FuseAnimate>
      <FuseAnimate>
        <Typography className="sm:pt-12 text-32 sm:text-40 font-300" color="inherit"> YS 情報列表</Typography>
      </FuseAnimate>
      <FuseAnimate>
        <Typography className="sm:py-12 text-20 sm:text-24 font-600 whitespace-wrap" color="inherit">
          來看看 Youth Salon 的 <span className="text-blue">大小事</span> 和 <span className="text-blue">最新消息</span> 吧！
        </Typography>
      </FuseAnimate>

      <FuseAnimateGroup
        className="flex flex-wrap w-full justify-center py-32 px-16"
        enter={{
          animation: "transition.slideUpBigIn",
          duration: 300
        }}
      >
        {informationList.map(item => (
          <Link to={`/information-list/${item._id}`} role="button" key={item._id} className="w-full sm:w-1/2">
            <div className="h-320 p-6">
              <div className={clsx(classes.board, "flex flex-col items-center justify-end w-full h-full rounded pt-24 rounded-lg shadow-md hover:shadow-lg relative")} style={{ backgroundImage: `url(${imageNameToPathConverter(item.imageName)})` }}>
                {/* Date Label */}
                <div className={clsx(classes.dateLabel, "absolute bg-amber-600 text-white text-center px-8 rounded-full h-32")}>
                  <Typography className="uppercase font-semibold tracking-wide whitespace-no-wrap text-lg leading-relaxed">
                    {moment(item.updatedAt).format('LL')}
                  </Typography>
                </div>
                <div className={clsx(classes.boardInfoWrapper, "flex justify-start items-center rounded-b-lg w-full pb-8")}>
                  <Avatar src={avatarNameToPathConverter(item.author.photoURL)} className="mx-10 my-5" alt={item.author.displayName} />
                  <div className="flex flex-col justify-start overflow-hidden pr-12">
                    <div className="flex justify-start">
                      <div className={clsx(classes.boardTag, "inline-block bg-amber-600 px-2 rounded-full uppercase font-semibold tracking-wide whitespace-no-wrap mb-4 mr-8")}>{informationTagConverter(item.tag)}</div>
                    </div>
                    <Typography className="text-16 md:text-24 font-700 whitespace-no-wrap overflow-hidden truncate" color="inherit">{item.title}</Typography>
                    <Typography className={clsx(classes.boardContent, "text-16 font-700 whitespace-no-wrap overflow-hidden truncate")} color="inherit">{item.subTitle}</Typography>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
        <VisibilitySensor>
          {({ isVisible }) => {
            return (
              <div className="flex justify-center items-center w-full min-h-10">
                {isLoadingNextPageInformation && <LoadingSpinner width={128} height={128} />}
                {isVisible && !isLoadingNextPageInformation && handleOnPageBottom()}
              </div>
            )
          }}
        </VisibilitySensor>
      </FuseAnimateGroup>
    </div>
  );
}

export default InformationListPage;
