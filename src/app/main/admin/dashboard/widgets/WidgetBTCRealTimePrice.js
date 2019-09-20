import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Icon, Typography } from '@material-ui/core';
import _ from 'lodash';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@material-ui/styles';
import moment from 'moment';

import LogoCryptoIcon from 'app/main/shared/LogoCryptoIcon';

const CONFIG_BASE = {
	chartType: 'line',
	datasets: [
		{
			label: 'Impression',
			data: [
				67000,
				54000,
				82000,
				57000,
				72000,
				57000,
				87000,
				72000,
				89000,
				98700,
				112000,
				136000,
				110000,
				149000,
				98000
			],
			fill: false
		}
	],
	labels: [
		'Jan 1',
		'Jan 2',
		'Jan 3',
		'Jan 4',
		'Jan 5',
		'Jan 6',
		'Jan 7',
		'Jan 8',
		'Jan 9',
		'Jan 10',
		'Jan 11',
		'Jan 12',
		'Jan 13',
		'Jan 14',
		'Jan 15'
	],
	options: {
		spanGaps: false,
		legend: {
			display: false
		},
		maintainAspectRatio: false,
		elements: {
			point: {
				radius: 2,
				borderWidth: 1,
				hoverRadius: 2,
				hoverBorderWidth: 1
			},
		},
		layout: {
			padding: {
				top: 24,
				left: 16,
				right: 16,
				bottom: 16
			}
		},
		scales: {
			xAxes: [
				{
					display: false
				}
			],
			yAxes: [
				{
					display: false,
					ticks: {
						// min: 100,
						// max: 500
					}
				}
			]
		}
	}
}

function WidgetBTCRealTimePrice(props) {
	const theme = useTheme();
	const BTC_HISTORY = useSelector(({ markets }) => markets.btc.pricesHistory);
	const BTC_REAL_PRICE = useSelector(({ markets }) => markets.btc.price);
	const BTC_PRICE_HISTORY = useSelector(({ markets }) => markets.btc.pricesHistory);
	const [ofTarget, setOfTarget] = useState(12);
	const [volumn, setVolumn] = useState(87000);
	const [cryptoData, setCryptoData] = useState(CONFIG_BASE);

	useEffect(() => {
		if (BTC_HISTORY.length) {
			const dataAddons = {
				datasets: [
					{ label: '價格', data: _.map(BTC_HISTORY, item => item.close), fill: false }
				],
				labels: _.map(BTC_HISTORY, (item) => moment.unix(item.time).format('HH:mm')),
			}

			setOfTarget((((BTC_REAL_PRICE / BTC_PRICE_HISTORY[0].close) - 1) * 100).toFixed(2));
			setVolumn(_.reduce(BTC_HISTORY, (sum, item) => sum += Number(item.volumefrom), 0).toFixed(2));

			setCryptoData(_.assign(CONFIG_BASE, dataAddons));
		}
	}, [BTC_HISTORY, BTC_PRICE_HISTORY, BTC_REAL_PRICE]);

	return (
		<Card className="w-full rounded-8 shadow-none border-transparent bg-transparent">

			<div className="p-16 pb-0 flex flex-row items-end flex-wrap">

				<div className="pr-16">
					<Typography className="h3 whitespace-no-wrap" color="textSecondary">
						<LogoCryptoIcon TYPE="BTC" className="text-white font-bold text-xl" />
						<b className="font-bold px-2"> / </b>
						<LogoCryptoIcon TYPE="USDT" />
					</Typography>
					<Typography className="text-36 font-300 leading-none mt-8">
						{Number(BTC_REAL_PRICE).toFixed(2)}
					</Typography>
				</div>

				<div className="py-4 text-16 flex flex-row items-center">
					{ofTarget > 1 ? (
						<Typography className="text-green flex flex-row items-center animated pulse">
							<Icon className="text-18 mr-8 text-green">
								trending_up
							</Icon>
							{Math.abs(ofTarget)} %
						</Typography>
					) : (
							<Typography className="text-red flex flex-row items-center">
								<Icon className="text-18 mr-8 text-red">
									trending_down
								</Icon>
								{Math.abs(ofTarget)} %
							</Typography>
						)}
				</div>

				<div className="py-4 text-16 flex flex-row items-center">
					<Typography className="ml-4 whitespace-no-wrap">
						成交量 : {volumn}
					</Typography>
				</div>

			</div>

			<div className="h-96 w-100-p">
				<Line
					data={{
						labels: cryptoData.labels,
						datasets: cryptoData.datasets.map(obj => ({
							...obj,
							borderColor: theme.palette.secondary.main
						}))
					}}
					options={cryptoData.options}
				/>
			</div>
		</Card>
	);
}

export default React.memo(WidgetBTCRealTimePrice);
