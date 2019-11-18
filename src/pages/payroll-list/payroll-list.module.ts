import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayrollListPage } from './payroll-list';

@NgModule({
  declarations: [
    PayrollListPage,
  ],
  imports: [
    IonicPageModule.forChild(PayrollListPage),
  ],
})
export class PayrollListPageModule {}
