import React, { useEffect, useRef } from 'react';
import { FusePageCarded } from '@fuse';
import { useDispatch } from 'react-redux';

import * as Actions from 'app/store/actions';
import UserListTable from './UserListTable';
import UserListHeader from './UserListHeader';
import UserListDialog from './UserListDialog';
import UserListFilterPanel from './UserListFilterPanel';

function UserList() {
  const dispatch = useDispatch();

  const pageLayout = useRef(null);

  useEffect(() => {
    dispatch(
      Actions.getUserList({
        filter: 'user',
        fields: 'role',
        page: 1,
        limit: 20,
        sort: 'updatedAt',
        order: -1
      })
    );
    // dispatch(Actions.getUserData());
  }, [dispatch]);

  return (
    <React.Fragment>
      <FusePageCarded
        classes={{
          contentWrapper: 'p-0 sm:p-24 pb-20 h-full',
          content: 'flex flex-col h-full',
          leftSidebar: 'w-256 border-0',
          header: 'min-h-136'
        }}
        header={<UserListHeader pageLayout={pageLayout} />}
        content={<UserListTable />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <UserListFilterPanel />
      <UserListDialog />
    </React.Fragment>
  );
}

export default UserList;
