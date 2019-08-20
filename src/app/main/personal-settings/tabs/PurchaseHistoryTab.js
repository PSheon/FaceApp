import React from 'react';
import { FuseAnimateGroup } from '@fuse';
import WidgetPurchaseHistory from '../widgets/WidgetPurchaseHistory';

function PurchaseHistoryTab() {
  return (
    <div className="md:flex">
      <div className="flex flex-col flex-1">
        <FuseAnimateGroup
          enter={{
            animation: "transition.slideUpBigIn"
          }}
        >
          {/* Purchase History */}
          <div className="w-full mb-16">
            <WidgetPurchaseHistory />
          </div>
        </FuseAnimateGroup>
      </div>
    </div>
  );
}

export default PurchaseHistoryTab;
