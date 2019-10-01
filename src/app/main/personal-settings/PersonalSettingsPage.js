import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Tab, Tabs, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FusePageSimple, FuseAnimate } from '@fuse';

import * as Actions from 'app/auth/store/actions';
import AboutTab from './tabs/AboutTab';
import PersonalTab from './tabs/PersonalTab';

const useStyles = makeStyles(theme => ({
  layoutHeader: {
    height: 180,
    minHeight: 180,
    [theme.breakpoints.down('md')]: {
      height: 200,
      minHeight: 200
    },
    [theme.breakpoints.down('sm')]: {
      height: 280,
      minHeight: 280
    }
  }
}));

function PersonalSettingsPage(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);

  const [selectedTab, setSelectedTab] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (props.match.params.editMode === 'edit') {
      handleEditMode();
    }
  }, [props.match.params.editMode, user.verified]);
  useEffect(() => {
    dispatch(Actions.syncUserAccessHistory());
  }, [dispatch]);

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }
  function handleEditMode() {
    setSelectedTab(1);
    setIsEditMode(true);
  }

  return (
    <FusePageSimple
      classes={{
        header: classes.layoutHeader,
        toolbar: 'px-16 sm:px-24'
      }}
      header={
        <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
          <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
            <FuseAnimate animation="transition.expandIn" delay={300}>
              <Avatar className="w-96 h-96" src={user.data.photoURL} />
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Typography className="md:ml-24" variant="h3" color="inherit">
                {user.data.displayName}
              </Typography>
            </FuseAnimate>
          </div>

          <div className="flex flex-col-reverse items-center py-12 md:py-0 md:flex-row md:justify-end">
            {/* <Button className="mr-8 normal-case rounded-full" variant="contained" color="secondary" aria-label="Follow">Follow</Button> */}
            {/* <Typography className="md:ml-24" variant="h4" color="inherit">可用餘額 $ {user.data.balance ? user.data.balance['$numberDecimal'] : 0}</Typography> */}
            {/* <Link to="/" role="button">
							<Button className="normal-case rounded-full mx-12" variant="contained" color="secondary" aria-label="更新個人資料">更新個人資料</Button>
						</Link> */}
            <Button
              className="normal-case rounded-full mx-12"
              variant="contained"
              color="secondary"
              aria-label="更新個人資料"
              onClick={handleEditMode}
            >
              更新個人資料
            </Button>
          </div>
        </div>
      }
      contentToolbar={
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="off"
          classes={{
            root: 'h-64 w-full border-b-1'
          }}
        >
          <Tab
            classes={{
              root: 'h-64 rounded-full'
            }}
            label="帳戶資訊"
          />
          <Tab
            classes={{
              root: 'h-64 rounded-full'
            }}
            label="個人資料"
          />
        </Tabs>
      }
      content={
        <div className="p-16 sm:p-24">
          {selectedTab === 0 && <AboutTab />}
          {selectedTab === 1 && (
            <PersonalTab
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
            />
          )}
        </div>
      }
    />
  );
}

export default PersonalSettingsPage;
