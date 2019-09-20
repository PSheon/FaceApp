import React from 'react';
import moment from 'moment';
import { AppBar, Card, CardContent, Toolbar, Typography } from '@material-ui/core';

import { genderConverter } from 'app/utils';

function WidgetProfileCard(props) {
  const { fullName, gender, bob } = props.UserData;

  return (
    <Card className="h-full rounded-16">
      <AppBar position="static" elevation={0}>
        <Toolbar className="pl-16 pr-8">
          <Typography variant="subtitle1" color="inherit" className="flex-1">
            個人資訊
          </Typography>
        </Toolbar>
      </AppBar>
      <CardContent>
        <table className="simple clickable">
          <tbody>
            <tr>
              <td>中文姓名</td>
              <td className="text-right">
                <Typography className="flex items-center font-semibold">
                  {fullName ? fullName : '未提供'}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>性別</td>
              <td className="text-right">
                <Typography className="flex items-center font-semibold">
                  {gender ? genderConverter(gender) : '未提供'}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>生日</td>
              <td className="text-right">
                <Typography className="flex items-center font-semibold">
                  {bob ? moment(bob).format('LL') : '未提供'}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>語言</td>
              <td className="text-right">
                <Typography className="flex items-center font-semibold">
                  繁體中文
                </Typography>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

export default WidgetProfileCard;
