import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InboxTypePage } from './inbox-type';

@NgModule({
  declarations: [
    InboxTypePage,
  ],
  imports: [
    IonicPageModule.forChild(InboxTypePage),
  ],
})
export class InboxTypePageModule {}
