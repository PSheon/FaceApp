import React from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Card, CardContent, Toolbar, Typography, Icon } from '@material-ui/core';

function WidgetAccountCard() {
  const USER_PROFILE = useSelector(({ auth }) => auth.user);
  const UserUID = USER_PROFILE.uuid;
  const UserData = USER_PROFILE.data;

  const { email } = UserData;
  const { verified } = USER_PROFILE;

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
              <td className="text-right">
                {verified ? (
                  <div className="flex items-center">
                    <div className="p-2 bg-green items-center text-indigo-100 leading-none rounded-full flex lg:inline-flex" role="alert">
                      <Icon className="text-white pr-10">check_circle</Icon>
                      <Typography className="font-semibold mr-2 text-left flex-auto">已認證</Typography>
                    </div>
                  </div>
                ) : (
                    <div className="flex items-center">
                      <div className="p-2 bg-orange items-center text-indigo-100 leading-none rounded-full flex lg:inline-flex" role="alert">
                        <Icon className="text-white pr-10">cancel</Icon>
                        <Typography className="font-semibold mr-2 text-left flex-auto">尚未認證</Typography>
                      </div>
                    </div>
                  )}
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

export default WidgetAccountCard;
