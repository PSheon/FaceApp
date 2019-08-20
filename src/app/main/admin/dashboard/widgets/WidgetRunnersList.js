import React from 'react';
import { useSelector } from 'react-redux';
import { Icon, Table, TableHead, TableCell, TableRow, Typography, Paper, TableBody } from '@material-ui/core';
import clsx from 'clsx';
import moment from 'moment';
import humanizeDuration from "humanize-duration";

function WidgetRunnersList(props) {
	const processRunnersList = useSelector(({ processes }) => processes.runners)

	// TODO:: 新增個別操作
	// console.log('processRunnersList ', processRunnersList)

	function renderStatusIcon(status) {
		switch (status) {
			case 'stopping':
			case 'launching':
			case 'one-launch-status':
				return (
					<div className="flex items-center">
						<div className="px-2 bg-orange items-center text-indigo-100 leading-none rounded-full flex lg:inline-flex whitespace-no-wrap" role="alert">
							<Icon className="text-white pr-10">update</Icon>
							<Typography className="font-semibold mr-2 text-left flex-auto">更新狀態中</Typography>
						</div>
					</div>
				)
			case 'stopped':
			case 'errored':
				return (
					<div className="flex items-center">
						<div className="px-2 bg-red items-center text-indigo-100 leading-none rounded-full flex lg:inline-flex whitespace-no-wrap" role="alert">
							<Icon className="text-white pr-10">close</Icon>
							<Typography className="font-semibold mr-2 text-left flex-auto">關閉中</Typography>
						</div>
					</div>
				)
			case 'online”':
			default:
				return (
					<div className="flex items-center">
						<div className="px-2 bg-green items-center text-indigo-100 leading-none rounded-full flex lg:inline-flex whitespace-no-wrap" role="alert">
							<Icon className="text-white pr-10">check</Icon>
							<Typography className="font-semibold mr-2 text-left flex-auto">工作中</Typography>
						</div>
					</div>
				)
		}
	}

	return (
		<Paper className="w-full rounded-8 shadow-none">
			<div className="flex items-center justify-between px-16 h-64 border-b-1">
				<Typography className="text-16">機器人列表</Typography>
				<Typography className="text-11 font-500 rounded-12 text-white bg-blue px-8 py-4">{processRunnersList.length + " 機器人"}</Typography>
			</div>
			<div className="table-responsive">
				<Table className="w-full min-w-full">
					<TableHead>
						<TableRow>
							<TableCell className="whitespace-no-wrap text-center">
								<div className="flex justify-center items-center">
									運行狀態
									<Icon className="text-14 ml-4">adjust</Icon>
								</div>
							</TableCell>
							<TableCell className="whitespace-no-wrap text-center">
								<div className="flex justify-center items-center">
									名稱
									<Icon className="text-14 ml-4">all_inbox</Icon>
								</div>
							</TableCell>
							<TableCell className="whitespace-no-wrap text-center">
								<div className="flex justify-center items-center">
									CPU
									<Icon className="text-14 ml-4">settings_backup_restore</Icon>
								</div>
							</TableCell>
							<TableCell className="whitespace-no-wrap text-center">
								<div className="flex justify-center items-center">
									記憶體
									<Icon className="text-14 ml-4">memory</Icon>
								</div>
							</TableCell>
							<TableCell className="whitespace-no-wrap text-center">
								<div className="flex justify-center items-center">
									重啟次數
									<Icon className="text-14 ml-4">cached</Icon>
								</div>
							</TableCell>
							<TableCell className="whitespace-no-wrap text-center">
								<div className="flex justify-center items-center">
									運行時間
									<Icon className="text-14 ml-4">access_alarms</Icon>
								</div>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							processRunnersList.map((row, i) => (
								<TableRow key={i}>
									<TableCell
										component="th"
										scope="row"
										align="center"
									>
										{renderStatusIcon(row.status)}
									</TableCell>
									<TableCell
										component="th"
										scope="row"
										align="center"
									>
										<Typography className={clsx("inline text-11 font-600 px-8 py-4 rounded-4 text-lg whitespace-no-wrap")}>
											{row.name}
										</Typography>
									</TableCell>
									<TableCell
										component="th"
										scope="row"
										align="center"
									>
										<Typography className={clsx("inline text-11 font-600 px-8 py-4 rounded-4 text-lg whitespace-no-wrap")}>
											{row.cpu} %
										</Typography>
									</TableCell>
									<TableCell
										component="th"
										scope="row"
										align="center"
									>
										<Typography className={clsx("inline text-11 font-600 px-8 py-4 rounded-4 text-lg whitespace-no-wrap")}>
											{`${(row.memory / 1000000).toFixed(1)} MB`}
										</Typography>
									</TableCell>
									<TableCell
										component="th"
										scope="row"
										align="center"
									>
										<Typography className={clsx("inline text-11 font-600 px-8 py-4 rounded-4 text-lg whitespace-no-wrap")}>
											{row.restarts}
										</Typography>
									</TableCell>
									<TableCell
										component="th"
										scope="row"
										align="center"
									>
										<Typography className={clsx("inline text-11 font-600 px-8 py-4 rounded-4 text-lg whitespace-no-wrap")}>
											{
												humanizeDuration(
													moment().diff(moment(row.uptime)),
													{ largest: 2, language: 'zh_TW', round: true }
												)
											}
										</Typography>
									</TableCell>
								</TableRow>
							))
						}
					</TableBody>
				</Table>
			</div>
		</Paper>
	);
}

export default React.memo(WidgetRunnersList);
