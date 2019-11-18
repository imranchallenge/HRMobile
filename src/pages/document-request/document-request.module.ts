import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentRequestPage } from './document-request';

@NgModule({
  declarations: [
    DocumentRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(DocumentRequestPage),
  ],
})
export class DocumentRequestPageModule {}
