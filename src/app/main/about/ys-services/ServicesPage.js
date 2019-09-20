import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate, FuseAnimateGroup } from '@fuse';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	header: {
		background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
		color: theme.palette.primary.contrastText
	},
	panel: {
		margin: 0,
		borderWidth: '1px 1px 0 1px',
		borderStyle: 'solid',
		borderColor: theme.palette.divider,
		'&:first-child': {
			borderRadius: '16px 16px 0 0'
		},
		'&:last-child': {
			borderRadius: '0 0 16px 16px',
			borderWidth: '0 1px 1px 1px'
		},
		'&$expanded': {
			margin: 'auto',
		},
	},
	expanded: {}
}));

function ServicesPage() {
	const classes = useStyles();

	return (
		<div className="w-full flex flex-col flex-auto">

			<div className={clsx(classes.header, "flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-400 sm:h-360")}>

				<FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
					<Typography color="inherit" className="text-36 sm:text-56 font-light">
						成立宗旨
					</Typography>
				</FuseAnimate>

				<FuseAnimate duration={400} delay={600}>
					<Typography variant="subtitle1" color="inherit" className="opacity-75 mt-8 sm:mt-16 mx-auto max-w-512 whitespace-pre-line">
						勞動部勞動力發展署高屏澎東分署設立「青年職涯發展中心(Youth Salon,YS)」以全人全職涯的觀點
						提供專屬於青年朋友的「職涯探索」、「職業訓練」、「就(創)業資訊」等多面向內容
						透過團體講座課程、或個別職涯諮詢服務，讓青年朋友們用行動打造自我品牌，成就夢想！
					</Typography>
				</FuseAnimate>
			</div>

			<div className="flex flex-col flex-1 flex-shrink-0 max-w-xl w-full mx-auto px-16 sm:px-24 py-24 sm:py-32">
				<FuseAnimateGroup
					enter={{
						animation: "transition.slideUpBigIn"
					}}
				>
					<img className="object-cover object-center w-full" src="https://ys.nat.gov.tw/img/about-info0.jpg" alt="ys goal" />

					<Typography variant="h5" color="inherit" className="opacity-75 mt-8 sm:mt-16 mb-12">
						服務目標
					</Typography>
					<Typography variant="subtitle1">
						YS 希望經由各項活動與服務，協助青年朋友打造專屬的個人品牌與形象。
					</Typography>

					<Typography variant="h5" color="inherit" className="opacity-75 mt-8 sm:mt-16 mb-12">
						服務內容
					</Typography>

					<div className="flex flex-wrap justify-center items-center">
						<div className="w-1/2 sm:w-1/3">
							協助職涯定位
						</div>
						<div className="w-1/2 sm:w-1/3">
							加強職場認識
						</div>
						<div className="w-1/2 sm:w-1/3">
							增進求職技巧
						</div>
						<div className="w-1/2 sm:w-1/3">
							提升職場續航力
						</div>
						<div className="w-1/2 sm:w-1/3">
							個人品牌
						</div>
						<div className="w-1/2 sm:w-1/3">
							增加求職動力
						</div>
					</div>
				</FuseAnimateGroup>

			</div>
		</div>
	);
}

export default ServicesPage;
