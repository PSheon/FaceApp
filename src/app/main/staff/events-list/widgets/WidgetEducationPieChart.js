import React from 'react';
import { Typography, Card, Icon } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from '@material-ui/styles';

const data = {
  labels: ['男性', '多元性別', '女性'],
  datasets: {
    Today: [
      {
        data: [92.8, 6.1, 1.1],
        change: [-0.6, 0.7, 0.1]
      }
    ],
    Yesterday: [
      {
        data: [77.2, 8.4, 14.4],
        change: [-2.3, 0.3, -0.2]
      }
    ],
    'Last 7 days': [
      {
        data: [88.2, 9.2, 2.6],
        change: [1.9, -0.4, 0.3]
      }
    ],
    'Last 28 days': [
      {
        data: [65.2, 2.6, 32.2],
        change: [-12.6, -0.7, 4.2]
      }
    ],
    'Last 90 days': [
      {
        data: [93.5, 4.2, 2.3],
        change: [2.6, -0.7, 2.1]
      }
    ]
  }
};

function WidgetEducationPieChart() {
  const theme = useTheme();

  return (
    <FuseAnimate delay={600}>
      <Card className="w-full rounded-8 shadow-none border-none">
        <div className="p-16">
          <Typography className="h1 font-300">
            無作用報名 (will deprecated soon)
          </Typography>
        </div>
        <div className="h-224 relative">
          <Doughnut
            data={{
              labels: data.labels,
              datasets: data.datasets['Today'].map(obj => ({
                ...obj,
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
              }))
            }}
            options={{
              cutoutPercentage: 75,
              spanGaps: false,
              legend: {
                display: false
              },
              maintainAspectRatio: false
            }}
          />
        </div>

        <div className="p-16 flex flex-row items-center justify-center">
          {data.labels.map((label, index) => (
            <div key={label} className="px-16 flex flex-col items-center">
              <Typography className="h4" color="textSecondary">
                {label}
              </Typography>
              <Typography className="h2 font-300 py-8">
                {data.datasets['Today'][0].data[index]}%
              </Typography>

              <div className="flex flex-row items-center justify-center">
                {data.datasets['Today'][0].change[index] < 0 && (
                  <Icon className="text-18 pr-4 text-red">arrow_downward</Icon>
                )}

                {data.datasets['Today'][0].change[index] > 0 && (
                  <Icon className="text-18 pr-4 text-green">arrow_upward</Icon>
                )}
                <div className="h5">
                  {data.datasets['Today'][0].change[index]}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </FuseAnimate>
  );
}

export default WidgetEducationPieChart;
