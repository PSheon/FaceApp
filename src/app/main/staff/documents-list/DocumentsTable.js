import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Hidden, Typography, Icon, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimateGroup } from '@fuse';
import VisibilitySensor from "react-visibility-sensor";
import moment from 'moment';
import clsx from 'clsx';

import * as Actions from 'app/store/actions';
import eventBusService from 'app/services/eventBusService';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';
import { mimnTypeConverter, documentNameConverter, bytesToSizeConverter } from 'app/utils';

const useStyles = makeStyles({
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

function DocumentsTable(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const DOCUMENT = useSelector(({ uploads }) => uploads.document);
	const files = DOCUMENT.docs
	const selectedItemId = DOCUMENT.selectedItemId;

	const [isLoadingNextPageDocuments, setIsLoadingNextPageDocuments] = useState(false);

	function handleOnPageBottom() {
		if (!DOCUMENT.hasNextPage) return
		setIsLoadingNextPageDocuments(true);

		const params = {
			page: DOCUMENT.nextPage,
			limit: 20,
			sort: 'updatedAt',
			order: -1
		}

		eventBusService.getUploadedDocuments(params)
			.then(response => {
				dispatch({
					type: Actions.APPEND_NEXT_PAGE_UPLOADED_DOCUMENTS_LIST,
					payload: response
				});

				setIsLoadingNextPageDocuments(false)
			})
	}

	if (!files.length) {
		return (
			<div className="flex justify-center items-center h-full">
				<Typography variant="h6" color="textSecondary">
					還沒有文件，上傳第一份文件吧！
				</Typography>
			</div>
		)
	}

	return (
		<FuseAnimateGroup animation="transition.slideUpIn" delay={300}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell className="max-w-64 w-64 p-0 text-center"></TableCell>
						<TableCell>名稱</TableCell>
						<TableCell className="hidden sm:table-cell">類型</TableCell>
						<TableCell className="hidden sm:table-cell">作者</TableCell>
						<TableCell className="text-center hidden sm:table-cell">大小</TableCell>
						<TableCell className="hidden sm:table-cell">修改日期</TableCell>
						<Hidden lgUp>
							<TableCell className="w-64 p-0 text-center"></TableCell>
						</Hidden>
					</TableRow>
				</TableHead>

				<TableBody>
					{Object.entries(files).map(([key, file]) => (
						<TableRow
							key={key}
							hover
							onClick={event => dispatch(Actions.setSelectedDocumentId(file._id))}
							selected={file._id === selectedItemId}
							className="cursor-pointer"
						>
							<TableCell className="max-w-64 w-64 p-0 text-center">
								<Icon className={clsx(classes.typeIcon, mimnTypeConverter(file.mimeType).toLowerCase())} />
							</TableCell>
							<TableCell>{documentNameConverter(file.documentName)}</TableCell>
							<TableCell className="hidden sm:table-cell">{mimnTypeConverter(file.mimeType)}</TableCell>
							<TableCell className="hidden sm:table-cell">{file.author.displayName}</TableCell>
							<TableCell className="text-center hidden sm:table-cell">{file.documentSize === '' ? '-' : bytesToSizeConverter(file.documentSize)}</TableCell>
							<TableCell className="hidden sm:table-cell">{moment(file.updatedAt).format('YYYY-MM-DD')}</TableCell>
							<Hidden lgUp>
								<TableCell>
									<IconButton
										onClick={(ev) => props.pageLayout.current.toggleRightSidebar()}
										aria-label="open right sidebar"
									>
										<Icon>info</Icon>
									</IconButton>
								</TableCell>
							</Hidden>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<VisibilitySensor>
				{({ isVisible }) => {
					return (
						<div className="flex justify-center items-center w-full min-h-10">
							{isLoadingNextPageDocuments && <LoadingSpinner width={128} height={128} />}
							{isVisible && !isLoadingNextPageDocuments && handleOnPageBottom()}
							{/* {!IMAGE.hasNextPage && (
							<FuseAnimate delay={500}>
								<Typography variant="h5" color="textSecondary" className="mb-16">
									...沒有更多圖片了...
								</Typography>
							</FuseAnimate>
						)} */}
						</div>
					)
				}}
			</VisibilitySensor>
		</FuseAnimateGroup>
	);
}

export default DocumentsTable;
