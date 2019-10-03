import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import * as Actions from 'app/store/actions';
import WidgetCarouselSection from './widgets/WidgetCarouselCard';
import SectionNews from './sections/SectionNews';
import SectionSpeakers from './sections/SectionSpeakers';
import SectionInformation from './sections/SectionInformation';
import SectionEvents from './sections/SectionEvents';

const useStyles = makeStyles(theme => ({
  linWrapper: {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut
  }
}));

function LandingPage() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.syncHomePageCarousels());
  }, [dispatch]);

  return (
    <div className="w-full">
      <WidgetCarouselSection />

      <FuseAnimate animation="transition.slideUpIn" delay={200}>
        <div className="flex flex-col-reverse md:flex-row sm:p-8 container">
          <div className="flex flex-1 flex-col min-w-0">
            {/* YS News */}
            <FuseAnimate delay={600}>
              <Typography className="p-16 pb-8 text-18 font-600 flex justify-between">
                YS 新聞快訊
                <Link
                  to="/news-list"
                  className="px-12 text-black"
                  role="button"
                >
                  更多新聞
                </Link>
              </Typography>
            </FuseAnimate>
            <div className="flex flex-col sm:flex sm:flex-row">
              <SectionNews />
            </div>
          </div>

          <div className="flex flex-col flex-wrap w-full md:w-400 lg:w-460">
            {/* YS Events */}
            <FuseAnimate delay={600}>
              <Typography className="w-full p-16 pb-8 text-18 font-600 flex justify-between">
                活動預告
                <Link
                  to="/events-list"
                  className="px-12 text-black"
                  role="button"
                >
                  更多活動
                </Link>
              </Typography>
            </FuseAnimate>
            <div className="widget w-full p-16">
              <SectionEvents />
            </div>
            {/* <div className="mb-32 w-full sm:w-1/2 md:w-full">
							<FuseAnimate delay={600}>
								<Typography className="p-16 pb-8 text-18 font-600 flex justify-between">
									活動預告
									<Link to="/events-list" className="px-12 text-black" role="button">更多活動</Link>
								</Typography>
							</FuseAnimate>
							<div className="widget w-full p-16">
								<SectionEvents />
							</div>
						</div> */}
          </div>
        </div>
      </FuseAnimate>

      {/* YS Information */}
      <FuseAnimate delay={600}>
        <div className="container">
          <Typography className="p-16 pb-8 text-18 font-600 flex justify-between">
            職場情報站
            <Link
              to="/information-list"
              className="px-12 text-black"
              role="button"
            >
              更多情報
            </Link>
          </Typography>
          <div className="flex flex-col sm:flex sm:flex-row">
            <SectionInformation />
          </div>
        </div>
      </FuseAnimate>

      {/* YS About */}
      <FuseAnimate delay={600}>
        <div className="container">
          <div className="flex flex-wrap mt-32">
            <div className="w-1/2 sm:w-1/4 mb-10 flex justify-center items-center">
              <Link
                to="/ys-services"
                role="button"
                className={clsx(
                  classes.linWrapper,
                  'flex justify-center items-center h-128 w-128 md:h-200 md:w-200 p-12 rounded-full bg-orange hover:shadow-lg'
                )}
                // style={{
                //   backgroundImage:
                //     'url(https://ys.nat.gov.tw/img/index-btn-bg.png)'
                // }}
              >
                <Typography className="leading-loose text-white text-lg md:text-2xl bg-no-repeat bg-contain">
                  關於 YS
                </Typography>
              </Link>
            </div>
            <div className="w-1/2 sm:w-1/4 mb-10 flex justify-center items-center">
              <Link
                to="/ys-space"
                role="button"
                className={clsx(
                  classes.linWrapper,
                  'flex justify-center items-center h-128 w-128 md:h-200 md:w-200 p-12 rounded-full bg-orange hover:shadow-lg'
                )}
                // style={{
                // 	backgroundImage:
                // 		'url(https://ys.nat.gov.tw/img/index-btn-bg.png)'
                // }}
              >
                <Typography className="leading-loose text-white text-lg md:text-2xl bg-no-repeat bg-contain">
                  空間介紹
                </Typography>
              </Link>
            </div>
            <div className="w-1/2 sm:w-1/4 mb-10 flex justify-center items-center">
              <Link
                to="/ys-faq"
                role="button"
                className={clsx(
                  classes.linWrapper,
                  'flex justify-center items-center h-128 w-128 md:h-200 md:w-200 p-12 rounded-full bg-orange hover:shadow-lg'
                )}
                // style={{
                // 	backgroundImage:
                // 		'url(https://ys.nat.gov.tw/img/index-btn-bg.png)'
                // }}
              >
                <Typography className="leading-loose text-white text-lg md:text-2xl bg-no-repeat bg-contain">
                  常見 Q & A
                </Typography>
              </Link>
            </div>
            <div className="w-1/2 sm:w-1/4 mb-10 flex justify-center items-center">
              <Link
                to="/ys-contact-us"
                role="button"
                className={clsx(
                  classes.linWrapper,
                  'flex justify-center items-center h-128 w-128 md:h-200 md:w-200 p-12 rounded-full bg-orange hover:shadow-lg'
                )}
                // style={{
                //   backgroundImage:
                //     'url(https://ys.nat.gov.tw/img/index-btn-bg.png)'
                // }}
              >
                <Typography className="leading-loose text-white text-lg md:text-2xl bg-no-repeat bg-contain">
                  聯絡我們
                </Typography>
              </Link>
            </div>
          </div>
        </div>
      </FuseAnimate>

      {/* YS Speaker */}
      <FuseAnimate delay={600}>
        <div className="container">
          <Typography className="p-16 pb-8 text-18 font-600 flex justify-between">
            名人回顧
            {/* <Link to="/news" className="px-12 text-black" role="button">更多活動</Link> */}
          </Typography>
        </div>
      </FuseAnimate>
      <div className="mb-32">
        <SectionSpeakers />
      </div>
    </div>
  );
}

export default LandingPage;
