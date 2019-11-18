import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InboxDetailPage } from './inbox-detail';

@NgModule ({
  declarations: [
    InboxDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(InboxDetailPage),
  ],
})
export class InboxDetailPageModule {}
