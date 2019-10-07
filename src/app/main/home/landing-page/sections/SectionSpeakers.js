import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FuseAnimate } from '@fuse';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import Slider from 'react-slick';
import clsx from 'clsx';
import { fade } from '@material-ui/core/styles/colorManipulator';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { imageNameToPathConverter } from 'app/utils';
import * as Actions from 'app/store/actions';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

const settings = {
  dots: true,
  lazyLoad: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};
const useStyles = makeStyles(theme => ({
  sliderWrapper: {
    '& .slick-arrow.slick-prev': {
      left: 10,
      zIndex: 1
    },
    '& .slick-arrow.slick-next': {
      right: 10
    }
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
      boxShadow: theme.shadows[6]
    }
  },
  boardInfoWrapper: {
    background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.9))'
  },
  boardTag: {
    width: 'fit-content'
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
function SectionSpeakers(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const SPEAKERS = useSelector(({ homePage }) => homePage.speakers);
  const isSyncing = SPEAKERS.loading;
  const speakers = SPEAKERS.docs.slice(0, 8);

  useEffect(() => {
    dispatch(Actions.syncHomePageSpeakers());
  }, [dispatch]);

  if (isSyncing || !speakers.length) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <LoadingSpinner width="128" height="128" />
      </div>
    );
  }

  return (
    <FuseAnimate animation="transition.slideUpIn" delay={300}>
      <Slider {...settings} className={clsx(classes.sliderWrapper)}>
        {speakers.map(speaker => (
          <div className="w-320 h-288 px-4" key={speaker._id}>
            <div
              className={clsx(
                classes.board,
                'flex flex-col items-center justify-end w-full h-full rounded pt-24 rounded-lg shadow-md hover:shadow-lg'
              )}
              style={{
                backgroundImage: `url(${imageNameToPathConverter(
                  speaker.photoURL
                )})`
              }}
            >
              <div
                className={clsx(
                  classes.boardInfoWrapper,
                  'flex flex-col justify-start items-center rounded-b-lg w-full pb-8 px-12'
                )}
              >
                <Typography className="text-24 font-700">
                  {speaker.displayName}
                </Typography>
                <Typography className="text-16 font-500 text-gray-300 text-center">
                  {speaker.title}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </FuseAnimate>
  );
}

export default SectionSpeakers;
