import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerRefundApprovalListPage } from './manager-refund-approval-list';

@NgModule({
  declarations: [
    ManagerRefundApprovalListPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagerRefundApprovalListPage),
  ],
})
export class ManagerRefundApprovalListPageModule {}
