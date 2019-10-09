import React, { useEffect, useMemo, useState } from 'react';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Icon, Input, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FuseUtils, FuseAnimate, FuseAnimateGroup } from '@fuse';
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

function FaqPage() {
	const classes = useStyles();
	const [filteredData, setFilteredData] = useState([]);
	const [expanded, setExpanded] = useState(null);
	const [searchText, setSearchText] = useState('');
	const data = [
		{
			'id': '1',
			'question': 'YS 的活動或服務需要費用嗎？',
			'answer': 'YS 的服務都是免費的喔！歡迎青年朋友多多利用這裡的好資源。'
		},
		{
			'id': '2',
			'question': '超過30歲就不能參加活動嗎？',
			'answer': '青年職涯發展中心 (YS) 所辦理之活動均以協助青年職涯發展為目標，故以15-29歲青年優先參加，若為大型活動有增加名額，將會開放一般民眾參與。'
		},
		{
			'id': '3',
			'question': '我要怎麼知道活動是否報名成功？',
			'answer': '會在活動前幾天以簡訊或電話通知，如活動前一天未收到通知請來電洽詢。'
		},
		{
			'id': '4',
			'question': '報名還沒收到簡訊怎麼辦？',
			'answer': 'YS 活動報名成功會以簡訊通知，若一直未收到簡訊，可能是手機有設定擋企業簡訊，請至該電信公司解除擋企業簡訊服務。'
		},
		{
			'id': '5',
			'question': 'YS 在那裡？',
			'answer': '搭捷運至捷運中央公園站 (R9 站) 下車--2 號出口出站，往前走至五福三路右轉，約250公尺到達。'
		},
		{
			'id': '6',
			'question': '我對未來的方向不清楚該怎麼辦？',
			'answer': '您可以參加職涯探索團體，或預約職涯諮詢，透過諮詢師的引導，規劃屬於自己的職涯方向。'
		},
		{
			'id': '7',
			'question': 'YS有好多圖書、雜誌可以外借嗎？',
			'answer': '歡迎青年朋友來YS閱讀書報雜誌，但不提供外借哦！'
		},
		{
			'id': '8',
			'question': 'YS的上班時間是什麼時候？',
			'answer': '除了週一及國定假日固定休館，YS天天為南部的青年朋友們服務唷！'
		},
		{
			'id': '9',
			'question': 'YS有什麼活動可以參加呢？',
			'answer': '每個月都會有職涯活動、職涯教練、駐點諮詢、探索團體等相關活動，歡迎上網報名！'
		},
	]

	useEffect(() => {
		function getFilteredArray(arr, searchText) {
			if (searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, searchText);
		}

		setFilteredData(getFilteredArray(data, searchText));
	}, [data, searchText]);

	const toggleExpansion = panel => (event, expanded) => {
		setExpanded(expanded ? panel : false);
	};

	function handleSearch(event) {
		setSearchText(event.target.value);
	}

	return (
		<div className="flex flex-col flex-auto flex-shrink-0 w-full">

			<div className={clsx(classes.header, "flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-360")}>

				<FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
					<Typography color="inherit" className="text-36 sm:text-56 font-light">
						我們在這裡提供協助
					</Typography>
				</FuseAnimate>

				<FuseAnimate duration={400} delay={600}>
					<Typography variant="subtitle1" color="inherit" className="opacity-75 mt-8 sm:mt-16 mx-auto max-w-512">
						常見 Q & A
					</Typography>
				</FuseAnimate>

				<Paper className={"flex items-center h-56 w-full max-w-md mt-16 sm:mt-32 rounded-full"} elevation={1}>
					<Icon color="action" className="ml-16">search</Icon>
					<Input
						placeholder="尋找問題..."
						className="px-16"
						disableUnderline
						fullWidth
						inputProps={{
							'aria-label': '尋找問題'
						}}
						value={searchText}
						onChange={handleSearch}
					/>
				</Paper>
			</div>

			<div className="flex flex-col flex-1 flex-shrink-0 max-w-xl w-full mx-auto px-16 sm:px-24 py-24 sm:py-32">
				{
					(filteredData.length === 0) && (
						<div className="flex flex-auto items-center justify-center w-full h-full">
							<Typography color="textSecondary" variant="h5">
								請聯絡專員提供解答
							</Typography>
						</div>
					)
				}
				<FuseAnimateGroup
					enter={{
						animation: "transition.slideUpBigIn"
					}}
				>
					{useMemo(() => {
						return filteredData.map((faq) => (

							<ExpansionPanel
								classes={{
									root: classes.panel,
									expanded: classes.expanded
								}}
								key={faq.id}
								expanded={expanded === faq.id}
								onChange={toggleExpansion(faq.id)}
								elevation={0}
							>

								<ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
									<div className="flex items-center">
										<Icon className="mr-8" color="action">help_outline</Icon>
										<Typography className="text-24">{faq.question}</Typography>
									</div>
								</ExpansionPanelSummary>

								<ExpansionPanelDetails>
									<Typography className="text-20">{faq.answer}</Typography>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						))
					}, [filteredData, classes, expanded])}
				</FuseAnimateGroup>

			</div>
		</div>
	);
}

export default FaqPage;
