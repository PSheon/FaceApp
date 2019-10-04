import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';

import LoadingSpinner from 'app/main/shared/LoadingSpinner';

function WidgetReviewStarsSection() {
  const REVIEW_STARS = useSelector(
    ({ adminDashboard }) => adminDashboard.reviewStars
  );
  const isStarsLoading = REVIEW_STARS.loading;

  if (isStarsLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <LoadingSpinner width="128" height="128" />
      </div>
    );
  }
  return (
    <div className="flex flex-col sm:flex sm:flex-row pb-32">
      <div className="widget flex w-full sm:w-1/3 p-16">
        <Paper className="w-full rounded-8 shadow-lg border-none text-center pt-12 pb-16">
          <Typography className="text-72 leading-none text-blue flex justify-center items-end">
            {REVIEW_STARS['eventStars']}
            <span className="text-gray-500 text-16 whitespace-no-wrap text-bold">
              / 5
            </span>
          </Typography>
          <Typography className="text-16 pt-12" color="textSecondary">
            活動整體滿意度
          </Typography>
        </Paper>
      </div>

      <div className="widget flex w-full sm:w-1/3 p-16">
        <Paper className="w-full rounded-8 shadow-lg border-none text-center pt-12 pb-16">
          <Typography className="text-72 leading-none text-blue flex justify-center items-end">
            {REVIEW_STARS['speakerContentStars']}
            <span className="text-gray-500 text-16 whitespace-no-wrap text-bold">
              / 5
            </span>
          </Typography>
          <Typography className="text-16 pt-12" color="textSecondary">
            講師內容滿意度
          </Typography>
        </Paper>
      </div>

      <div className="widget w-full sm:w-1/3 p-16">
        <Paper className="w-full rounded-8 shadow-lg border-none text-center pt-12 pb-16">
          <Typography className="text-72 leading-none text-blue flex justify-center items-end">
            {REVIEW_STARS['speakerExpressionStars']}
            <span className="text-gray-500 text-16 whitespace-no-wrap text-bold">
              / 5
            </span>
          </Typography>
          <Typography className="text-16 pt-12" color="textSecondary">
            講師表達滿意度
          </Typography>
        </Paper>
      </div>
    </div>
  );
}

export default WidgetReviewStarsSection;
