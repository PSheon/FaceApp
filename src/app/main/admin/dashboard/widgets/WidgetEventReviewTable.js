import React, { useState, useEffect } from 'react';
import { FuseAnimate } from '@fuse';
import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/styles';
import {
  Icon,
  Table,
  TableHead,
  TableCell,
  TableRow,
  Typography,
  Paper,
  TableBody
} from '@material-ui/core';
import clsx from 'clsx';

import LoadingSpinner from 'app/main/shared/LoadingSpinner';

function WidgetEventReviewTable(props) {
  const theme = useTheme();
  const REVIEW_LOGS = useSelector(
    ({ adminDashboard }) => adminDashboard.reviewLogs
  );

  if (!REVIEW_LOGS) {
    return (
      <div className="flex flex-row items-center w-full h-full">
        <LoadingSpinner width={128} height={128} />
      </div>
    );
  }
  return (
    <Paper className="w-full rounded-8 shadow-none border-1">
      <div className="flex items-center justify-between px-16 h-64 border-b-1">
        <Typography className="text-16">最近 10 筆活動回顧</Typography>
      </div>
      <div className="table-responsive">
        <Table className="w-full min-w-full">
          <TableHead>
            <TableRow>
              <TableCell className="whitespace-no-wrap">參與者</TableCell>
              <TableCell className="whitespace-no-wrap">
                給予課程的評價
              </TableCell>
              <TableCell className="whitespace-no-wrap">
                給予講師內容的評價
              </TableCell>
              <TableCell className="whitespace-no-wrap">
                給予講師表達的評價
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {REVIEW_LOGS.map(row => (
              <TableRow key={row._id}>
                {/* {row.cells.map(cell => {
                  switch (cell.id) {
                    case 'budget_type': {
                      return (
                        <TableCell key={cell.id} component="th" scope="row">
                          <Typography
                            className={clsx(
                              cell.classes,
                              'inline text-11 font-500 px-8 py-4 rounded-4'
                            )}
                          >
                            {cell.value}
                          </Typography>
                        </TableCell>
                      );
                    }
                    case 'spent_perc': {
                      return (
                        <TableCell key={cell.id} component="th" scope="row">
                          <Typography
                            className={clsx(cell.classes, 'flex items-center')}
                          >
                            {cell.value}
                            <Icon className="text-14 ml-4">{cell.icon}</Icon>
                          </Typography>
                        </TableCell>
                      );
                    }
                    default: {
                      return (
                        <TableCell key={cell.id} component="th" scope="row">
                          <Typography className={cell.classes}>
                            {cell.value}
                          </Typography>
                        </TableCell>
                      );
                    }
                  }
                })} */}
                <TableCell component="th" scope="row">
                  <Typography
                    className={clsx(
                      'inline text-11 font-500 px-8 py-4 rounded-4'
                    )}
                  >
                    cell.value
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography
                    className={clsx(
                      'inline text-11 font-500 px-8 py-4 rounded-4'
                    )}
                  >
                    cell.value
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography
                    className={clsx(
                      'inline text-11 font-500 px-8 py-4 rounded-4'
                    )}
                  >
                    cell.value
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography
                    className={clsx(
                      'inline text-11 font-500 px-8 py-4 rounded-4'
                    )}
                  >
                    cell.value
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
}

export default WidgetEventReviewTable;
