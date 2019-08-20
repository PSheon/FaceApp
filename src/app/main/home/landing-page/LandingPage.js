import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { useDispatch } from 'react-redux';

import * as Actions from 'app/store/actions';
import WidgetCarouselSection from './widgets/WidgetCarouselCard';
import SectionNews from './sections/SectionNews';

function LandingPage() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(Actions.syncHomePageCarousels());
	}, [dispatch]);

	return (
		<div className="w-full">

			<WidgetCarouselSection />

			<FuseAnimate animation="transition.slideUpIn" delay={200}>

				<div className="flex flex-col md:flex-row sm:p-8 container">

					<div className="flex flex-1 flex-col min-w-0">
						{/* YS News */}
						<FuseAnimate delay={600}>
							<Typography className="p-16 pb-8 text-18 font-600 flex justify-between">
								YS 新聞快訊
								<Link to="/news-list" className="px-12 text-black" role="button">更多新聞</Link>
							</Typography>
						</FuseAnimate>
						<div className="flex flex-col sm:flex sm:flex-row pb-32">
							<SectionNews />
						</div>

						{/* YS Events */}
						<FuseAnimate delay={600}>
							<Typography className="p-16 pb-8 text-18 font-600 flex justify-between">
								最新活動預告
								<Link to="/news" className="px-12 text-black" role="button">更多活動</Link>
							</Typography>
						</FuseAnimate>
						<div className="flex flex-col sm:flex sm:flex-row pb-32">
							123
						</div>

						{/* YS Events */}
						<FuseAnimate delay={600}>
							<Typography className="p-16 pb-8 text-18 font-600">
								最近活動
							</Typography>
						</FuseAnimate>
						<div className="widget w-full p-16 pb-32">
							123
						</div>
					</div>

					<div className="flex flex-wrap w-full md:w-320 pt-16">
						{/* YS Events */}
						<div className="mb-32 w-full sm:w-1/2 md:w-full">
							<FuseAnimate delay={600}>
								<Typography className="p-16 pb-8 text-18 font-600 flex justify-between">
									最新活動預告
								</Typography>
							</FuseAnimate>
							<div className="widget w-full p-16">
								456456
							</div>
						</div>

						{/* YS XXXX */}
						<div className="mb-32 w-full sm:w-1/2 md:w-full">
							<FuseAnimate delay={600}>
								<div className="px-16 pb-8 text-18 font-300">
									How are your sales?
								</div>
							</FuseAnimate>
							<div className="widget w-full p-16">
								456456456456
							</div>
						</div>

						{/* YS XXXX */}
						<div className="mb-32 w-full sm:w-1/2 md:w-full">
							<FuseAnimate delay={600}>
								<Typography className="px-16 pb-8 text-18 font-300 lg:pt-0">
									What are your top campaigns?
								</Typography>
							</FuseAnimate>
							<div className="widget w-full p-16">
								sddfkngnjkfdn
							</div>
						</div>
					</div>
				</div>
			</FuseAnimate>
		</div>
	)
}

export default LandingPage;
