import React, { useState } from 'react';
import { AppBar, Avatar, Card, Divider, Icon, Typography } from '@material-ui/core';
import { Radar } from 'react-chartjs-2';
import _ from '@lodash';

import { exchangeIconConverter } from 'app/utils';

// TODO Fix here
const BASE_DATA = {
	labels: ['損益率', '年損益率', '最大回撤'],
	datasets: {
		Today: [
			{
				data: [9.8, 6.1, 3.1],
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
	},
	options: {
		cutoutPercentage: 75,
		spanGaps: false,
		legend: {
			display: false
		},
		maintainAspectRatio: false
	},
	today: '12,540',
	change: {
		value: 321,
		percentage: 2.05
	}
};

const radarData = {
	labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
	datasets: [
		{
			label: 'My First dataset',
			backgroundColor: 'rgba(32, 190, 190, 0.2)',
			borderColor: 'rgba(32, 190, 190, 1)',
			pointBackgroundColor: 'rgba(92, 132, 241, 0.8)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(92, 132, 241, 1)',
			data: [65, 59, 90, 81, 56, 55, 40]
		}
	],
	options: {
		legend: {
			display: false,
		},
		cutoutPercentage: 75,
		maintainAspectRatio: false,
		scale: {
			ticks: {
				beginAtZero: true,
				fontColor: 'white', // labels such as 10, 20, etc
				showLabelBackdrop: false // hide square behind text
			},
			pointLabels: {
				fontColor: 'white' // labels around the edge like 'Running'
			},
			gridLines: {
				color: 'rgba(255, 255, 255, 0.2)'
			},
			angleLines: {
				color: 'white' // lines radiating from the center
			}
		}
	}
};

function WidgetStrategyCard(props) {
	// eslint-disable-next-line
	const [dataset, setDataset] = useState('Today');
	// const data = _.merge({}, props.data);
	const data = _.merge({}, BASE_DATA);

	return (
		<Card className="w-full rounded-8 shadow-none">

			<AppBar position="static">
				<div className="p-16 pr-4 flex flex-row items-center justify-between">

					<div className="pr-16">
						<Typography className="h1 font-300" color="inherit">Bull & Bear</Typography>
						<Typography className="h5" color="inherit">Lifetime sum of your sales</Typography>
					</div>

					<div className="mr-12">
						<Avatar aria-label="Recipe" src={exchangeIconConverter('binance')} />
					</div>
				</div>
				<div className="p-16 pt-8 flex flex-row justify-between items-end">
					<Typography className="text-48 font-300 leading-none" color="inherit">{data.today}</Typography>
					<div className="flex flex-row items-center">
						{data.change.value > 0 && (
							<Icon className="text-green">trending_up</Icon>
						)}
						{data.change.value < 0 && (
							<Icon className="text-red">trending_down</Icon>
						)}
						<div className="ml-8">
							{data.change.value}
							({data.change.percentage}%)
							</div>
					</div>
				</div>
			</AppBar>

			<div className="h-224 relative pt-20 pb-12">
				<Radar data={radarData} options={radarData.options} />
			</div>

			<Divider className="mx-16" />

			<div className="p-16 flex flex-row items-center justify-center">
				{data.labels.map((label, index) => (
					<div key={label} className="px-16 flex flex-col items-center">

						<Typography className="h4 whitespace-no-wrap" color="textSecondary">{label}</Typography>
						<Typography className="h2 font-300 py-8 whitespace-no-wrap">{data.datasets[dataset][0].data[index]}%</Typography>

						<div className="flex flex-row items-center justify-center">

							{data.datasets[dataset][0].change[index] < 0 && (
								<Icon className="text-18 pr-4 text-red">
									arrow_downward
								</Icon>
							)}

							{data.datasets[dataset][0].change[index] > 0 && (
								<Icon className="text-18 pr-4 text-green">
									arrow_upward
								</Icon>
							)}
							<div className="h5">
								{data.datasets[dataset][0].change[index]}%
							</div>
						</div>
					</div>
				))}
			</div>
		</Card>
	);
}

export default React.memo(WidgetStrategyCard);
