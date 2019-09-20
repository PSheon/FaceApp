import React, { useState } from 'react';
import { Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@material-ui/core';
import { json2csv } from 'json-2-csv';

import { useSelector } from 'react-redux';

function BorrowListMultiSelectMenu(props) {
	const USERS = useSelector(({ userList }) => userList.docs);
	const selectedUserIds = useSelector(({ userList }) => userList.selectedUserIds);
	const csvSource = USERS.filter(user => selectedUserIds.includes(user._id))

	const [anchorEl, setAnchorEl] = useState(null);

	function openSelectedUserMenu(event) {
		setAnchorEl(event.currentTarget);
	}

	function closeSelectedUsersMenu() {
		setAnchorEl(null);
	}

	return (
		<React.Fragment>
			<IconButton
				className="p-0"
				aria-owns={anchorEl ? 'selectedUsersMenu' : null}
				aria-haspopup="true"
				onClick={openSelectedUserMenu}
			>
				<Icon>more_horiz</Icon>
			</IconButton>
			<Menu
				id="selectedUsersMenu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={closeSelectedUsersMenu}
			>
				<MenuList>
					<MenuItem
						onClick={() => {
							// dispatch(Actions.deactiveUsers(selectedUserIds));
							json2csv(csvSource, () => {
								console.log('sucess')
							})
							closeSelectedUsersMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>cloud_download</Icon>
						</ListItemIcon>
						<ListItemText primary="匯出 CSV" />
					</MenuItem>
				</MenuList>
			</Menu>
		</React.Fragment>
	);
}

export default BorrowListMultiSelectMenu;

