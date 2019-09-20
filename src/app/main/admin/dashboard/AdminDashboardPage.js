import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { useDispatch } from 'react-redux';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { useTheme } from '@material-ui/styles';

import * as Actions from 'app/store/actions';
import WidgetNewRegisteredUserHistory from './widgets/WidgetNewRegisteredUserHistory';
// import WidgetBTCRealTimePrice from './widgets/WidgetBTCRealTimePrice';
// import WidgetETHRealTimePrice from './widgets/WidgetETHRealTimePrice';
// import WidgetLTCRealTimePrice from './widgets/WidgetLTCRealTimePrice';
// import WidgetMaps from './widgets/WidgetMaps';
// import WidgetStrategyCard from './widgets/WidgetStrategyCard';
// import WidgetUserRanking from './widgets/WidgetUserRanking';
// import WidgetNews from './widgets/WidgetNews';
// import LoadingSpinner from 'app/main/shared/LoadingSpinner';

function AdminDashboardPage() {
	const dispatch = useDispatch();
	// const theme = useTheme();
	// const isNarrowView = useMediaQuery(theme.breakpoints.down('md'));
	// const articles = useSelector(({ markets }) => isNarrowView ? markets.news.slice(0, 2) : markets.news.slice(0, 3));

	useEffect(() => {
		// dispatch(Actions.syncCryptoNews());
		// dispatch(Actions.syncCryptoMapLabels());
		dispatch(Actions.syncAdminDashboardNewRegisteredUser());
	}, [dispatch]);

	// if (!articles) {
	// 	return (
	// 		<div className="w-full h-full flex justify-center items-center">
	// 			<LoadingSpinner width={200} height={200} />
	// 		</div>
	// 	);
	// }

	return (
		<div className="w-full">

			<WidgetNewRegisteredUserHistory />

			<FuseAnimate animation="transition.slideUpIn" delay={200}>

				<div className="flex flex-col md:flex-row sm:p-8 container">

					<div className="flex flex-1 flex-col min-w-0 order-last md:order-first">

						<FuseAnimate delay={600}>
							<Typography className="p-16 pb-8 text-18 font-600">
								即時價格
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

					<div className="flex flex-wrap w-full md:w-320 pt-16">

						<div className="mb-32 w-full sm:w-1/2 md:w-full">
							<FuseAnimate delay={600}>
								<Typography className="px-16 pb-8 text-18 font-600">
									頂尖積極策略
								</Typography>
							</FuseAnimate>

							<div className="widget w-full p-16">
								{/* <WidgetStrategyCard /> */}
								asdasd
							</div>
						</div>

						<div className="mb-32 w-full sm:w-1/2 md:w-full">

							<FuseAnimate delay={600}>
								<div className="px-16 pb-8 text-18 font-600">
									頂尖保守策略
								</div>
							</FuseAnimate>

							<div className="widget w-full p-16">
								{/* <WidgetStrategyCard /> */}
								asdasd
							</div>
						</div>

						<div className="mb-32 w-full sm:w-1/2 md:w-full hidden md:block">
							<FuseAnimate delay={600}>
								<Typography className="px-16 pb-8 text-18 font-600 lg:pt-0">
									本月排行榜
								</Typography>
							</FuseAnimate>
							<div className="widget w-full p-16">
								{/* <WidgetUserRanking /> */}
								asdasd
							</div>
						</div>
					</div>
				</div>
			</FuseAnimate>

			{/* YS Information */}
			<FuseAnimate delay={600}>
				<div className="container">
					<Typography className="p-16 pb-8 text-18 font-600 flex justify-between">
						職場情報站
						<Link to="/information-list" className="px-12 text-black" role="button">更多情報</Link>
					</Typography>
					<div className="flex flex-col sm:flex sm:flex-row">
						asdasd
						{/* <SectionInformation /> */}
					</div>
				</div>
			</FuseAnimate>

		</div>
	)
}

export default AdminDashboardPage;
