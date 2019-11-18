import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentInboxDetailPage } from './document-inbox-detail';

@NgModule({
  declarations: [
    DocumentInboxDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DocumentInboxDetailPage),
  ],
})
export class DocumentInboxDetailPageModule {}
