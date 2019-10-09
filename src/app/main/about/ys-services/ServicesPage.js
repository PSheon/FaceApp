import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate, FuseAnimateGroup } from '@fuse';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  header: {
    background:
      'linear-gradient(to right, ' +
      theme.palette.primary.dark +
      ' 0%, ' +
      theme.palette.primary.main +
      ' 100%)',
    color: theme.palette.primary.contrastText
  },
  panel: {
    margin: 0,
    borderWidth: '1px 1px 0 1px',
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    '&:first-child': {
      borderRadius: '16px 16px 0 0'
    },
    '&:last-child': {
      borderRadius: '0 0 16px 16px',
      borderWidth: '0 1px 1px 1px'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  expanded: {}
}));

function ServicesPage() {
  const classes = useStyles();

  return (
    <div className="flex flex-col flex-auto flex-shrink-0 w-full">
      <div
        className={clsx(
          classes.header,
          'flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-400 sm:h-360'
        )}
      >
        <FuseAnimate
          animation="transition.slideUpIn"
          duration={400}
          delay={100}
        >
          <Typography color="inherit" className="text-36 sm:text-56 font-light">
            成立宗旨
          </Typography>
        </FuseAnimate>

        <FuseAnimate duration={400} delay={600}>
          <Typography
            variant="subtitle1"
            color="inherit"
            className="opacity-75 mt-8 sm:mt-16 mx-auto max-w-512 whitespace-pre-line"
          >
            勞動部勞動力發展署高屏澎東分署設立「青年職涯發展中心(Youth
            Salon,YS)」以全人全職涯的觀點
            提供專屬於青年朋友的「職涯探索」、「職業訓練」、「就(創)業資訊」等多面向內容
            透過團體講座課程、或個別職涯諮詢服務，讓青年朋友們用行動打造自我品牌，成就夢想！
          </Typography>
        </FuseAnimate>
      </div>

      <div className="flex flex-col flex-1 flex-shrink-0 max-w-xl w-full mx-auto px-16 sm:px-24 py-24 sm:py-32">
        <FuseAnimateGroup
          enter={{
            animation: 'transition.slideUpBigIn'
          }}
        >
          <img
            className="object-cover object-center w-full"
            src="https://ys.nat.gov.tw/img/about-info0.jpg"
            alt="ys goal"
          />

          <Typography
            variant="h5"
            color="inherit"
            className="opacity-75 mt-8 sm:mt-16 mb-12"
          >
            服務目標 ::::
          </Typography>
          <Typography variant="subtitle1">
            YS 希望經由各項活動與服務，協助青年朋友打造專屬的個人品牌與形象。
          </Typography>

          <Typography
            variant="h5"
            color="inherit"
            className="opacity-75 mt-8 sm:mt-16 mb-12"
          >
            服務核心 ::::
          </Typography>

          <div className="flex flex-wrap justify-center items-center mt-44">
            {/* 1.POSITION */}
            <div className="w-full py-12 sm:py-0 sm:w-1/3 flex flex-col justify-center items-around">
              <img
                src="/assets/images/about/about-position.svg"
                alt="Position"
              />
              <div className="flex flex-col justify-center items-center px-12">
                <Typography className="text-yellow-600 font-800" variant="h4">
                  協助職涯定位
                </Typography>
                <Typography className="text-yellow-600 font-600" variant="h6">
                  POSITION
                </Typography>
                <Typography variant="body2" className="py-12 max-w-208">
                  使用專業測評工具認識自我特質，並與職涯諮詢師進行個別唔談，找到適合自己的職涯方向。
                </Typography>
              </div>
              <div className="flex justify-center">
                <div className="px-12 py-8 rounded-full bg-yellow-600 text-white">
                  <Typography variant="body1" className="font-600">
                    職人講座/職場體驗/企業參訪
                  </Typography>
                </div>
              </div>
            </div>
            {/* 2.POWER */}
            <div className="w-full py-12 sm:py-0 sm:w-1/3 flex flex-col justify-center items-around mt-0 sm:-mt-88">
              <img src="/assets/images/about/about-power.svg" alt="Power" />
              <div className="flex flex-col justify-center items-center px-12">
                <Typography className="text-yellow-600 font-800" variant="h4">
                  加強職場認識
                </Typography>
                <Typography className="text-yellow-600 font-600" variant="h6">
                  POWER
                </Typography>
                <Typography variant="body2" className="py-12 max-w-208">
                  使用專業測評工具認識自我特質，並與職涯諮詢師進行個別晤談，找到適合自己的職涯方向。
                </Typography>
              </div>
              <div className="flex justify-center">
                <div className="px-12 py-8 rounded-full bg-yellow-600 text-white">
                  <Typography variant="body1" className="font-600">
                    職人講座/職場體驗/企業參訪
                  </Typography>
                </div>
              </div>
            </div>
            {/* 3.SKILL */}
            <div className="w-full py-12 sm:py-0 sm:w-1/3 flex flex-col justify-center items-around">
              <img src="/assets/images/about/about-skill.svg" alt="Skill" />
              <div className="flex flex-col justify-center items-center px-12">
                <Typography className="text-yellow-600 font-800" variant="h4">
                  增進求職技巧
                </Typography>
                <Typography className="text-yellow-600 font-600" variant="h6">
                  SKILL
                </Typography>
                <Typography variant="body2" className="py-12 max-w-208">
                  使用專業測評工具認識自我特質，並與職涯諮詢師進行個別唔談，找到適合自己的職涯方向
                </Typography>
              </div>
              <div className="flex justify-center">
                <div className="px-12 py-8 rounded-full bg-yellow-600 text-white">
                  <Typography variant="body1" className="font-600">
                    職人講座/職場體驗/企業參訪
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center mt-0 sm:my-88">
            {/* 4.KEEP */}
            <div className="w-full py-12 sm:py-0 sm:w-3/10 flex flex-col justify-center items-around">
              <img src="/assets/images/about/about-keep.svg" alt="Keep" />
              <div className="flex flex-col justify-center items-center px-12">
                <Typography className="text-yellow-600 font-800" variant="h4">
                  提升職場續航力
                </Typography>
                <Typography className="text-yellow-600 font-600" variant="h6">
                  KEEP
                </Typography>
                <Typography variant="body2" className="py-12 max-w-208">
                  使用專業測評工具認識自我特質，並與職涯諮詢師進行個別唔談，找到適合自己的職涯方向
                </Typography>
              </div>
              <div className="flex justify-center">
                <div className="px-12 py-8 rounded-full bg-yellow-600 text-white">
                  <Typography variant="body1" className="font-600">
                    職人講座/職場體驗/企業參訪
                  </Typography>
                </div>
              </div>
            </div>
            {/* 5.planet */}
            <div className="w-full order-first sm:order-none sm:w-4/10 py-24 sm:py-0 sm:-mt-88 self-start">
              <img src="/assets/images/about/about-planet.svg" alt="Planet" />
            </div>
            {/* 6.KNOWING */}
            <div className="w-full py-12 sm:py-0 sm:w-3/10 flex flex-col justify-center items-around">
              <img src="/assets/images/about/about-knowing.svg" alt="Knowing" />
              <div className="flex flex-col justify-center items-center px-12">
                <Typography className="text-yellow-600 font-800" variant="h4">
                  增加求職動力
                </Typography>
                <Typography className="text-yellow-600 font-600" variant="h6">
                  KNOWING
                </Typography>
                <Typography variant="body2" className="py-12 max-w-208">
                  使用專業測評工具認識自我特質，並與職涯諮詢師進行個別唔談，找到適合自己的職涯方向
                </Typography>
              </div>
              <div className="flex justify-center">
                <div className="px-12 py-8 rounded-full bg-yellow-600 text-white">
                  <Typography variant="body1" className="font-600">
                    職人講座/職場體驗/企業參訪
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </FuseAnimateGroup>

        <div className="flex justify-center items-center mt-22 sm:mt-0">
          <Link
            role="button"
            to="/ys-services/appointment/consulting"
            className="mx-12"
          >
            <Button
              variant="contained"
              color="primary"
              className="w-full rounded-full"
              aria-label="預約 個人諮詢"
              value="legacy"
            >
              預約 個人諮詢
            </Button>
          </Link>
          <Link
            role="button"
            to="/ys-services/appointment/guide"
            className="mx-12"
          >
            <Button
              variant="contained"
              color="primary"
              className="w-full rounded-full"
              aria-label="預約 空間導覽"
              value="legacy"
            >
              預約 空間導覽
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;
