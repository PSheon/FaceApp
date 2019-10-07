import React, { useState, useEffect } from 'react';
import { Typography, Card, Button } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@material-ui/styles';

import { applicantEducationExtractor } from 'app/utils';
import LoadingSpinnerOverlay from 'app/main/shared/LoadingSpinnerOverlay';

const labels = ['國中', '高中', '專科', '大學', '研究所'];
const DEFAULT_EDUCATION_DATASETS = {
  活動參與者: [
    {
      label: '男性',
      data: [190, 300, 340, 220, 290],
      fill: 'start'
    },
    {
      label: '多元性別',
      data: [190, 300, 340, 220, 290],
      fill: 'start'
    },
    {
      label: '女性',
      data: [2200, 2900, 3900, 2500, 3800],
      fill: 'start'
    }
  ],
  所有報名者: [
    {
      label: '男性',
      data: [410, 380, 320, 290, 190],
      fill: 'start'
    },
    {
      label: '多元性別',
      data: [190, 300, 340, 220, 290],
      fill: 'start'
    },
    {
      label: '女性',
      data: [3000, 3400, 4100, 3800, 2200],
      fill: 'start'
    }
  ]
};
function WidgetEducationAreaChart(props) {
  const EVENT_ACTIVITY_LOGS = props.EVENT_ACTIVITY_LOGS;
  const theme = useTheme();
  const paletteSet = {
    男性: theme.palette['primary'],
    多元性別: theme.palette['secondary'],
    女性: theme.palette['tertiary']
  };

  const [datasetId, setDatasetId] = useState('活動參與者');
  const [isLoading, setIsLoading] = useState(true);
  const [chartDatasets, setChartDatasets] = useState(
    DEFAULT_EDUCATION_DATASETS
  );

  useEffect(() => {
    setChartDatasets(applicantEducationExtractor(EVENT_ACTIVITY_LOGS));
    setIsLoading(false);
  }, [EVENT_ACTIVITY_LOGS]);

  return (
    <FuseAnimate delay={600}>
      <Card className="w-full rounded-8 shadow-none border-none relative">
        {isLoading && <LoadingSpinnerOverlay width={64} height={64} />}

        <div className="relative p-24 flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <Typography className="h3 sm:h2">學歷分布</Typography>
          </div>

          <div className="flex flex-row items-center">
            <Button
              className="py-8 px-12 rounded-12"
              size="small"
              onClick={() => setDatasetId('活動參與者')}
              disabled={datasetId === '活動參與者'}
            >
              活動參與者
            </Button>
            <Button
              className="py-8 px-12 rounded-12"
              size="small"
              onClick={() => setDatasetId('所有報名者')}
              disabled={datasetId === '所有報名者'}
            >
              所有報名者
            </Button>
          </div>
        </div>

        <Typography className="relative h-200 sm:h-320 sm:pb-16">
          <Line
            data={{
              labels,
              datasets: [
                {
                  label: chartDatasets[datasetId][0].label,
                  data: chartDatasets[datasetId][0].data,
                  fill: 'start',
                  borderColor: paletteSet['男性'].main,
                  backgroundColor: paletteSet['男性'].opacity,
                  pointBackgroundColor: paletteSet['男性'].dark,
                  pointHoverBackgroundColor: paletteSet['男性'].main,
                  pointBorderColor: paletteSet['男性'].contrastText,
                  pointHoverBorderColor: paletteSet['男性'].contrastText
                },
                {
                  label: chartDatasets[datasetId][1].label,
                  data: chartDatasets[datasetId][1].data,
                  fill: 'start',
                  borderColor: paletteSet['多元性別'].main,
                  backgroundColor: paletteSet['多元性別'].opacity,
                  pointBackgroundColor: paletteSet['多元性別'].dark,
                  pointHoverBackgroundColor: paletteSet['多元性別'].main,
                  pointBorderColor: paletteSet['多元性別'].contrastText,
                  pointHoverBorderColor: paletteSet['多元性別'].contrastText
                },
                {
                  label: chartDatasets[datasetId][2].label,
                  data: chartDatasets[datasetId][2].data,
                  fill: 'start',
                  borderColor: paletteSet['女性'].main,
                  backgroundColor: paletteSet['女性'].opacity,
                  pointBackgroundColor: paletteSet['女性'].dark,
                  pointHoverBackgroundColor: paletteSet['女性'].main,
                  pointBorderColor: paletteSet['女性'].contrastText,
                  pointHoverBorderColor: paletteSet['女性'].contrastText
                }
              ]
            }}
            options={{
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
            }}
          />
        </Typography>
      </Card>
    </FuseAnimate>
  );
}

export default WidgetEducationAreaChart;
