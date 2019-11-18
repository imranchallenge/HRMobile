import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerLeaveApprovalPage } from './manager-leave-approval';

@NgModule({
  declarations: [
    ManagerLeaveApprovalPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagerLeaveApprovalPage),
  ],
})
export class ManagerLeaveApprovalPageModule {}
