import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Typography, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { FuseAnimateGroup } from '@fuse';
import moment from 'moment';
import clsx from 'clsx';

import { imageNameToPathConverter, avatarNameToPathConverter } from 'app/utils';
import * as Actions from 'app/store/actions';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

const useStyles = makeStyles(theme => ({
  dateLabel: {
    top: '2.5rem',
    left: '-1rem'
  },
  board: {
    cursor: 'pointer',
    boxShadow: theme.shadows[0],
    transitionProperty: 'box-shadow border-color left top',
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
        paddingBottom: '2.5rem'
      },
      '& $boardContent': {
        transform: 'translateY(0)'
      }
    }
  },
  boardInfoWrapper: {
    transition: 'padding .3s',
    background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.9))'
  },
  boardTag: {
    width: 'fit-content'
  },
  boardContent: {
    transition: 'transform .3s',
    transform: 'translateY(3rem)'
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
  }
}));

function SectionNews(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  // const NEWS = useSelector(({ homePage }) => homePage.news.docs.filter(item => item.published).slice(0, 3))
  const NEWS = useSelector(({ homePage }) => homePage.news);
  const isSyncing = NEWS.loading;
  const [firstNews, ...otherNews] = NEWS.docs
    .filter(item => item.published)
    .slice(0, 3);

  useEffect(() => {
    dispatch(Actions.syncHomePageNews());
  }, [dispatch]);

  if (isSyncing || !NEWS.docs.length) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <LoadingSpinner width="128" height="128" />
      </div>
    );
  }

  return (
    <FuseAnimateGroup
      className="flex flex-wrap w-full justify-center pt-16 pb-32 px-16"
      enter={{
        animation: 'transition.slideUpBigIn',
        duration: 300
      }}
    >
      {/* First News */}
      <Link
        to={`/news-list/${firstNews._id}`}
        role="button"
        key={firstNews._id}
        className="w-full h-320 sm:h-400 p-6"
      >
        <div
          className={clsx(
            classes.board,
            'flex flex-col items-center justify-end w-full h-full rounded pt-24 rounded-lg shadow-md hover:shadow-lg relative'
          )}
          style={{
            backgroundImage: `url(${imageNameToPathConverter(
              firstNews.imageName
            )})`
          }}
        >
          {/* Date Label */}
          <div
            className={clsx(
              classes.dateLabel,
              'absolute bg-amber-600 text-white text-center px-8 rounded-full h-32'
            )}
          >
            <Typography className="uppercase font-semibold tracking-wide whitespace-no-wrap text-lg leading-relaxed">
              {moment(firstNews.updatedAt).format('LL')}
            </Typography>
          </div>
          <div
            className={clsx(
              classes.boardInfoWrapper,
              'flex justify-start items-center rounded-b-lg w-full pb-8'
            )}
          >
            <Avatar
              src={avatarNameToPathConverter(firstNews.author.photoURL)}
              className="mx-10 my-5"
              alt={firstNews.author.displayName}
            />
            <div className="flex flex-col justify-start overflow-hidden pr-12">
              <div className="flex justify-start">
                {firstNews.tags.slice(0, 2).map((tag, tagIndex) => (
                  <div
                    key={tagIndex}
                    className={clsx(
                      classes.boardTag,
                      'inline-block bg-amber-600 px-2 rounded-full uppercase font-semibold tracking-wide whitespace-no-wrap mb-4 mr-8'
                    )}
                  >
                    {tag}
                  </div>
                ))}
              </div>
              <Typography
                className="text-16 md:text-24 font-700 whitespace-no-wrap overflow-hidden truncate"
                color="inherit"
              >
                {firstNews.title}
              </Typography>
              <Typography
                className={clsx(
                  classes.boardContent,
                  'text-16 font-700 whitespace-no-wrap overflow-hidden truncate'
                )}
                color="inherit"
              >
                {firstNews.subTitle}
              </Typography>
            </div>
          </div>
        </div>
      </Link>
      {/* Other News */}
      {otherNews.map(item => (
        <Link
          to={`/news-list/${item._id}`}
          role="button"
          key={item._id}
          className="w-full sm:w-1/2"
        >
          <div className="h-320 p-6">
            <div
              className={clsx(
                classes.board,
                'flex flex-col items-center justify-end w-full h-full rounded pt-24 rounded-lg shadow-md hover:shadow-lg relative'
              )}
              style={{
                backgroundImage: `url(${imageNameToPathConverter(
                  item.imageName
                )})`
              }}
            >
              {/* Date Label */}
              <div
                className={clsx(
                  classes.dateLabel,
                  'absolute bg-amber-600 text-white text-center px-8 rounded-full h-32'
                )}
              >
                <Typography className="uppercase font-semibold tracking-wide whitespace-no-wrap text-lg leading-relaxed">
                  {moment(firstNews.updatedAt).format('LL')}
                </Typography>
              </div>
              <div
                className={clsx(
                  classes.boardInfoWrapper,
                  'flex justify-start items-center rounded-b-lg w-full'
                )}
              >
                <Avatar
                  src={avatarNameToPathConverter(item.author.photoURL)}
                  className="mx-10 my-5"
                  alt={item.author.displayName}
                />
                <div className="flex flex-col justify-start overflow-hidden p-12">
                  <div className="flex justify-start">
                    {item.tags.slice(0, 5).map((tag, tagIndex) => (
                      <div
                        key={tagIndex}
                        className={clsx(
                          classes.boardTag,
                          'inline-block bg-amber-600 px-2 rounded-full uppercase font-semibold tracking-wide whitespace-no-wrap mb-4 mr-8'
                        )}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                  <Typography
                    className="text-16 md:text-24 font-700 whitespace-no-wrap overflow-hidden truncate"
                    color="inherit"
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.boardContent,
                      'text-16 font-700 whitespace-no-wrap overflow-hidden truncate'
                    )}
                    color="inherit"
                  >
                    {item.subTitle}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </FuseAnimateGroup>
  );
}

export default SectionNews;
