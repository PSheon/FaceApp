import React, { useState, useEffect } from 'react';
import { AppBar, Button, Card, CardContent, Toolbar, Typography, TableBody, Table, TableHead, TableCell, TableRow, Icon } from '@material-ui/core';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import humanizeDuration from "humanize-duration";
import moment from 'moment';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

import jwtService from 'app/services/jwtService';

function WidgetPurchaseHistory() {
  const [dataLoading, setDataLoading] = useState(true);
  const [purchaseHistory, setPurchaseHisory] = useState([]);

  useEffect(() => {
    jwtService.getSelfPurchaseHistory()
      .then(newPurchaseHistory => {
        // console.log('newPurchaseHistory ', newPurchaseHistory);
        setDataLoading(false);
        setPurchaseHisory(newPurchaseHistory);
      }).catch(err => {
        console.log(err)
        setDataLoading(false);
      })
  }, []);

  // console.log('purchaseHistory ', purchaseHistory)

  if (!purchaseHistory.length) {
    if (dataLoading) {
      return (
        <div className="flex justify-center items-center h-360">
          <LoadingSpinner width="128" height="128" />
        </div>
      )
    } else {
      return (
        <div className="flex flex-1 items-center justify-center h-360">
          <Typography color="textSecondary" variant="h5">
            開始小額投資
				  </Typography>
          <Link to="/pricing" role="button">
            <Button className="normal-case rounded-full mx-12" variant="contained" color="secondary" aria-label="Send Message">存入資金</Button>
          </Link>
        </div>
      )
    }
  }

  return (
    <Card className="rounded-16">
      <AppBar position="static" elevation={0}>
        <Toolbar className="pl-16 pr-8">
          <Typography variant="subtitle1" color="inherit" className="flex-1">
            資金存入紀錄
          </Typography>
        </Toolbar>
      </AppBar>
      <CardContent>
        <div className="table-responsive">
          <Table className="w-full min-w-full clickable">
            <TableHead>
              <TableRow>
                <TableCell className="whitespace-no-wrap">
                  購買狀態
                </TableCell>
                <TableCell className="whitespace-no-wrap">
                  購買編號
                </TableCell>
                <TableCell className="whitespace-no-wrap">
                  購買組合
                </TableCell>
                <TableCell className="whitespace-no-wrap">
                  時間
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchaseHistory.map((row, rid) => (
                <TableRow key={rid}>
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    {row.status ? (
                      <div className="flex items-center whitespace-no-wrap justify-center">
                        <div className="p-2 bg-green items-center text-indigo-100 leading-none rounded-full flex lg:inline-flex" role="alert">
                          <Icon className="text-white pr-16">check_circle</Icon>
                          <Typography className="font-semibold mr-2 text-left flex-auto">成功</Typography>
                        </div>
                      </div>
                    ) : (
                        <div className="flex items-center whitespace-no-wrap justify-center">
                          <div className="p-2 bg-orange items-center text-indigo-100 leading-none rounded-full flex lg:inline-flex" role="alert">
                            <Icon className="text-white pr-16">cancel</Icon>
                            <Typography className="font-semibold mr-2 text-left flex-auto">失敗</Typography>
                          </div>
                        </div>
                      )}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    <Typography className={clsx("inline text-11 font-500 px-8 py-4 rounded-4 whitespace-no-wrap")}>
                      {row.invoiceId}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    <Typography className={clsx("inline text-11 font-500 px-8 py-4 rounded-4 whitespace-no-wrap")}>
                      {row.package}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    <Typography className={clsx("inline text-11 font-500 px-8 py-4 rounded-4 whitespace-no-wrap")}>
                      {moment(row.updatedAt).format('YYYY-MM-DD hh:mm:ss')}
                      ---
                      {
                        humanizeDuration(
                          moment(row.updatedAt).diff(moment()),
                          { largest: 2, language: 'zh_TW', round: true }
                        )
                      }
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
  )
}

export default WidgetPurchaseHistory;
