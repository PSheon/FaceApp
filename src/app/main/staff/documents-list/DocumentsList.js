import React, { useEffect, useRef } from 'react';
import { FusePageSimple } from '@fuse';
import { useDispatch } from 'react-redux';

import * as Actions from 'app/store/actions';
import DocumentsListHeader from './DocumentsListHeader';
import DocumentsTable from './DocumentsTable';
import DocumentsListSidebarHeader from './DocumentsListSidebarHeader';
import DocumentsListSidebarContent from './DocumentsListSidebarContent';

function DocumentsList() {
	const dispatch = useDispatch();

	const pageLayout = useRef(null);

	useEffect(() => {
		dispatch(Actions.syncUploadedDocuments());
	}, [dispatch]);

	return (
		<FusePageSimple
			classes={{
				root: "bg-gray-300",
				header: "h-128 min-h-128 sm:h-160 sm:min-h-160",
				sidebarHeader: "h-140 min-h-128 sm:h-160 sm:min-h-160",
				rightSidebar: "w-320"
			}}
			header={
				<DocumentsListHeader />
			}
			content={
				<DocumentsTable pageLayout={pageLayout} />
			}
			rightSidebarHeader={
				<DocumentsListSidebarHeader />
			}
			rightSidebarContent={
				<DocumentsListSidebarContent />
			}
			ref={pageLayout}
			innerScroll
		/>
	)
}

export default DocumentsList;
