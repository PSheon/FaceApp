import React, { useEffect, useRef } from 'react';
import { FusePageCarded } from '@fuse';
import { useDispatch } from 'react-redux';
import BorrowListTable from './BorrowListTable';
import BorrowListHeader from './BorrowListHeader';
import BorrowListDialog from './BorrowListDialog';
import * as Actions from 'app/store/actions';

function BorrowList(props) {
	const dispatch = useDispatch();

	const pageLayout = useRef(null);

	useEffect(() => {
		// dispatch(Actions.getUserList({
		// 	filter: 'user',
		// 	fields: 'role',
		// 	page: 1,
		// 	limit: 20,
		// 	sort: 'updatedAt',
		// 	order: -1
		// }));
		// dispatch(Actions.getUserData());
	}, [dispatch]);

	return (
		<React.Fragment>
			<FusePageCarded
				classes={{
					contentWrapper: "p-0 sm:p-24 pb-20 h-full",
					content: "flex flex-col h-full",
					leftSidebar: "w-256 border-0",
					header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
				}}
				header={
					<BorrowListHeader pageLayout={pageLayout} />
				}
				content={
					<BorrowListTable />
				}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			<BorrowListDialog />
		</React.Fragment>
	)
}

export default BorrowList;
