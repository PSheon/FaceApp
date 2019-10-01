import React, { useState, useEffect } from 'react';
import {
  Select,
  Card,
  FormControl,
  Icon,
  MenuItem,
  Typography
} from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from '@material-ui/styles';

import { applicantGenderExtractor } from 'app/utils';
import LoadingSpinnerOverlay from 'app/main/shared/LoadingSpinnerOverlay';

const labels = ['男性', '多元性別', '女性'];
const DEFAULT_GENDER_DATASETS = {
  活動參與者: [
    {
      data: [50, 50, 50],
      change: [-0.6, 0.7, 0.1]
    }
  ],
  所有報名者: [
    {
      data: [50, 50, 50],
      change: [-2.3, 0.3, -0.2]
    }
  ]
};

function WidgetGenderPieChart(props) {
  const EVENT_ACTIVITY_LOGS = props.EVENT_ACTIVITY_LOGS;
  const theme = useTheme();

  const [datasetId, setDatasetId] = useState('活動參與者');
  const [isLoading, setIsLoading] = useState(true);
  const [chartDatasets, setChartDatasets] = useState(DEFAULT_GENDER_DATASETS);

  useEffect(() => {
    setChartDatasets(applicantGenderExtractor(EVENT_ACTIVITY_LOGS));
    setIsLoading(false);
  }, [EVENT_ACTIVITY_LOGS]);

  return (
    <FuseAnimate delay={600}>
      <Card className="w-full rounded-8 shadow-none border-none relative">
        {isLoading && <LoadingSpinnerOverlay width={64} height={64} />}
        <div className="p-16 flex flex-row items-center justify-between">
          <Typography className="h1 font-300">性別分布</Typography>

          <FormControl className="">
            <Select
              value={datasetId}
              onChange={ev => setDatasetId(ev.target.value)}
            >
              {Object.keys(chartDatasets).map(key => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="h-224 relative">
          <Doughnut
            data={{
              labels,
              datasets: [
                {
                  data: chartDatasets[datasetId][0].data,
                  change: chartDatasets[datasetId][0].change,
                  borderColor: theme.palette.divider,
                  backgroundColor: [
                    theme.palette.primary.dark,
                    theme.palette.primary.main,
                    theme.palette.primary.light
                  ],
                  hoverBackgroundColor: [
                    theme.palette.secondary.dark,
                    theme.palette.secondary.main,
                    theme.palette.secondary.light
                  ]
                }
              ]
            }}
            options={{
              cutoutPercentage: 65,
              spanGaps: false,
              legend: {
                display: false
              },
              maintainAspectRatio: false
            }}
          />
        </div>

        <div className="p-16 flex flex-row items-center justify-center">
          {labels.map((label, index) => (
            <div key={label} className="px-16 flex flex-col items-center">
              <Typography className="h4" color="textSecondary">
                {label}
              </Typography>
              <Typography className="h2 font-300 py-8">
                {chartDatasets[datasetId][0].data[index]}
              </Typography>

              <div className="flex flex-row items-center justify-center">
                {chartDatasets[datasetId][0].change[index] < 0 && (
                  <Icon className="text-18 pr-4 text-red">arrow_downward</Icon>
                )}

                {chartDatasets[datasetId][0].change[index] > 0 && (
                  <Icon className="text-18 pr-4 text-green">arrow_upward</Icon>
                )}
                <div className="h5">
                  {chartDatasets[datasetId][0].change[index]}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </FuseAnimate>
  );
}

export default WidgetGenderPieChart;
