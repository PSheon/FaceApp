import React from 'react';
import { AppBar, Card, CardContent, Toolbar, Typography } from '@material-ui/core';

function WidgetContactCard(props) {
  const { email, phone, city, postAddress } = props.UserData;

  return (
    <Card className="h-full rounded-16">
      <AppBar position="static" elevation={0}>
        <Toolbar className="pl-16 pr-8">
          <Typography variant="subtitle1" color="inherit" className="flex-1">
            聯絡資訊
          </Typography>
        </Toolbar>
      </AppBar>
      <CardContent>
        <table className="simple clickable">
          <tbody>
            <tr>
              <td>信箱</td>
              <td>
                <Typography className="flex items-center font-semibold">
                  {email}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>手機</td>
              <td>
                <Typography className="flex items-center font-semibold">
                  {phone ? phone : '未提供'}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>居住城市</td>
              <td>
                <Typography className="flex items-center font-semibold">
                  {city ? city : '未提供'}
                  {postAddress ? ' - ' + postAddress : null}
                </Typography>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

export default WidgetContactCard;
