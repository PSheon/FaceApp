import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { useDispatch } from 'react-redux';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { useTheme } from '@material-ui/styles';

import * as Actions from 'app/store/actions';
import WidgetNewRegisteredUserHistory from './widgets/WidgetNewRegisteredUserHistory';
import WidgetGenderChart from './widgets/WidgetGenderChart';
import WidgetEmploymentStatusChart from './widgets/WidgetEmploymentStatusChart';
import WidgetAgePeriodChart from './widgets/WidgetAgePeriodChart';
import WidgetEducationChart from './widgets/WidgetEducationChart';
import WidgetHeardFromChart from './widgets/WidgetHeardFromChart';

function AdminDashboardPage() {
  const dispatch = useDispatch();
  // const theme = useTheme();
  // const isNarrowView = useMediaQuery(theme.breakpoints.down('md'));
  // const articles = useSelector(({ markets }) => isNarrowView ? markets.news.slice(0, 2) : markets.news.slice(0, 3));

  useEffect(() => {
    // dispatch(Actions.syncCryptoNews());
    // dispatch(Actions.syncCryptoMapLabels());
    dispatch(Actions.syncAdminDashboardNewRegisteredUser());
    dispatch(Actions.syncAdminDashboardGenderStatistic());
    dispatch(Actions.syncAdminDashboardEmploymentStatusStatistic());
    dispatch(Actions.syncAdminDashboardAgePeriodStatistic());
    dispatch(Actions.syncAdminDashboardEducationStatistic());
    dispatch(Actions.syncAdminDashboardHeardFromStatistic());
  }, [dispatch]);

  return (
    <div className="w-full">
      <WidgetNewRegisteredUserHistory />

      <FuseAnimate animation="transition.slideUpIn" delay={200}>
        <div className="flex flex-col md:flex-row sm:p-8 container">
          <div className="flex flex-1 flex-col min-w-0 order-last md:order-first">
            <FuseAnimate delay={600}>
              <Typography className="p-16 pb-8 text-18 font-600">
                網站統計
              </Typography>
            </FuseAnimate>

            {/* Real-time Price */}
            {/* <div className="flex flex-col sm:flex sm:flex-row pb-32">

							<div className="widget flex w-full sm:w-1/3 p-16">
								<WidgetBTCRealTimePrice />
							</div>

							<div className="widget flex w-full sm:w-1/3 p-16">
								<WidgetETHRealTimePrice />
							</div>

							<div className="widget w-full sm:w-1/3 p-16">
								<WidgetLTCRealTimePrice />
							</div>
						</div> */}

            {/* Latest News */}
            {/* <FuseAnimate delay={600}>
							<Typography className="px-16 pb-8 text-18 font-600 flex justify-between">
								最新幣圈新聞
								<Link to="/news" className="px-12 text-white" role="button">更多新聞</Link>
							</Typography>
						</FuseAnimate>

						<div className="flex flex-col sm:flex sm:flex-row pb-32">

							{articles.length ? articles.map((article, i) => (
								<div className="widget flex w-full sm:w-1/2 lg:w-1/3 p-16" key={i}>
									<WidgetNews article={article} />
								</div>
							)) : (
									<div className="w-full flex justify-center items-center">
										<LoadingSpinner width={200} height={200} />
									</div>
								)}
						</div> */}

            <FuseAnimate delay={600}>
              <Typography className="px-16 pb-8 text-18 font-600">
                可以使用虛擬貨幣的地點
              </Typography>
            </FuseAnimate>

            <div className="widget w-full p-16 pb-32">
              {/* <WidgetMaps /> */}
              asdasd
            </div>
          </div>

          <div className="flex flex-wrap w-full md:w-400 pt-16">
            <div className="mb-32 w-full sm:w-1/2 md:w-full">
              <FuseAnimate delay={600}>
                <Typography className="px-16 pb-8 text-18 font-600">
                  性別統計
                </Typography>
              </FuseAnimate>

              <div className="widget w-full p-16">
                <WidgetGenderChart />
              </div>
            </div>

            <div className="mb-32 w-full sm:w-1/2 md:w-full">
              <FuseAnimate delay={600}>
                <Typography className="px-16 pb-8 text-18 font-600">
                  目前身分統計
                </Typography>
              </FuseAnimate>

              <div className="widget w-full p-16">
                <WidgetEmploymentStatusChart />
              </div>
            </div>
          </div>
        </div>
      </FuseAnimate>

      {/* YS Information */}
      <FuseAnimate delay={600}>
        <div className="container">
          {/* <Typography className="p-16 pb-8 text-18 font-600 flex justify-between">
            會員統計
          </Typography> */}
          <div className="flex flex-col sm:flex sm:flex-row">
            {/* 年齡區間統計 */}
            <div className="mb-32 w-full sm:w-1/3 md:w-full">
              <FuseAnimate delay={600}>
                <Typography className="px-16 pb-8 text-18 font-600 lg:pt-0">
                  年齡區間統計
                </Typography>
              </FuseAnimate>
              <div className="widget w-full p-16">
                <WidgetAgePeriodChart />
              </div>
            </div>

            {/* 學歷統計 */}
            <div className="mb-32 w-full sm:w-1/3 md:w-full">
              <FuseAnimate delay={600}>
                <Typography className="px-16 pb-8 text-18 font-600 lg:pt-0">
                  學歷統計
                </Typography>
              </FuseAnimate>
              <div className="widget w-full p-16">
                <WidgetEducationChart />
              </div>
            </div>

            {/* 得知本站方式統計分析  */}
            <div className="mb-32 w-full sm:w-1/3 md:w-full">
              <FuseAnimate delay={600}>
                <Typography className="px-16 pb-8 text-18 font-600 lg:pt-0">
                  得知本站管道統計
                </Typography>
              </FuseAnimate>
              <div className="widget w-full p-16">
                <WidgetHeardFromChart />
              </div>
            </div>
          </div>
        </div>
      </FuseAnimate>
    </div>
  );
}

export default AdminDashboardPage;
