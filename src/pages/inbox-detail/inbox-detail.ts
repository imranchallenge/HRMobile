import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InboxDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inbox-detail',
  templateUrl: 'inbox-detail.html',
})
export class InboxDetailPage {
  
  inbox:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.inbox = navParams.get('item');
  }

  ionViewDidLoad()  {
    console.log('ionViewDidLoad InboxDetailPage');
    console.log(this.inbox);
  }

}
