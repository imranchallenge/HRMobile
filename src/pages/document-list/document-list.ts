import { Component } from '@angular/core';
import { NavController, NavParams,IonicPage } from 'ionic-angular';

import { DocumentInboxDetailPage } from '../../pages/document-inbox-detail/document-inbox-detail';

import { InboxServiceProvider } from '../../providers/inbox-service/inbox-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

import { MessageComponent } from '../../components/message/message';

/**
 * Generated class for the DocumentListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-document-list',
  templateUrl: 'document-list.html',
})
export class DocumentListPage {
  icons: string[];
  user:string;
  currentUser:any;

  inboxItems: Array<{id:string,
                    type:string,
                    reqBy: string, 
                    description:string, 
                    reqDate: string, 
                    comments:string,
                    awaitingApproval:string,
                    canAction:boolean,
                    msgId:string,
                    status: string}>;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private inboxService:InboxServiceProvider,
    private message:MessageComponent,
    private userService: UserServiceProvider) {

      this.currentUser = this.userService.getCurrentUser();
      
          if(this.currentUser)
             this.user = this.currentUser.loginName;
     
      this.inboxItems = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentListPage');
    this.inbox();
  }
  inbox(){
    this.message.showLoading();
    this.inboxItems = [];
    this.inboxService.documentInbox().subscribe( data => {
      if (data) { 
        this.message.dismissLoading(); 
        for (let i = 0; i < data.length; i++) {     
        this.inboxItems.push({
              id:data[i].Id,
              type:data[i].Type,
              reqBy: data[i].RequestedBy,
              description:data[i].Description,
              reqDate: data[i].RequestDate,
              comments : data[i].Comments,
              awaitingApproval:data[i].AwaitingApproval,
              canAction:data[i].CanAction,
              msgId : data[i].MsgId,
              status: data[i].Status
        }); 
      }
      } else {    
        this.message.showError("Access Denied");
      }
    },
      error => {
        this.message.showError(error);
      });
   }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DocumentInboxDetailPage, {
      item: item
    });
  }
}
