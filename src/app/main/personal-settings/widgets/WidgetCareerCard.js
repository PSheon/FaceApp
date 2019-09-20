import React from 'react';
import moment from 'moment';
import { AppBar, Card, CardContent, Toolbar, Typography } from '@material-ui/core';

function WidgetCareerCard(props) {
  const { companyName, serviceDepartment, jobTitle, firstYearOfCareer } = props.UserData;

  function renderYearOfCareer() {
    if (firstYearOfCareer) {
      const currentYear = moment();
      const firstYear = moment(firstYearOfCareer);
      return (
        <Typography variant="subtitle1" color="inherit" className="rounded-full bg-amber-600 text-white px-12">
          年資：{currentYear.diff(firstYear, 'years')} 年
        </Typography>
      )
    } else {
      return null
    }
  }

  return (
    <Card className="h-full rounded-16">
      <AppBar position="static" elevation={0}>
        <Toolbar className="pl-16 pr-8">
          <Typography variant="subtitle1" color="inherit" className="flex-1">
            職涯資訊
          </Typography>
          {renderYearOfCareer()}
        </Toolbar>
      </AppBar>
      <CardContent>
        <table className="simple clickable">
          <tbody>
            <tr>
              <td>任職企業</td>
              <td className="text-left">
                <Typography className="flex items-center font-semibold">
                  {companyName ? (companyName) : '未提供'}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>任職部門</td>
              <td className="text-left">
                <Typography className="flex items-center font-semibold">
                  {serviceDepartment ? (serviceDepartment) : '未提供'}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>任職職稱</td>
              <td className="text-left">
                <Typography className="flex items-center font-semibold">
                  {jobTitle ? (jobTitle) : '未提供'}
                </Typography>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

export default WidgetCareerCard;
