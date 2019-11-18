import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DocumentInboxDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-document-inbox-detail',
  templateUrl: 'document-inbox-detail.html',
})
export class DocumentInboxDetailPage {

  inbox:any;
  
    constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.inbox = navParams.get('item');
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad DocumentDetailPage');
      console.log(this.inbox);
    }
}
