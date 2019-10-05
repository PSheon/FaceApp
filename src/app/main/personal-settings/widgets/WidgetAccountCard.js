import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Card,
  CardContent,
  Toolbar,
  Typography,
  Icon,
  Fab
} from '@material-ui/core';
import Countdown from 'react-countdown-now';
import { useTheme } from '@material-ui/styles';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as Actions from 'app/store/actions';
import EmailService from 'app/services/emailService';
import EventBusServiceService from 'app/services/eventBusService';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

function WidgetAccountCard() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const USER_PROFILE = useSelector(({ auth }) => auth.user);
  const UserUID = USER_PROFILE.uuid;
  const UserData = USER_PROFILE.data;

  const [EMAIL_EXPIRE_TIME, SET_EMAIL_EXPIRE_TIME] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const { email } = UserData;
  const { verified } = USER_PROFILE;

  useEffect(() => {
    if (EMAIL_EXPIRE_TIME) {
      if (moment().valueOf() >= moment(EMAIL_EXPIRE_TIME).valueOf() - 1000) {
        SET_EMAIL_EXPIRE_TIME(null);
        EmailService.removeEmailExpire();
      }
    } else {
      SET_EMAIL_EXPIRE_TIME(EmailService.getEmailExpire());
    }
  }, [EMAIL_EXPIRE_TIME]);

  function handleReSendSubmit() {
    setIsSending(true);
    EventBusServiceService.resendVerifyEmail()
      .then(response => {
        setIsSending(false);
        EmailService.setEmailExpire();
        SET_EMAIL_EXPIRE_TIME(EmailService.getEmailExpire());
        dispatch(
          Actions.showMessage({ message: `驗證信箱已發送到 ${UserData.email}` })
        );
      })
      .catch(err => {
        setIsSending(false);
        dispatch(
          Actions.showMessage({ message: `驗證發生錯誤，請稍後再行嘗試` })
        );
      });
  }
  function renderVerificationSection() {
    if (verified) {
      return (
        <div className="flex items-center">
          <div
            className="p-2 items-center text-white leading-none rounded-full flex lg:inline-flex"
            style={{ backgroundColor: theme.palette.secondary.main }}
            role="alert"
          >
            <Icon className="text-white pr-10">check_circle</Icon>
            <Typography className="font-semibold mr-2 text-left flex-auto text-white">
              已認證
            </Typography>
          </div>
        </div>
      );
    } else if (!EMAIL_EXPIRE_TIME) {
      /* 尚未發送驗證信箱 */
      return (
        <div className="flex items-center">
          <Fab
            className="whitespace-no-wrap px-12 rounded-full"
            variant="extended"
            color="primary"
            disabled={isSending}
            onClick={handleReSendSubmit}
          >
            <Typography className="font-semibold mr-2 text-left flex-auto text-white">
              驗證我的信箱
            </Typography>
            {isSending ? (
              <LoadingSpinner width={32} height={32} />
            ) : (
              <Icon className="text-white pr-10">send</Icon>
            )}
          </Fab>
        </div>
      );
    } else {
      /* 已發送驗證信，等待 15 分鐘 */
      return (
        <div className="flex items-center">
          <Countdown
            date={EMAIL_EXPIRE_TIME}
            onComplete={() => {
              SET_EMAIL_EXPIRE_TIME(null);
            }}
            renderer={props => (
              <Fab
                className="whitespace-no-wrap px-12 rounded-full"
                variant="extended"
                color="primary"
                disabled
              >
                <Typography className="font-semibold mr-2 text-left flex-auto text-white">
                  已發送驗證信
                </Typography>
                <CircularProgress
                  className="m-4 text-gray-400"
                  variant="static"
                  value={100}
                />
                <CircularProgress
                  className="m-4 absolute top-0"
                  style={{ right: 12 }}
                  variant="static"
                  value={(1 - props.total / 180000) * 100}
                />
                <Typography
                  className="font-semibold text-12 absolute m-4 text-center text-black"
                  style={{
                    top: 10,
                    right: 16
                  }}
                >
                  {`${props.formatted.minutes}:${props.formatted.seconds}`}
                </Typography>
              </Fab>
            )}
          />
        </div>
      );
    }
  }
  return (
    <Card className="h-full rounded-16">
      <AppBar position="static" elevation={0}>
        <Toolbar className="pl-16 pr-8">
          <Typography variant="subtitle1" color="inherit" className="flex-1">
            個人資料
          </Typography>
        </Toolbar>
      </AppBar>
      <CardContent>
        <table className="simple clickable">
          <tbody>
            <tr>
              <td>唯一編號</td>
              <td className="text-right">
                <Typography className="flex items-center font-semibold">
                  {UserUID}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>綁定信箱</td>
              <td className="text-right">
                <Typography className="flex items-center font-semibold">
                  {email}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>身分認證</td>
              <td className="text-right">{renderVerificationSection()}</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export default WidgetAccountCard;
