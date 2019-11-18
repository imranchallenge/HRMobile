import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayrollDetailPage } from './payroll-detail';

@NgModule({
  declarations: [
    PayrollDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PayrollDetailPage),
  ],
})
export class PayrollDetailPageModule {}
