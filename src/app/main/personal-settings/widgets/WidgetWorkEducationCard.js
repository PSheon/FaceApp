import React from 'react';
import { AppBar, Card, CardContent, Toolbar, Typography } from '@material-ui/core';

import { educationConverter, departmentNameConverter, statusConverter } from 'app/utils';

function WidgetWorkEducationCard(props) {
  const { education, schoolName, departmentName, employmentStatus } = props.UserData;

  return (
    <Card className="h-full rounded-16">
      <AppBar position="static" elevation={0}>
        <Toolbar className="pl-16 pr-8">
          <Typography variant="subtitle1" color="inherit" className="flex-1">
            教育 & 工作
          </Typography>
        </Toolbar>
      </AppBar>
      <CardContent>
        <table className="simple clickable">
          <tbody>
            <tr>
              <td>最高學歷</td>
              <td className="text-right">
                <Typography className="flex items-center font-semibold">
                  {education ? educationConverter(education) : '未提供'}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>學校名稱</td>
              <td className="text-right">
                <Typography className="flex items-center font-semibold">
                  {schoolName ? schoolName : '未提供'}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>科系名稱</td>
              <td className="text-right">
                <Typography className="flex items-center font-semibold">
                  {departmentName ? departmentNameConverter(departmentName) : '未提供'}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>現職工作</td>
              <td className="text-right">
                <Typography className="flex items-center font-semibold">
                  {employmentStatus ? statusConverter(employmentStatus) : '未提供'}
                </Typography>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

export default WidgetWorkEducationCard;
