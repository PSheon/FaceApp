import React, { useState, useEffect } from 'react';
import {
  Select,
  Card,
  FormControl,
  MenuItem,
  Typography
} from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from '@material-ui/styles';

import LoadingSpinnerOverlay from 'app/main/shared/LoadingSpinnerOverlay';

const labels = ['國中', '高中', '大專', '大學', '研究所', '未提供'];
const DEFAULT_EMPLOYMENT_STATUS_DATASETS = {
  verified: [
    {
      data: [50, 50, 50, 50, 50, 50, 50]
    }
  ]
};

function WidgetEmploymentStatusChart() {
  const theme = useTheme();
  const EMPLOYMENT_STATUS_STASTIC = useSelector(
    ({ adminDashboard }) => adminDashboard.employmentStatusStastic
  );
  const verifiedEmploymentStatusStastic = EMPLOYMENT_STATUS_STASTIC['verified'];
  const chartLoading = EMPLOYMENT_STATUS_STASTIC['loading'];

  const [datasetId, setDatasetId] = useState('verified');
  const [isLoading, setIsLoading] = useState(true);
  const [chartDatasets, setChartDatasets] = useState(
    DEFAULT_EMPLOYMENT_STATUS_DATASETS
  );

  useEffect(() => {
    if (verifiedEmploymentStatusStastic.length) {
      setChartDatasets({
        verified: verifiedEmploymentStatusStastic
      });
      setIsLoading(false);
    }
  }, [EMPLOYMENT_STATUS_STASTIC, verifiedEmploymentStatusStastic]);

  return (
    <FuseAnimate delay={600}>
      <Card className="w-full rounded-12 shadow-md hover:shadow-lg border-none relative min-h-128">
        {isLoading || chartLoading ? (
          <LoadingSpinnerOverlay width={64} height={64} />
        ) : (
          <React.Fragment>
            <div className="p-16 flex flex-row items-center justify-between">
              <Typography className="h1 font-300">目前身分分布</Typography>

              <FormControl>
                <Select
                  value={datasetId}
                  onChange={ev => setDatasetId(ev.target.value)}
                >
                  <MenuItem value="verified">已驗證</MenuItem>
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
              {labels.slice(0, 5).map((label, index) => (
                <div key={label} className="px-16 flex flex-col items-center">
                  <Typography className="h4" color="textSecondary">
                    {label}
                  </Typography>
                  <Typography className="h2 font-300 py-8">
                    {chartDatasets[datasetId][0].data[index]}
                  </Typography>
                </div>
              ))}
            </div>
          </React.Fragment>
        )}
      </Card>
    </FuseAnimate>
  );
}

export default WidgetEmploymentStatusChart;
