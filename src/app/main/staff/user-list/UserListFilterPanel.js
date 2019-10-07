import React from 'react';
import { Drawer, Typography, Divider } from '@material-ui/core';
import { FuseScrollbars } from '@fuse';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

import * as Actions from 'app/store/actions';

const useStyles = makeStyles(theme => ({
  root: {
    width: 280
    // borderRadius: '1.2rem 0 0 1.2rem'
  },
  headerWrapper: {
    background:
      'linear-gradient(to right, ' +
      theme.palette.primary.dark +
      ' 0%, ' +
      theme.palette.primary.main +
      ' 100%)'
  }
}));

function UserListFilterPanel(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const PANEL_OPEN_STATUS = useSelector(
    ({ userList }) => userList.filterPanel.open
  );

  return (
    <Drawer
      classes={{ paper: classes.root }}
      open={PANEL_OPEN_STATUS}
      anchor="right"
      onClose={ev => dispatch(Actions.toggleFilterPanel())}
    >
      <FuseScrollbars>
        <div
          className={clsx(
            classes.headerWrapper,
            'flex justify-center items-center w-full h-192'
          )}
        >
          <Typography variant="subtitle1" className="text-white">
            設定篩選條件
          </Typography>
        </div>
        <Divider />
        <div className="flex flex-col justify-center item-center w-full p-12">
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
          <Typography>Filter Panel</Typography>
        </div>
      </FuseScrollbars>
    </Drawer>
  );
}

export default UserListFilterPanel;
