import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Avatar, Paper } from '@material-ui/core';
import { FuseAnimate, FuseAnimateGroup } from '@fuse';
import moment from 'moment';

import { avatarNameToPathConverter } from 'app/utils';
import WidgetAreaChart from '../widgets/WidgetAreaChart';
import WidgetEducationAreaChart from '../widgets/WidgetEducationAreaChart';
import WidgetGenderPieChart from '../widgets/WidgetGenderPieChart';
import WidgetEducationPieChart from '../widgets/WidgetEducationPieChart';

function Analysis(props) {
  /* eslint-disable */
  const {
    _id,
    coverImageName,
    title,
    subTitle,
    enrollDeadline,
    startDateTime,
    endDateTime,
    speaker,
    tags,
    maximumOfApplicants,
    author,
    published,
    updatedAt
  } = props.eventDetail;
  /* eslint-enable */
  // console.log('props.eventDetail ', props.eventDetail)
  const EVENT_ACTIVITY_LOGS = useSelector(({ activity }) => activity.eventLogs.docs[_id]);
  const queueingInfos = useSelector(({ activity }) => activity.eventLogs.queueingInfos[_id]);

  // console.log('queueingInfos ', queueingInfos)

  return (
    <FuseAnimate animation="transition.slideUpIn" delay={200}>

      <div className="flex flex-col md:flex-row sm:p-8 container">

        <div className="flex flex-1 flex-col min-w-0">
          {/* Speaker Info */}
          <FuseAnimate delay={600}>
            <div className="flex justify-start items-center rounded-b-lg w-full pb-8">
              <Avatar src={avatarNameToPathConverter(author.photoURL)} className="mr-10 my-5" alt={author.displayName} />
              <div className="flex flex-col justify-start overflow-hidden pr-12">
                <Typography className="text-16 font-700 whitespace-no-wrap overflow-hidden truncate">{`${speaker.title}-${speaker.displayName}`}</Typography>
                <Typography className="text-16 font-300 text-gray-700 pr-32">
                  {`${moment(startDateTime).format('YYYY/MM/DD hh:mm')} - ${moment(endDateTime).format('YYYY/MM/DD hh:mm')}`}
                </Typography>
              </div>
            </div>
          </FuseAnimate>

          {/* YS Events */}
          <FuseAnimateGroup
            className="flex flex-wrap"
            enter={{
              animation: "transition.slideUpBigIn"
            }}
          >
            <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
              <Paper className="w-full rounded-8 shadow-none border-none text-center pt-12 pb-28">
                {queueingInfos ? (
                  <Typography
                    className="text-72 leading-none text-blue">{queueingInfos['succeededCount']}</Typography>
                ) : (
                    <Typography
                      className="text-72 leading-none text-blue">100</Typography>
                  )}
                <Typography className="text-16" color="textSecondary">報名人數</Typography>
              </Paper>
            </div>
            <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
              <Paper className="w-full rounded-8 shadow-none border-none text-center pt-12 pb-28">
                <Typography
                  className="text-72 leading-none text-blue">{maximumOfApplicants}</Typography>
                <Typography className="text-16" color="textSecondary">人數限制</Typography>
              </Paper>
            </div>
            <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
              <Paper className="w-full rounded-8 shadow-none border-none text-center pt-12 pb-28">
                <Typography className="text-72 leading-none text-blue flex justify-center items-end">
                  {3.5} <span className="text-gray-500 text-16 whitespace-no-wrap text-bold"> / 5</span>
                </Typography>
                <Typography className="text-16" color="textSecondary">活動滿意度</Typography>
              </Paper>
            </div>
            <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
              <Paper className="w-full rounded-8 shadow-none border-none text-center pt-12 pb-28">
                <Typography className="text-72 leading-none text-blue flex justify-center items-end">
                  {2.5} <span className="text-gray-500 text-16 whitespace-no-wrap text-bold"> / 5</span>
                </Typography>
                <Typography className="text-16" color="textSecondary">講師滿意度</Typography>
              </Paper>
            </div>
          </FuseAnimateGroup>

          {/* Education chart */}
          <WidgetEducationAreaChart EVENT_ACTIVITY_LOGS={EVENT_ACTIVITY_LOGS} />
          {/* Line chart Copy */}
          <WidgetAreaChart />
        </div>

        <div className="flex flex-wrap w-full md:w-320 lg:w-400">
          {/* Gender */}
          <div className="mb-32 w-full sm:w-1/2 md:w-full">
            <WidgetGenderPieChart EVENT_ACTIVITY_LOGS={EVENT_ACTIVITY_LOGS} />
          </div>

          {/* Education */}
          <div className="mb-32 w-full sm:w-1/2 md:w-full">
            <WidgetEducationPieChart />
          </div>
        </div>
      </div>
    </FuseAnimate>
  )
}

export default Analysis;
