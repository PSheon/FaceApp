import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Card, CardContent, Toolbar, Typography, Icon, Chip, Avatar } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import * as Actions from 'app/store/actions';
import * as authActions from 'app/auth/store/actions';
import { socialLogoConverter } from 'app/utils';
import { GOOGLE_CLIENT_ID, FACEBOOK_CLIENT_ID } from 'app/fuse-configs/envsConfig';

function WidgetSocialLink() {
  const dispatch = useDispatch();
  const USER_DATA = useSelector(({ auth }) => auth.user.data);
  // console.log('USER_DATA ', USER_DATA)

  function handleSubmitLinkGoogle({ googleId, accessToken, profileObj }) {
    const googleInfo = {
      googleID: googleId,
      googleAccessToken: accessToken,
      googleDisplayName: profileObj.name,
      googleEmail: profileObj.email,
      googlePhotoURL: profileObj.imageUrl
    };
    dispatch(authActions.submitLinkGoogle(googleInfo));
  }

  function handleSubmitLLinkFacebook({ userID, accessToken, name, email, picture }) {
    const fbInfo = {
      facebookID: userID,
      facebookAccessToken: accessToken,
      facebookDisplayName: name,
      facebookEmail: email,
      facebookPhotoURL: picture.data ? picture.data.url : 'assets/images/avatars/penguin.png'
    };
    dispatch(authActions.submitLinkFacebook(fbInfo));
  }

  function renderConnectStatus(provider) {
    if (USER_DATA[provider]) {
      return (
        <div className="flex items-center">
          <Chip avatar={<Avatar src={socialLogoConverter(provider)} className="p-2" />} label={USER_DATA[provider.toLowerCase()]['displayName']} className="px-8 bg-green-400 text-white" />
        </div>
      )
    } else {
      switch (provider) {
        case 'facebook':
          return (
            <FacebookLogin
              appId={FACEBOOK_CLIENT_ID}
              fields="name,email,picture"
              render={renderProps => (
                <div className="flex items-center" onClick={renderProps.onClick}>
                  <div className="p-2 bg-orange items-center text-white leading-none rounded-full flex lg:inline-flex" role="alert">
                    <Icon className="text-white mx-6">link</Icon>
                    <Typography className="font-semibold mr-2 text-left flex-auto">連接 {provider.toUpperCase()} 帳號</Typography>
                  </div>
                </div>
              )}
              callback={facebookInfo => { handleSubmitLLinkFacebook(facebookInfo) }}
              onFailure={response => { dispatch(Actions.showMessage({ message: '登入 Facebook 失敗' })) }}
            />
          )

        case 'google':
        default:
          return (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              render={renderProps => (
                <div className="flex items-center" onClick={renderProps.onClick}>
                  <div className="p-2 bg-orange items-center text-white leading-none rounded-full flex lg:inline-flex" role="alert">
                    <Icon className="text-white mx-6">link</Icon>
                    <Typography className="font-semibold mr-2 text-left flex-auto">連接 {provider.toUpperCase()} 帳號</Typography>
                  </div>
                </div>
              )}
              onSuccess={googleInfo => { handleSubmitLinkGoogle(googleInfo) }}
              onFailure={response => { dispatch(Actions.showMessage({ message: '連接 Google 失敗' })) }}
            />
          )
      }
    }
  }

  return (
    <Card className="h-full rounded-16">
      <AppBar position="static" elevation={0}>
        <Toolbar className="pl-16 pr-8">
          <Typography variant="subtitle1" color="inherit" className="flex-1">
            連結社交帳戶
          </Typography>
        </Toolbar>
      </AppBar>
      <CardContent>
        <table className="simple clickable">
          <tbody>
            <tr>
              <td>Facebook</td>
              <td className="text-center">
                {renderConnectStatus('facebook')}
              </td>
            </tr>
            <tr>
              <td>Google</td>
              <td className="text-center">
                {renderConnectStatus('google')}
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

export default WidgetSocialLink;
