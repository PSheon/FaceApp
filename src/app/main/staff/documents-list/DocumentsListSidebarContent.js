import React from 'react';
import { FormControlLabel, Icon, Switch, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import moment from 'moment';

import { mimnTypeConverter, bytesToSizeConverter } from 'app/utils';

const useStyles = makeStyles({
	table: {
		'& th': {
			padding: '16px 0'
		}
	},
	typeIcon: {
		'&.pdf:before': {
			content: "'picture_as_pdf'",
			color: '#e91e63'
		},
		'&.word:before': {
			content: "'insert_drive_file'",
			color: '#1565C0'
		}
	}
});

function DocumentsListSidebarContent(props) {
	const selectedItem = useSelector(({ uploads }) => uploads.document.docs.find(doc => doc._id === uploads.document.selectedItemId));

	const classes = useStyles();

	if (!selectedItem) {
		return null;
	}

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={200}>

			<div className="file-details p-16 sm:p-24">

				<div className="preview h-128 sm:h-256 file-icon flex items-center justify-center">
					<FuseAnimate animation="transition.expandIn" delay={300}>
						<Icon className={clsx(classes.typeIcon, mimnTypeConverter(selectedItem.mimeType).toLowerCase(), "text-48")} />
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

				<Typography variant="subtitle1" className="py-16">文件資訊</Typography>

				<table className={clsx(classes.table, "w-full, text-left")}>

					<tbody>

						<tr className="type">
							<th>類型</th>
							<td>{mimnTypeConverter(selectedItem.mimeType)}</td>
						</tr>

						<tr className="size">
							<th>大小</th>
							<td>{selectedItem.documentSize === '' ? '-' : bytesToSizeConverter(selectedItem.documentSize)}</td>
						</tr>

						<tr className="owner">
							<th>作者</th>
							<td>{selectedItem.author.displayName}</td>
						</tr>

						<tr className="created">
							<th>更新日期</th>
							<td>{moment(selectedItem.updatedAt).format('YYYY-MM-DD HH:mm')}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</FuseAnimate>
	);
}

export default DocumentsListSidebarContent;
