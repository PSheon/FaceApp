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

import { imageNameToPathConverter } from 'app/utils';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

const accompaniesList = [
  {
    id: 1,
    coverImageUrl: 'https://ys.nat.gov.tw/uploads/link/4935a93d-d4e0-8de5-4c38-eb557eb7aa42.jpg',
    title: '勞動部勞動力發展署 高屏澎東分署',
    description: '',
    linkAddress: 'http://kpptr.wda.gov.tw/',
  },
  {
    id: 2,
    coverImageUrl: 'https://ys.nat.gov.tw/uploads/link/c5643646-2b46-68f3-3504-aa848ee5266b.jpg',
    title: '勞動部',
    description: '',
    linkAddress: 'https://www.mol.gov.tw/',
  },
  {
    id: 3,
    coverImageUrl: 'https://ys.nat.gov.tw/uploads/link/0154f05f-d422-62e7-e0d5-9ec5f43805db.jpg',
    title: '台灣就業通',
    description: '',
    linkAddress: 'https://www.taiwanjobs.gov.tw/Internet/index/index.aspx',
  },
  {
    id: 4,
    coverImageUrl: 'https://ys.wda.gov.tw/L/upload/webstyle_default/img/sme.png',
    title: '新創圓夢網',
    description: '',
    linkAddress: 'https://sme.moeasmea.gov.tw/startup/',
  },
]

const useStyles = makeStyles(theme => ({
  dateLabel: {
    top: '3rem',
    left: '2rem',
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

function EventsListPage(props) {
  const classes = useStyles(props);

  return (
    <div className={clsx(classes.root, "flex flex-grow flex-shrink-1 flex-col items-start container px-16 md:px-24")}>
      <FuseAnimate animation="transition.slideRightIn" delay={300}>
        <Typography className="mt-16 sm:mt-40 flex items-center sm:mb-12" component={Link} role="button" to="/home" color="inherit">
          <Icon className="mr-4 text-20">arrow_back</Icon>
          返回 YS 首頁
        </Typography>
      </FuseAnimate>
      <FuseAnimate>
        <Typography className="sm:pt-12 text-32 sm:text-40 font-300" color="inherit"> YS 友站列表</Typography>
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
        {accompaniesList.map(item => (
          <Link to={item.linkAddress} role="button" key={item.id} className="w-full sm:w-1/2">
            <div className="h-320 p-6">
              <div className={clsx(classes.board, "flex flex-col items-center justify-end w-full h-full rounded pt-24 rounded-lg shadow-md hover:shadow-lg relative")} style={{ backgroundImage: `url(${item.coverImageUrl})` }}>
                {/* Title Label */}
                <div className={clsx(classes.dateLabel, "absolute bg-amber-600 text-white text-center px-8 rounded-full h-32")}>
                  <Typography className="uppercase font-semibold tracking-wide whitespace-no-wrap text-lg leading-relaxed">
                    {item.title}
                  </Typography>
                </div>
                {/* <div className={clsx(classes.boardInfoWrapper, "flex justify-center items-center rounded-b-lg w-full pb-8")}>
                  <Typography className="text-16 md:text-24 font-700 whitespace-no-wrap overflow-hidden truncate" color="inherit">{item.title}</Typography>
                </div> */}
              </div>
            </div>
          </Link>
        ))}
      </FuseAnimateGroup>
    </div>
  );
}

export default EventsListPage;
