import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar, Tab, Tabs, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FusePageSimple, FuseAnimate } from '@fuse';
import AboutTab from './tabs/AboutTab';
import PersonalTab from './tabs/PersonalTab';
import ReferralTab from './tabs/ReferralTab';
import PurchaseHistoryTab from './tabs/PurchaseHistoryTab';

// TODO Fix here
// import axios from 'axios';
// axios.get('http://localhost:8000/api/profile')
// 	.then(res => {
// 		console.log('res, ', res.data)
// 	})
// 	.catch(err => {
// 		console.log('err, ', err)
// 	})

const useStyles = makeStyles(theme => ({
	layoutHeader: {
		height: 240,
		minHeight: 240,
		[theme.breakpoints.down('md')]: {
			height: 300,
			minHeight: 300
		},
		[theme.breakpoints.down('sm')]: {
			height: 280,
			minHeight: 280
		}
	}
}));

function PersonalSettingsPage() {
	const classes = useStyles();
	const [selectedTab, setSelectedTab] = useState(0);
	const user = useSelector(({ auth }) => auth.user);

	function handleTabChange(event, value) {
		setSelectedTab(value);
	}

	return (
		<FusePageSimple
			classes={{
				header: classes.layoutHeader,
				toolbar: "px-16 sm:px-24"
			}}
			header={
				<div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
					<div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
						<FuseAnimate animation="transition.expandIn" delay={300}>
							<Avatar className="w-96 h-96" src={user.data.photoURL} />
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography className="md:ml-24" variant="h3" color="inherit">{user.data.displayName}</Typography>
						</FuseAnimate>
					</div>

					<div className="flex flex-col-reverse items-center py-12 md:py-0 md:flex-row md:justify-end">
						{/* <Button className="mr-8 normal-case rounded-full" variant="contained" color="secondary" aria-label="Follow">Follow</Button> */}
						<Typography className="md:ml-24" variant="h4" color="inherit">可用餘額 $ {user.data.balance ? user.data.balance['$numberDecimal'] : 0}</Typography>
						<Link to="/pricing" role="button">
							<Button className="normal-case rounded-full mx-12" variant="contained" color="secondary" aria-label="Send Message">存入資金</Button>
						</Link>
					</div>
				</div>
			}
			contentToolbar={
				<Tabs
					value={selectedTab}
					onChange={handleTabChange}
					indicatorColor="secondary"
					textColor="secondary"
					variant="scrollable"
					scrollButtons="off"
					classes={{
						root: "h-64 w-full border-b-1"
					}}
				>
					<Tab
						classes={{
							root: "h-64 rounded-full"
						}}
						label="帳戶資訊" />
					<Tab
						classes={{
							root: "h-64 rounded-full"
						}} label="個人資料" />
					{/* <Tab
						classes={{
							root: "h-64 rounded-full"
						}} label="推廣管理" />
					<Tab
						classes={{
							root: "h-64 rounded-full"
						}} label="投資紀錄" /> */}
				</Tabs>
			}
			content={
				<div className="p-16 sm:p-24">
					{selectedTab === 0 && (
						<AboutTab />
					)}
					{selectedTab === 1 && (
						<PersonalTab />
					)}
					{selectedTab === 2 && (
						<ReferralTab />
					)}
					{selectedTab === 3 && (
						<PurchaseHistoryTab />
					)}
				</div>
			}
		/>
	)
}

export default PersonalSettingsPage;
