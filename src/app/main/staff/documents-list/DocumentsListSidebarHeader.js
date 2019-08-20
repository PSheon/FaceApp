import React from 'react';
import { useDispatch } from 'react-redux';
import { Icon, IconButton, Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { useSelector } from 'react-redux';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import copy from 'copy-to-clipboard';

import { AUTH_REST_BASE_END_POINT } from 'app/fuse-configs/envsConfig'
import * as Actions from 'app/store/actions';

function DocumentsListSidebarHeader(props) {
	const dispatch = useDispatch();
	const selectedItem = useSelector(({ uploads }) => uploads.document.docs.find(doc => doc._id === uploads.document.selectedItemId));

	function handleCopyDocumentLink() {
		copy(AUTH_REST_BASE_END_POINT + '/uploads/document/' + selectedItem.documentName)
		dispatch(Actions.showMessage({ message: '已複製文件網址.' }));
	}
	function handleDeleteDocument() {
		dispatch(Actions.deleteDocument(selectedItem._id))
	}

	if (!selectedItem) {
		return null;
	}
	return (
		<div className="flex flex-col justify-between h-full p-4 sm:p-12">
			<div className="toolbar flex align-center justify-end">
				<FuseAnimate animation="transition.expandIn" delay={200}>
					<Tooltip title="複製文件網址" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} placement="bottom" onClick={handleCopyDocumentLink}>
						<IconButton aria-label="Copy button">
							<FileCopyIcon />
						</IconButton>
					</Tooltip>
				</FuseAnimate>
				<FuseAnimate animation="transition.expandIn" delay={200}>
					<IconButton>
						<Icon>cloud_download</Icon>
					</IconButton>
				</FuseAnimate>
				<FuseAnimate animation="transition.expandIn" delay={200}>
					<Tooltip title="刪除文件" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} placement="bottom" onClick={handleDeleteDocument}>
						<IconButton>
							<Icon>delete</Icon>
						</IconButton>
					</Tooltip>
				</FuseAnimate>
			</div>

			<div className="p-12">
				<FuseAnimate delay={200}>
					<Typography variant="subtitle1" className="mb-8">{selectedItem.documentName}</Typography>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default DocumentsListSidebarHeader;
