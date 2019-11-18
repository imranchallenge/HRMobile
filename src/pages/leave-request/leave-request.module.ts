import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveRequestPage } from './leave-request';

@NgModule({
  declarations: [
    LeaveRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveRequestPage),
  ],
})
export class LeaveRequestPageModule {}
