import React from 'react';
import { Icon, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate, FuseAnimateGroup } from '@fuse';
import clsx from 'clsx';

import YSMap from 'app/main/shared/YSMap';

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

function ContactUsPage() {
	const classes = useStyles();

	return (
		<div className="flex flex-col flex-auto flex-shrink-0 w-full">

			<FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
				<div className={clsx(classes.header, "h-200 sm:h-360")}>
					<YSMap />
				</div>
			</FuseAnimate>

			<div className="flex flex-col flex-1 flex-shrink-0 max-w-xl w-full mx-auto px-16 sm:px-24 py-24 sm:py-32">
				<FuseAnimateGroup
					enter={{
						animation: "transition.slideUpBigIn"
					}}
				>
					{/* 聯絡資訊 */}
					<div className="flex flex-col justify-center items-baseline">
						<Typography variant="h3">聯絡資訊</Typography>

						<Divider className="my-12 w-full" />

						<table className="simple">
							<tbody>
								<tr>
									<td>
										<Icon className="mr-8">location_on</Icon> 地址
									</td>
									<td className="text-left">
										<Typography variant="subtitle1" className="flex items-center font-semibold">
											高雄市前金區五福三路21號
											<br />
											(東南水泥大樓8樓)
										</Typography>
									</td>
								</tr>
								<tr>
									<td>
										<Icon className="mr-8">local_phone</Icon> 連絡電話
									</td>
									<td className="text-left">
										<Typography variant="subtitle1" className="flex items-center font-semibold">
											(07) 2313232
										</Typography>
									</td>
								</tr>
								<tr>
									<td>
										<Icon className="mr-8">perm_phone_msg</Icon> 傳真號碼
									</td>
									<td className="text-left">
										<Typography variant="subtitle1" className="flex items-center font-semibold">
											(07) 2416562
										</Typography>
									</td>
								</tr>
								<tr>
									<td>
										<Icon className="mr-8">access_time</Icon> 服務時間
									</td>
									<td className="text-left">
										<Typography variant="subtitle1" className="flex items-center font-semibold">
											每週二~週日09:00~18:00
											<br />
											(週一及國定假日休館)
										</Typography>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<table className="simple">
						<tbody>
							<tr>
								<td><Icon>directions_railway</Icon> 捷運路線</td>
								<td className="text-left">
									<Typography variant="subtitle1" className="flex items-center font-semibold whitespace-pre">
										搭捷運至捷運中央公園站(R9 站)下車--2 號出口出站
										<br />
										往前走至五福三路右轉，約250公尺到達
										</Typography>
								</td>
							</tr>
							<tr>
								<td><Icon>directions_bus</Icon> 公車路線</td>
								<td className="text-left">
									<Typography variant="subtitle1" className="flex items-center font-semibold">
										小港國際機場：<br />
										12 路、71 路(於中山二路與新田路交叉口下車)<br />
										高雄火車站：<br />
										12 路、15 路(於中山二路與新田路交叉口下車)<br />
										25 路、76 路、100 路、218 路公車<br />
										(於五福三路城市光廊前下車)
										</Typography>
								</td>
							</tr>
							<tr>
								<td><Icon>directions_car</Icon> 開車路線</td>
								<td className="text-left">
									<Typography variant="subtitle1" className="flex items-center font-semibold">
										小港國際機場：<br />
										中山四路往中山二路方向，於五福三路交叉口左轉<br />

										高雄火車站：<br />
										中山一路往中山二路方向，於五福三路交叉口右轉<br />

										中山高速公路--中正交流道：<br />
										中正路一路往中正三路方向，於中山一路交叉口左轉，再於五福三路交叉口右轉<br />
									</Typography>
								</td>
							</tr>
						</tbody>
					</table>
				</FuseAnimateGroup>

			</div>
		</div>
	);
}

export default ContactUsPage;
