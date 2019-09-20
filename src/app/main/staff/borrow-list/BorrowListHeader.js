import React from 'react';
import { Icon, Input, Paper, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from 'app/store/actions';

function BorrowListHeader(props) {
	const dispatch = useDispatch();
	const searchText = useSelector(({ userList }) => userList.searchText);
	const totalUsers = useSelector(({ userList }) => userList.totalUsers);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

	return (
		<div className="flex flex-1 items-center justify-between p-8 sm:p-24">

			<div className="flex flex-shrink items-center sm:w-224 justify-center xs:justify-end">
				<div className="flex items-center">
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<Typography variant="h6" className="hidden sm:flex">會員列表</Typography>
					</FuseAnimate>
				</div>
			</div>

			<div className="flex flex-1 items-center justify-left pr-8 sm:px-12">

				<ThemeProvider theme={mainTheme}>
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<Paper className="flex p-4 items-center w-full max-w-512 px-8 py-4 rounded-full" elevation={1}>

							<Icon className="mr-8" color="action">search</Icon>

							<Input
								placeholder="搜尋會員 (名稱、信箱)"
								className="flex flex-1"
								disableUnderline
								fullWidth
								value={searchText}
								inputProps={{
									'aria-label': 'Search'
								}}
								onChange={ev => dispatch(Actions.setSearchText(ev))}
							/>
						</Paper>
					</FuseAnimate>
				</ThemeProvider>
			</div>

			<div className="flex flex-shrink items-center justify-center xs:justify-end">
				<div className="flex items-center">
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<Typography className="text-11 font-600 rounded-12 text-white bg-blue px-8 py-4 sm:mr-12">{totalUsers + " 位會員"}</Typography>
					</FuseAnimate>
				</div>
			</div>
		</div>
	);
}

export default BorrowListHeader;
