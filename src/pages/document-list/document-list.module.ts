import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentListPage } from './document-list';

@NgModule({
  declarations: [
    DocumentListPage,
  ],
  imports: [
    IonicPageModule.forChild(DocumentListPage),
  ],
})
export class DocumentListPageModule {}
