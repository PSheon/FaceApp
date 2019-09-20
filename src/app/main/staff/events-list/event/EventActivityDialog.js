import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Dialog, DialogActions, DialogContent, Icon, IconButton, Button, Typography, Toolbar, AppBar, Avatar, Divider } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';

import * as Actions from 'app/store/actions';
import { genderConverter, statusConverter } from 'app/utils';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

const StyledRating = withStyles({
	iconFilled: {
		color: '#ff6d75',
	},
	iconHover: {
		color: '#ff3d47',
	},
})(Rating);
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
function EventActivityDialog(props) {
	const dispatch = useDispatch();
	const EVENT_DETAIL = props.EVENT_DETAIL;
	const eventActivityDialog = useSelector(({ activity }) => activity.eventLogs.eventActivityDialog);

	const [applicantInfos, setApplicantInfos] = useState(null);
	const [applicantReviews, setApplicantReviews] = useState(null);

	const initDialog = useCallback(
		() => {
			const { applicant, ...otherInfos } = eventActivityDialog.data;
			setApplicantInfos(applicant);
			setApplicantReviews(otherInfos);
		},
		[eventActivityDialog.data],
	);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (eventActivityDialog.props.open) {
			initDialog();
		}

	}, [eventActivityDialog.props.open, initDialog]);

	function closeComposeDialog() {
		dispatch(Actions.closeEventActivityDialog())
	}

	function handleUpdateApplicantRegistration(action) {
		dispatch(Actions.updateApplicantRegistrationStatus({ event: EVENT_DETAIL._id, applicant: applicantInfos._id, action }))
		closeComposeDialog();
	}

	function renderRegistrationStatus() {
		switch (applicantReviews.registrationStatus) {
			case 'rejected':
				return (
					<>
						<Button onClick={() => handleUpdateApplicantRegistration()}>
							<Icon className="text-orange">lock_open</Icon> 排定候補
						</Button>
						<Button onClick={() => handleUpdateApplicantRegistration('succeeded')}>
							<Icon className="text-green">lock_open</Icon> 同意申請
						</Button>
					</>
				)
			case 'succeeded':
				return (
					<>
						<Button onClick={() => handleUpdateApplicantRegistration()}>
							<Icon className="text-orange">lock</Icon> 排定候補
						</Button>
						<Button onClick={() => handleUpdateApplicantRegistration('rejected')}>
							<Icon className="text-red">lock</Icon> 拒絕申請
						</Button>
					</>
				)
			case 'pending':
			default:
				return (
					<>
						<Button onClick={() => handleUpdateApplicantRegistration('rejected')}>
							<Icon className="text-red">lock</Icon> 拒絕申請
						</Button>
						<Button onClick={() => handleUpdateApplicantRegistration('succeeded')}>
							<Icon className="text-green">lock_open</Icon> 同意申請
						</Button>
					</>
				);
		}
	}

	// console.log('applicantReviews ', applicantReviews)

	return (
		<Dialog
			classes={{
				paper: "m-24 rounded-16"
			}}
			{...eventActivityDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="sm"
		>
			{
				(!applicantInfos || !applicantReviews) ? (
					<div className="flex w-full h-full justify-center items-center">
						<LoadingSpinner width={128} height={128} />
					</div>
				) : (
						<>
							<AppBar position="static" elevation={1}>
								<Toolbar className="flex justify-between w-full">
									<Typography variant="subtitle1" color="inherit">
										報名人員資料
									</Typography>
									<IconButton onClick={closeComposeDialog}>
										<CloseIcon className="text-white" />
									</IconButton>
								</Toolbar>
								<div className="flex flex-col items-center justify-center pb-24">
									<Avatar className="w-96 h-96" alt="user avatar" src={applicantInfos.photoURL} />
									<Typography variant="h6" color="inherit" className="pt-8">
										{applicantInfos.displayName}
									</Typography>
								</div>
							</AppBar>
							<form noValidate className="flex flex-col overflow-hidden">
								<DialogContent classes={{ root: "p-24" }}>
									<Typography variant="h6" color="inherit" className="py-24 text-center">
										給予評價
									</Typography>

									<table className="simple clickable mb-12">
										<tbody>
											<tr>
												<td>
													<Typography variant="subtitle1" className="flex justify-center items-cecnter">
														<Icon color="action" className="mr-8">event_note</Icon>
														活動整體滿意度
													</Typography>
												</td>
												<td className="text-center">
													{eventActivityDialog['eventStars'] ? (
														<Rating
															value={eventActivityDialog['eventStars']}
															size="large"
															readOnly
														/>
													) : (
															<StyledRating
																value={eventActivityDialog.eventStars || 3}
																size="large"
																precision={0.5}
																readOnly
																icon={<HelpOutlineIcon fontSize="inherit" />}
															/>
														)}
												</td>
											</tr>
											<tr>
												<td>
													<Typography variant="subtitle1" className="flex justify-center items-cecnter">
														<Icon color="action" className="mr-8">account_box</Icon>
														講師的整體滿意度
													</Typography>
												</td>
												<td className="text-center">
													{eventActivityDialog['speakerStars'] ? (
														<Rating
															value={eventActivityDialog['speakerStars']}
															size="large"
															readOnly
														/>
													) : (
															<StyledRating
																value={eventActivityDialog.eventStars || 3}
																size="large"
																precision={0.5}
																readOnly
																icon={<HelpOutlineIcon fontSize="inherit" />}
															/>
														)}
												</td>
											</tr>
											<tr>
												<td>
													<Typography variant="subtitle1" className="flex justify-center items-cecnter">
														<Icon color="action" className="mr-8">library_books</Icon>
														講師的課程內容滿意度
													</Typography>
												</td>
												<td className="text-center">
													{eventActivityDialog['speakerExpressionStars'] ? (
														<Rating
															value={eventActivityDialog['speakerExpressionStars']}
															size="large"
															readOnly
														/>
													) : (
															<StyledRating
																value={eventActivityDialog.eventStars || 3}
																size="large"
																precision={0.5}
																readOnly
																icon={<HelpOutlineIcon fontSize="inherit" />}
															/>
														)}
												</td>
											</tr>
											<tr>
												<td>
													<Typography variant="subtitle1" className="flex justify-center items-cecnter">
														<Icon color="action" className="mr-8">comment</Icon>
														講師的表達方式滿意度
													</Typography>
												</td>
												<td className="text-center">
													{eventActivityDialog['speakerContentStars'] ? (
														<Rating
															value={eventActivityDialog['speakerContentStars']}
															size="large"
															readOnly
														/>
													) : (
															<StyledRating
																value={eventActivityDialog.eventStars || 3}
																size="large"
																precision={0.5}
																readOnly
																icon={<HelpOutlineIcon fontSize="inherit" />}
															/>
														)}
												</td>
											</tr>
										</tbody>
									</table>

									<div className="flex">
										<div className="min-w-48 pt-20">
											<Icon color="action">comment</Icon>
										</div>

										<CssTextField
											className="mb-24"
											label="簡短評語"
											autoFocus
											id="eventComments"
											name="eventComments"
											value={applicantInfos.eventComments || '尚未給予評論'}
											variant="outlined"
											required
											multiline
											rowsMax={3}
											InputProps={{
												readOnly: true,
											}}
											fullWidth
										/>
									</div>

									<Divider />

									<Typography variant="h6" color="inherit" className="py-24 text-center">
										活動前問卷
									</Typography>

									{EVENT_DETAIL['preQuestionList'].some(item => item === 'participateReason') && (
										<div className="flex">
											<div className="min-w-48 pt-20">
												<Icon color="action">account_circle</Icon>
											</div>

											<CssTextField
												className="mb-24"
												label="為何想參加這場活動？"
												multiline
												rows={3}
												id="participateReason"
												name="participateReason"
												value={applicantReviews.participateReason}
												variant="outlined"
												required
												InputProps={{
													readOnly: true,
												}}
												fullWidth
											/>
										</div>
									)}
									{EVENT_DETAIL['preQuestionList'].some(item => item === 'participantHeardFrom') && (
										<div className="flex">
											<div className="min-w-48 pt-20">
												<Icon color="action">account_circle</Icon>
											</div>

											<CssTextField
												className="mb-24"
												label="從何處得知本活動？"
												autoFocus
												id="participantHeardFrom"
												name="participantHeardFrom"
												value={applicantReviews.participantHeardFrom}
												variant="outlined"
												required
												InputProps={{
													readOnly: true,
												}}
												fullWidth
											/>
										</div>
									)}
									{EVENT_DETAIL['preQuestionList'].some(item => item === 'participantExpectation') && (
										<div className="flex">
											<div className="min-w-48 pt-20">
												<Icon color="action">account_circle</Icon>
											</div>

											<CssTextField
												className="mb-24"
												label="對於本場活動有什麼期待？"
												multiline
												rows={3}
												id="participantExpectation"
												name="participantExpectation"
												value={applicantReviews.participantExpectation}
												variant="outlined"
												required
												InputProps={{
													readOnly: true,
												}}
												fullWidth
											/>
										</div>
									)}
									{EVENT_DETAIL['preQuestionList'].some(item => item === 'participantID') && (
										<div className="flex">
											<div className="min-w-48 pt-20">
												<Icon color="action">account_circle</Icon>
											</div>

											<CssTextField
												className="mb-24"
												label="身分證字號"
												id="participantID"
												name="participantID"
												value={applicantReviews.participantID}
												variant="outlined"
												required
												InputProps={{
													readOnly: true,
												}}
												fullWidth
											/>
										</div>
									)}
									{EVENT_DETAIL['preQuestionList'].some(item => item === 'participantIsManager') && (
										<div className="flex">
											<div className="min-w-48 pt-20">
												<Icon color="action">account_circle</Icon>
											</div>

											<CssTextField
												className="mb-24"
												label="是否有管理職"
												id="participantIsManager"
												name="participantIsManager"
												value={applicantReviews.participantIsManager}
												variant="outlined"
												required
												InputProps={{
													readOnly: true,
												}}
												fullWidth
											/>
										</div>
									)}
									{EVENT_DETAIL['preQuestionList'].some(item => item === 'participateLunch') && (
										<div className="flex">
											<div className="min-w-48 pt-20">
												<Icon color="action">account_circle</Icon>
											</div>

											<CssTextField
												className="mb-24"
												label="是否參與中午餐敘？"
												id="participateLunch"
												name="participateLunch"
												value={applicantReviews.participateLunch}
												variant="outlined"
												required
												InputProps={{
													readOnly: true,
												}}
												fullWidth
											/>
										</div>
									)}
									{EVENT_DETAIL['preQuestionList'].some(item => item === 'lunchType') && (
										<div className="flex">
											<div className="min-w-48 pt-20">
												<Icon color="action">account_circle</Icon>
											</div>

											<CssTextField
												className="mb-24"
												label="是否參與中午餐敘？"
												id="lunchType"
												name="lunchType"
												value={applicantReviews.lunchType}
												variant="outlined"
												required
												InputProps={{
													readOnly: true,
												}}
												fullWidth
											/>
										</div>
									)}

									<Divider />

									<Typography variant="h6" color="inherit" className="py-24 text-center">
										個人資料
									</Typography>

									<div className="flex">
										<div className="min-w-48 pt-20">
											<Icon color="action">account_circle</Icon>
										</div>

										<CssTextField
											className="mb-24"
											label="中文姓名"
											id="fullName"
											name="fullName"
											value={applicantInfos.fullName}
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
											<Icon color="action">account_box</Icon>
										</div>
										<CssTextField
											className="mb-24"
											label="性別"
											id="gender"
											name="gender"
											value={applicantInfos.gender && genderConverter(applicantInfos.gender)}
											variant="outlined"
											InputProps={{
												readOnly: true,
											}}
											fullWidth
										/>
									</div>

									<div className="flex">
										<div className="min-w-48 pt-20">
											<Icon color="action">phone_iphone</Icon>
										</div>
										<CssTextField
											className="mb-24"
											label="手機"
											id="phone"
											name="phone"
											value={applicantInfos.phone}
											variant="outlined"
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
											value={applicantInfos.email}
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
											value={applicantInfos.schoolName}
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
											value={applicantInfos.departmentName}
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
											value={applicantInfos.employmentStatus && statusConverter(applicantInfos.employmentStatus)}
											variant="outlined"
											InputProps={{
												readOnly: true,
											}}
											fullWidth
										/>
									</div>

									<Divider />
								</DialogContent>

								{/* <DialogActions className={clsx(isAdmin ? 'justify-between' : 'justify-center', "pl-16")}> */}
								<DialogActions className="justify-between pl-16">
									{renderRegistrationStatus()}
								</DialogActions>
							</form>
						</>
					)
			}
		</Dialog>
	);
}

export default EventActivityDialog;
