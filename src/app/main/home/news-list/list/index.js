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

import { imageNameToPathConverter, avatarNameToPathConverter } from 'app/utils';
import * as Actions from 'app/store/actions';
import eventBusService from 'app/services/eventBusService';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

const useStyles = makeStyles(theme => ({
  root: {},
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
    transition: 'padding .5s',
    background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.9))'
  },
  boardTag: {
    width: 'fit-content',
  },
  boardContent: {
    transition: 'transform .5s',
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

function NewsListPage(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const NEWS = useSelector(({ homePage }) => homePage.news)
  const news = NEWS.docs;
  const [firstNews, ...otherNews] = news;
  const [isLoadingNextPageNews, setIsLoadingNextPageNews] = useState(false);

  useEffect(() => {
    dispatch(Actions.syncHomePageNews());
  }, [dispatch])

  function handleOnPageBottom() {
    if (!NEWS.hasNextPage) return
    setIsLoadingNextPageNews(true);

    const params = {
      page: NEWS.nextPage,
      limit: 20,
      sort: 'updatedAt',
      order: -1
    }

    eventBusService.getHomePageNews(params)
      .then(response => {
        dispatch({
          type: Actions.APPEND_NEXT_PAGE_NEWS_LIST,
          payload: response
        });

        setIsLoadingNextPageNews(false)
      })
  }

  if (!news.length) {
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
        <Typography className="sm:pt-12 text-32 sm:text-40 font-300" color="inherit"> YS 新聞列表</Typography>
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
        {/* First News */}
        <Link to={`/news-list/${firstNews._id}`} role="button" key={firstNews._id} className="w-full h-320 sm:h-460 p-6">
          <div className={clsx(classes.board, "flex flex-col items-center justify-end w-full h-full rounded pt-24 rounded-lg shadow-md hover:shadow-lg")} style={{ backgroundImage: `url(${imageNameToPathConverter(firstNews.imageName)})` }}>
            <div className={clsx(classes.boardInfoWrapper, "flex justify-start items-center rounded-b-lg w-full pb-8")}>
              <Avatar src={avatarNameToPathConverter(firstNews.author.photoURL)} className="mx-10 my-5" alt={firstNews.author.displayName} />
              <div className="flex flex-col justify-start overflow-hidden">
                <div className="flex justify-start">
                  <div className={clsx(classes.boardTag, "inline-block bg-red-lighter text-red-darker text-xs px-2 rounded-full uppercase font-semibold tracking-wide whitespace-no-wrap mb-4 mr-8")}>
                    {moment(firstNews.updatedAt).format('YYYY/MM/DD')}
                  </div>
                  {firstNews.tags.slice(0, 2).map((tag, tagIndex) => (
                    <div key={tagIndex} className={clsx(classes.boardTag, "inline-block bg-red-lighter text-red-darker text-xs px-2 rounded-full uppercase font-semibold tracking-wide whitespace-no-wrap mb-4 mr-8")}>{tag}</div>
                  ))}
                </div>
                <Typography className="text-16 md:text-24 font-700 whitespace-no-wrap overflow-hidden truncate" color="inherit">{firstNews.title}</Typography>
                <Typography className={clsx(classes.boardContent, "text-16 font-700 whitespace-no-wrap overflow-hidden truncate")} color="inherit">{firstNews.subTitle}</Typography>
              </div>
            </div>
          </div>
        </Link>
        {/* Other News */}
        {otherNews.map(item => (
          <Link to={`/news-list/${item._id}`} role="button" key={item._id} className="w-full sm:w-1/2">
            <div className="h-320 p-6">
              <div className={clsx(classes.board, "flex flex-col items-center justify-end w-full h-full rounded pt-24 rounded-lg shadow-md hover:shadow-lg")} style={{ backgroundImage: `url(${imageNameToPathConverter(item.imageName)})` }}>
                <div className={clsx(classes.boardInfoWrapper, "flex justify-start items-center rounded-b-lg w-full pb-8")}>
                  <Avatar src={avatarNameToPathConverter(item.author.photoURL)} className="mx-10 my-5" alt={item.author.displayName} />
                  <div className="flex flex-col justify-start overflow-hidden">
                    <div className="flex justify-start">
                      <div className={clsx(classes.boardTag, "inline-block bg-red-lighter text-red-darker text-xs px-2 rounded-full uppercase font-semibold tracking-wide whitespace-no-wrap mb-4 mr-8")}>
                        {moment(firstNews.updatedAt).format('YYYY/MM/DD')}
                      </div>
                      {item.tags.slice(0, 5).map((tag, tagIndex) => (
                        <div key={tagIndex} className={clsx(classes.boardTag, "inline-block bg-red-lighter text-red-darker text-xs px-2 rounded-full uppercase font-semibold tracking-wide whitespace-no-wrap mb-4 mr-8")}>{tag}</div>
                      ))}
                    </div>
                    <Typography className="text-16 md:text-24 font-700 whitespace-no-wrap overflow-hidden truncate" color="inherit">{item.title}</Typography>
                    <Typography className={clsx(classes.boardContent, "text-16 font-700 whitespace-no-wrap overflow-hidden truncate")} color="inherit">{firstNews.subTitle}</Typography>
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
                {isLoadingNextPageNews && <LoadingSpinner width={128} height={128} />}
                {isVisible && !isLoadingNextPageNews && handleOnPageBottom()}
              </div>
            )
          }}
        </VisibilitySensor>
      </FuseAnimateGroup>
    </div>
  );
}

export default NewsListPage;
