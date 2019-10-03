import React from 'react';
import {
  AppBar,
  Card,
  CardContent,
  Toolbar,
  Typography,
  TableBody,
  Table,
  TableHead,
  TableCell,
  TableRow,
  Icon
} from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import humanizeDuration from 'humanize-duration';
import moment from 'moment';
import UAParser from 'ua-parser-js';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

function WidgetAccessHistory() {
  const theme = useTheme();
  const accessHistory = useSelector(({ auth }) => auth.user.accessHistory);

  const uaParser = new UAParser();

  if (!accessHistory) {
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner width="128" height="128" />
      </div>
    );
  }

  function renderUADetail(UAInfo) {
    const { browser, device, os } = uaParser.setUA(UAInfo).getResult();
    // console.log(uaParser.setUA(UAInfo).getResult())

    if (device.type === 'mobile') {
      return (
        <Typography
          className={clsx(
            'inline text-11 font-500 px-8 py-4 rounded-4 whitespace-no-wrap flex items-center'
          )}
        >
          <Icon className="mr-12 text-base">phone_iphone</Icon>{' '}
          {`${device.vendor} ${device.model}`}
        </Typography>
      );
    } else {
      return (
        <Typography
          className={clsx(
            'inline text-11 font-500 px-8 py-4 rounded-4 whitespace-no-wrap flex items-center'
          )}
        >
          <Icon className="mr-12 text-base">desktop_mac</Icon>{' '}
          {`${browser.name} V${browser.version} (${os.name} ${os.version})`}
        </Typography>
      );
    }
  }

  return (
    <Card className="rounded-16">
      <AppBar position="static" elevation={0}>
        <Toolbar className="pl-16 pr-8">
          <Typography variant="subtitle1" color="inherit" className="flex-1">
            近期登入記錄
          </Typography>
          <Typography
            variant="subtitle1"
            color="inherit"
            className="rounded-full text-white px-12"
            style={{ backgroundColor: theme.palette.secondary.main }}
          >
            沒有異常警示
          </Typography>
        </Toolbar>
      </AppBar>
      <CardContent>
        <div className="table-responsive">
          <Table className="w-full min-w-full">
            <TableHead>
              <TableRow>
                <TableCell className="whitespace-no-wrap">活動</TableCell>
                <TableCell className="whitespace-no-wrap">來源</TableCell>
                <TableCell className="whitespace-no-wrap">IP 地址</TableCell>
                <TableCell className="whitespace-no-wrap">登入區域</TableCell>
                <TableCell className="whitespace-no-wrap">時間</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accessHistory.map((row, rid) => (
                <TableRow key={rid}>
                  <TableCell component="th" scope="row">
                    <Typography
                      className={clsx(
                        'inline text-11 font-500 px-8 py-4 rounded-4 whitespace-no-wrap'
                      )}
                    >
                      登入
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {renderUADetail(row.browser)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography
                      className={clsx(
                        'inline text-11 font-500 px-8 py-4 rounded-4 whitespace-no-wrap'
                      )}
                    >
                      {row.ip}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography
                      className={clsx(
                        'inline text-11 font-500 px-8 py-4 rounded-4 whitespace-no-wrap'
                      )}
                    >
                      {row.country}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography
                      className={clsx(
                        'inline text-11 font-500 px-8 py-4 rounded-4 whitespace-no-wrap'
                      )}
                    >
                      {moment(row.updatedAt).format('LLLL')}
                      ---
                      {humanizeDuration(moment(row.updatedAt).diff(moment()), {
                        largest: 2,
                        language: 'zh_TW',
                        round: true
                      })}
                      前
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default WidgetAccessHistory;
