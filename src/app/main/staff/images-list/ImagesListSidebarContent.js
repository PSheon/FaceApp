import React, { useState } from 'react';
import { FormControlLabel, Switch, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import moment from 'moment';

import * as Actions from 'app/store/actions';
import { imageNameToPathConverter, avatarNameToPathConverter } from 'app/utils';
import { mimnTypeConverter, bytesToSizeConverter } from 'app/utils';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles({
	table: {
		'& th': {
			padding: '16px 0'
		}
	},
	closeButton: {
		position: 'absolute',
		right: 5,
		top: '5px',
	},
});

function ImagesListSidebarContent(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const theme = useTheme();
	const selectedItem = useSelector(({ uploads }) => uploads.image.docs.find(doc => doc._id === uploads.image.selectedItemId));
	const isMobileView = useMediaQuery(theme.breakpoints.down('xs'));

	const [dialogOpen, setDialogOpen] = useState(false);
	const [imageCaptionEditMode, setImageCaptionEditMode] = useState(false);
	const [imageCaption, setImageCaption] = useState('');

	function handleClose() {
		setDialogOpen(false);
	}
	function handleOpenImageLightbox() {
		setDialogOpen(true);
	}

	function handleSubmit() {
		setImageCaptionEditMode(false);
		if (imageCaption !== selectedItem.imageCaption) {
			dispatch(Actions.updateImageById({
				imageId: selectedItem._id,
				imageCaption: imageCaption
			}));
		}
	}

	if (!selectedItem) {
		return null;
	}

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={200}>

			<div className="file-details p-16 sm:p-24">

				<div className="preview h-128 sm:h-256 file-icon flex items-center justify-center">
					<FuseAnimate animation="transition.expandIn" delay={300}>
						{isMobileView ? (
							<img className="h-full rounded-12 p-8 cursor-pointer" src={imageNameToPathConverter(selectedItem.imageName)} alt={selectedItem.imageName} />
						) : (
								<img className="h-full rounded-12 p-8 cursor-pointer" src={imageNameToPathConverter(selectedItem.imageName)} alt={selectedItem.imageName} onClick={handleOpenImageLightbox} />
							)}
					</FuseAnimate>
				</div>

				<FormControlLabel
					className="offline-switch"
					control={
						<Switch
							checked={selectedItem.offline}
							aria-label="Available Offline"
						/>
					}
					label="Available Offline"
				/>

				<Typography variant="subtitle1" className="py-16">圖片資訊</Typography>

				<div className="flex justify-start items-center">
					<Avatar className="mr-5" alt="user avatar" src={avatarNameToPathConverter(selectedItem.author.photoURL)} />
				</div>

				<table className={clsx(classes.table, "w-full text-left")}>
					<tbody>
						<tr>
							<th className="min-w-84">說明</th>
							<td className="h-64 max-w-192 cursor-pointer flex justify-start items-center">
								{imageCaptionEditMode ? (
									<TextField
										id="imageCaption"
										label="圖片說明"
										autoFocus
										defaultValue={selectedItem.imageCaption}
										onChange={event => setImageCaption(event.target.value)}
										onBlur={event => handleSubmit()}
										// {
										// 	setImageCaptionEditMode(false);
										// 	setImageCaption('');
										// }}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end" className="cursor-pointer">
													<Icon className="text-20" color="action">edit</Icon>
												</InputAdornment>
											)
										}}
										margin="dense"
									/>
								) : (
										<FuseAnimate animation="transition.slideUpIn" delay={200}>
											<Typography variant="body1" color="inherit" className="text-left w-full whitespace-pre-line" onClick={() => setImageCaptionEditMode(true)}>
												<Icon className="ml-r">edit</Icon>
												{selectedItem.imageCaption}
											</Typography>
										</FuseAnimate>
									)}
							</td>
						</tr>

						<tr>
							<th>類型</th>
							<td>{mimnTypeConverter(selectedItem.mimeType)}</td>
						</tr>

						<tr>
							<th>尺寸</th>
							<td>{selectedItem.imageHeight && selectedItem.imageWidth ? bytesToSizeConverter(selectedItem.imageSize) : '-'}</td>
						</tr>

						<tr>
							<th>大小</th>
							<td>{selectedItem.imageSize === '' ? '-' : bytesToSizeConverter(selectedItem.imageSize)}</td>
						</tr>

						<tr>
							<th>作者</th>
							<td>{selectedItem.author.displayName}</td>
						</tr>

						<tr>
							<th>更新日期</th>
							<td>{moment(selectedItem.updatedAt).format('YYYY-MM-DD HH:mm')}</td>
						</tr>
					</tbody>
				</table>

				{/* Image LightBox */}
				<Dialog classes={{ paper: 'rounded-12' }} maxWidth="xl" fullWidth fullScreen={false} open={dialogOpen} onClose={handleClose} TransitionComponent={Transition}>
					<DialogTitle id="alert-dialog-title" disableTypography className="text-center text-16 sm:text-24 font-semibold">
						{selectedItem.imageName}
						<IconButton aria-label="Close" className={classes.closeButton} onClick={handleClose}>
							<CloseIcon />
						</IconButton>
					</DialogTitle>
					<DialogContent className="flex justify-center items-center">
						<FuseAnimate>
							<img className="rounded-12 p-8 cursor-pointer" src={imageNameToPathConverter(selectedItem.imageName)} alt={selectedItem.imageName} />
						</FuseAnimate>
					</DialogContent>
				</Dialog>
			</div>
		</FuseAnimate>
	);
}

export default ImagesListSidebarContent;
