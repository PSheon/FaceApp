import React from 'react';
import { Typography, Card, Button } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@material-ui/styles';

const data = {
  chartType: 'line',
  datasets: {
    'yesterday': [
      {
        label: 'Visitors',
        data: [190, 300, 340, 220, 290, 390, 5500, 380, 410, 380, 320, 290],
        fill: 'start'
      },
      {
        label: 'Page views',
        data: [2200, 2900, 3900, 2500, 3800, 3200, 2900, 1900, 3000, 3400, 4100, 3800],
        fill: 'start'
      }
    ],
    'today': [
      {
        label: 'Visitors',
        data: [410, 380, 320, 290, 190, 390, 250, 380, 300, 340, 220, 290],
        fill: 'start'
      },
      {
        label: 'Page Views',
        data: [3000, 3400, 4100, 3800, 2200, 3200, 2900, 1900, 2900, 3900, 2500, 3800],
        fill: 'start'
      }
    ]
  },
  labels: ['12am', '2am', '4am', '6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'],
  options: {
    spanGaps: false,
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    tooltips: {
      position: 'nearest',
      mode: 'index',
      intersect: false
    },
    layout: {
      padding: {
        left: 24,
        right: 32
      }
    },
    elements: {
      point: {
        radius: 4,
        borderWidth: 2,
        hoverRadius: 4,
        hoverBorderWidth: 2
      }
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: 'rgba(0,0,0,0.54)'
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            tickMarkLength: 16
          },
          ticks: {
            stepSize: 1000
          }
        }
      ]
    },
    plugins: {
      filler: {
        propagate: false
      }
    }
  }
};

function WidgetAreaChart() {
  const theme = useTheme();

  return (
    <FuseAnimate delay={600}>
      <Card className="w-full rounded-8 shadow-none border-none">

        <div className="relative p-24 flex flex-row items-center justify-between">

          <div className="flex flex-col">
            <Typography className="h3 sm:h2">Visitors & Page views</Typography>
          </div>

          <div className="flex flex-row items-center">
            <Button
              className="py-8 px-12 rounded-12"
              size="small"
              disabled={false}
            >
              qw
            </Button>
            <Button
              className="py-8 px-12 rounded-12"
              size="small"
            >
              qw
            </Button>
          </div>
        </div>

        <Typography className="relative h-200 sm:h-320 sm:pb-16">
          <Line
            data={{
              labels: data.labels,
              datasets: data.datasets['yesterday'].map((obj, index) => {
                const palette = theme.palette[index === 0 ? 'primary' : 'secondary'];
                return {
                  ...obj,
                  borderColor: palette.main,
                  // TODO
                  // backgroundColor: palette.main,
                  backgroundColor: '#d0605e33',
                  pointBackgroundColor: palette.dark,
                  pointHoverBackgroundColor: palette.main,
                  pointBorderColor: palette.contrastText,
                  pointHoverBorderColor: palette.contrastText
                }
              })
            }}
            options={data.options}
          />
        </Typography>
      </Card>
    </FuseAnimate>
  )
}

export default WidgetAreaChart;
