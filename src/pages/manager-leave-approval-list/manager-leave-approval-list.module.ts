import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerLeaveApprovalListPage } from './manager-leave-approval-list';

@NgModule({
  declarations: [
    ManagerLeaveApprovalListPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagerLeaveApprovalListPage),
  ],
})
export class ManagerLeaveApprovalListPageModule {}
