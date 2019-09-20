import React, { useEffect, useCallback } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, MenuItem, Typography, Toolbar, AppBar, Avatar, Divider } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';

import * as Actions from 'app/store/actions';
import { genderConverter, educationConverter, statusConverter } from 'app/utils';

const defaultFormState = {
	id: '',
	role: 'user',
	displayName: '',
	email: '',
	photoURL: 'assets/images/avatars/profile.jpg',
	verified: false,
	google: '',
	facebook: ''
};
const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: '#3e3e3e',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#fefefe',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: '#5e5e5e',
			},
			'&:hover fieldset': {
				borderColor: '#3e3e3e',
			},
			'&.Mui-focused fieldset': {
				borderColor: '#3e3e3e',
			},
		},
		'& .MuiOutlinedInput-notchedOutline': {
			borderRadius: '2.4rem',
		}
	},
})(TextField);

function UserListDialog(props) {
	const dispatch = useDispatch();
	const userInfoDialog = useSelector(({ userList }) => userList.userInfoDialog);
	const isAdmin = useSelector(({ auth }) => auth.user.role === 'admin');

	const { form, handleChange, setForm } = useForm(defaultFormState);

	const initDialog = useCallback(
		() => {
			setForm(userInfoDialog.data);
		},
		[userInfoDialog.data, setForm],
	);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (userInfoDialog.props.open) {
			initDialog();
		}

	}, [userInfoDialog.props.open, initDialog]);

	function closeComposeDialog() {
		// userInfoDialog.type === 'edit' ? dispatch(Actions.closeEdituserInfoDialog()) : dispatch(Actions.closeNewuserInfoDialog());
		dispatch(Actions.closeUserInfoDialog())
	}

	function canBeSubmitted() {
		return (
			form.displayName.length > 0
		);
	}

	function handleSubmit(event) {
		event.preventDefault();

		const { id, email, role } = form;
		dispatch(Actions.updateUserPermission({ userId: id, email, role }));

		closeComposeDialog();
	}

	function handleToggleActivation() {
		const { id, email, active } = form;
		dispatch(Actions.toggleUserActivation({ userId: id, email, active: !active }));
		closeComposeDialog();
	}

	// console.log('form ', form)

	return (
		<Dialog
			classes={{
				paper: "m-24 rounded-16"
			}}
			{...userInfoDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="sm"
		>

			<AppBar position="static" elevation={1}>
				<Toolbar className="flex justify-between w-full">
					<Typography variant="subtitle1" color="inherit">
						會員資料
					</Typography>
					<IconButton onClick={closeComposeDialog}>
						<CloseIcon className="text-white" />
					</IconButton>
				</Toolbar>
				<div className="flex flex-col items-center justify-center pb-24">
					<Avatar className="w-96 h-96" alt="user avatar" src={form.photoURL} />
					<Typography variant="h6" color="inherit" className="pt-8">
						{form.displayName}
					</Typography>
				</div>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
				<DialogContent classes={{ root: "p-24" }}>
					<Typography variant="h6" color="inherit" className="pb-24 text-center">
						{form.id}
					</Typography>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>

						<CssTextField
							className="mb-24"
							label="顯示名稱"
							autoFocus
							id="displayName"
							name="displayName"
							value={form.displayName}
							// onChange={handleChange}
							variant="outlined"
							required
							InputProps={{
								readOnly: true,
							}}
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">mail</Icon>
						</div>
						<CssTextField
							className="mb-24"
							label="信箱"
							id="email"
							name="email"
							value={form.email}
							// onChange={handleChange}
							variant="outlined"
							InputProps={{
								readOnly: true,
							}}
							fullWidth
						/>
					</div>

					<Divider />

					<Typography variant="h6" color="inherit" className="py-24 text-center">
						個人資料
					</Typography>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_box</Icon>
						</div>
						<CssTextField
							className="mb-24"
							label="中文姓名"
							id="fullName"
							name="fullName"
							value={form.fullName}
							// onChange={handleChange}
							variant="outlined"
							InputProps={{
								readOnly: true,
							}}
							fullWidth
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_box</Icon>
						</div>
						<CssTextField
							className="mb-24"
							label="性別"
							id="gender"
							name="gender"
							value={form.gender && genderConverter(form.gender)}
							// onChange={handleChange}
							variant="outlined"
							InputProps={{
								readOnly: true,
							}}
							fullWidth
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_box</Icon>
						</div>
						<CssTextField
							className="mb-24"
							label="生日"
							id="bob"
							name="bob"
							value={form.bob && moment(form.bob).format('LL')}
							// onChange={handleChange}
							variant="outlined"
							InputProps={{
								readOnly: true,
							}}
							fullWidth
						/>
					</div>

					<Divider />

					<Typography variant="h6" color="inherit" className="py-24 text-center">
						最高學歷
					</Typography>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">school</Icon>
						</div>
						<CssTextField
							className="mb-24"
							label="最高學歷"
							id="education"
							name="education"
							value={form.education && educationConverter(form.education)}
							// onChange={handleChange}
							variant="outlined"
							InputProps={{
								readOnly: true,
							}}
							fullWidth
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">school</Icon>
						</div>
						<CssTextField
							className="mb-24"
							label="學校名稱"
							id="schoolName"
							name="schoolName"
							value={form.schoolName}
							// onChange={handleChange}
							variant="outlined"
							InputProps={{
								readOnly: true,
							}}
							fullWidth
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_balance</Icon>
						</div>
						<CssTextField
							className="mb-24"
							label="科系名稱"
							id="departmentName"
							name="departmentName"
							value={form.departmentName}
							// onChange={handleChange}
							variant="outlined"
							InputProps={{
								readOnly: true,
							}}
							fullWidth
						/>
					</div><div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_balance</Icon>
						</div>
						<CssTextField
							className="mb-24"
							label="目前身分"
							id="employmentStatus"
							name="employmentStatus"
							value={form.employmentStatus && statusConverter(form.employmentStatus)}
							// onChange={handleChange}
							variant="outlined"
							InputProps={{
								readOnly: true,
							}}
							fullWidth
						/>
					</div>

					<Divider />

					<Typography variant="h6" color="inherit" className="py-24 text-center">
						聯絡方式
					</Typography>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">phone_iphone</Icon>
						</div>
						<CssTextField
							className="mb-24"
							label="手機"
							id="phone"
							name="phone"
							value={form.phone}
							// onChange={handleChange}
							variant="outlined"
							InputProps={{
								readOnly: true,
							}}
							fullWidth
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">location_on</Icon>
						</div>
						<CssTextField
							className="mb-24"
							label="居住地"
							id="city"
							name="city"
							value={form.city}
							// onChange={handleChange}
							variant="outlined"
							InputProps={{
								readOnly: true,
							}}
							fullWidth
						/>
					</div>

					<Divider />

					<Typography variant="h6" color="inherit" className="py-24 text-center">
						操作
					</Typography>

					{isAdmin && (
						<div className="flex">
							<div className="min-w-48 pt-20">
								<Icon color="action">group</Icon>
							</div>
							<CssTextField
								select
								className="mb-24"
								SelectProps={{
									MenuProps: {
										classes: {
											paper: 'rounded-12'
										}
									}
								}}
								label="權限"
								id="role"
								name="role"
								value={form.role}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							>
								<MenuItem className="rounded-full" value="user">
									會員
								</MenuItem>
								<MenuItem className="rounded-full" value="staff">
									員工
								</MenuItem>
							</CssTextField>
						</div>
					)}

				</DialogContent>

				<DialogActions className={clsx(isAdmin ? 'justify-between' : 'justify-center', "pl-16")}>
					<IconButton
						onClick={handleToggleActivation}
					>
						{form.active ? (
							<Icon className="text-green">lock_open</Icon>
						) : (
								<Icon className="text-red">lock</Icon>
							)}
					</IconButton>
					{isAdmin && (
						<Button
							className="rounded-full"
							variant="contained"
							color="primary"
							type="submit"
							onClick={handleSubmit}
							disabled={!canBeSubmitted()}
						>
							變更
						</Button>
					)}
				</DialogActions>
			</form>
		</Dialog>
	);
}

export default UserListDialog;
