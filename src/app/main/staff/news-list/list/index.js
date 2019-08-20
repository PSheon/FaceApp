import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VisibilitySensor from "react-visibility-sensor";
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Icon, Avatar } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { FuseAnimateGroup, FuseAnimate } from '@fuse';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';

import { imageNameToPathConverter, avatarNameToPathConverter } from 'app/utils';
import * as Actions from 'app/store/actions';
import eventBusService from 'app/services/eventBusService';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

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
    background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.9))',
  },
  boardTag: {
    width: 'fit-content',
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
  const NEWS = useSelector(({ homePage }) => homePage.news);
  const news = NEWS.docs;
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

  return (
    <div className={clsx(classes.root, "flex flex-grow flex-shrink-0 flex-col items-center")}>
      <div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">
        <FuseAnimate>
          <Typography className="mt-44 sm:mt-88 sm:py-24 text-32 sm:text-40 font-300" color="inherit"> YS 新聞列表</Typography>
        </FuseAnimate>
        <FuseAnimate>
          <Typography className="mt-22 sm:mt-22 sm:py-12 text-20 sm:text-24 font-600 text-center" color="inherit">
            僅支援
            <br />
            <span className="text-blue">JPG</span> 和 <span className="text-blue">PNG</span> 以及 <span className="text-blue">上限 5 張</span> 的圖片種類
          </Typography>
        </FuseAnimate>

        <div>
          <FuseAnimateGroup
            className="flex flex-wrap w-full justify-center py-32 px-16"
            enter={{
              animation: "transition.slideUpBigIn",
              duration: 300
            }}
          >
            <div className="w-320 h-320 p-16">
              <Link to="/staff/news-list/new" className={clsx(classes.board, classes.newBoard, "flex flex-col items-center justify-center w-full h-full rounded py-24 rounded-lg")} role="button">
                <Icon className="text-56">add_circle</Icon>
                <Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">新增 YS 新聞</Typography>
              </Link>
            </div>
            {news.map(item => (
              <Link to={`/staff/news-list/${item._id}`} role="button" key={item._id}>
                <div className="w-320 h-320 p-16">
                  <div className={clsx(classes.board, "flex flex-col items-center justify-end w-full h-full rounded pt-24 rounded-lg shadow-md hover:shadow-lg")} style={{ backgroundImage: `url(${imageNameToPathConverter(item.imageName)})` }}>
                    <div className={clsx(classes.boardInfoWrapper, "flex justify-start items-center rounded-b-lg w-full pb-8")}>
                      <Avatar src={avatarNameToPathConverter(item.author.photoURL)} className="mx-10 my-5" alt={item.author.displayName} />
                      <div className="flex flex-col justify-start overflow-hidden">
                        <div className="flex justify-start">
                          {item.published && <div className={clsx(classes.boardTag, "inline-block bg-red-lighter text-red-darker text-xs px-2 rounded-full uppercase font-semibold tracking-wide whitespace-no-wrap mb-4 mr-8")}>發佈中</div>}
                          {item.tags.slice(0, 2).map((tag, tagIndex) => (
                            <div key={tagIndex} className={clsx(classes.boardTag, "inline-block bg-red-lighter text-red-darker text-xs px-2 rounded-full uppercase font-semibold tracking-wide whitespace-no-wrap mb-4 mr-8")}>{tag}</div>
                          ))}
                        </div>
                        <Typography className="text-16 font-700 whitespace-no-wrap overflow-hidden truncate" color="inherit">{item.title}</Typography>
                        <Typography className="text-16 font-300 text-gray-300 pr-32" color="inherit">
                          {moment(item.updatedAt).format('YYYY/MM/DD')}
                        </Typography>
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
      </div>
    </div >
  );
}

export default NewsListPage;
