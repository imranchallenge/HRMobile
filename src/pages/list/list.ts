import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { InboxDetailPage } from '../../pages/inbox-detail/inbox-detail';
import { InboxTypePage } from '../../pages/inbox-type/inbox-type';
import { LandingPage } from '../../pages/landing/landing';
import { CancelLeavePage } from '../../pages/cancel-leave/cancel-leave';

import { InboxServiceProvider } from '../../providers/inbox-service/inbox-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

import { MessageComponent } from '../../components/message/message';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  user:string;
  currentUser:any;
  inboxType:any;
  selectedInboxType:string;

  inboxItems: Array<{id:string,
                    type:string,
                    reqBy: string, 
                    description:string, 
                    reqDate: string, 
                    comments:string,
                    awaitingApproval:string,
                    canAction:boolean,
                    msgId:string,
                    status: string,
                    noofDays:string}>;

  constructor(public nav: NavController, 
              public navParams: NavParams,
              private inboxService:InboxServiceProvider,
              private message:MessageComponent,
              private userService: UserServiceProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    //this.selectedItem = navParams.get('item');

    this.inboxType = navParams.get('item');

    console.log('Leave Inbox type ..');

    console.log(this.inboxType);

    if(this.inboxType === undefined)
      this.nav.setRoot(InboxTypePage);

    this.selectedInboxType = this.inboxType.value;

    console.log(this.selectedInboxType);

    this.currentUser = this.userService.getCurrentUser();

    console.log(this.currentUser);
    
        if(this.currentUser)
           this.user = this.currentUser.loginName;
   
    this.inboxItems = [];
  }
  ionViewDidEnter(){
    console.log(this.user);
    this.inbox();
    console.log('inbox item values...');
    console.log(this.inboxItems)
  }
  inbox(){
    this.message.showLoading();
    this.inboxItems = [];
   
    ///console.log(this.userService.getInboxTypeSelection());

    console.log(this.selectedInboxType);

    this.inboxService.inbox(this.user,this.selectedInboxType).subscribe( data => {
      if (data) { 
        this.message.dismissLoading(); 
        //console.log(data[0].Description);
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
              status: data[i].Status,
              noofDays:data[i].NoofDays
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
    console.log('Moving Leave Item...');
    console.log(item);

    let movingPage;

    if(item.status === 'REQUESTED' && item.type === 'LEAVE') {
      movingPage = CancelLeavePage
    }
    else {
      movingPage = InboxDetailPage
    }

    this.nav.push(movingPage, {
      item: item
    });
  }
  landingPage(){
    this.nav.setRoot(LandingPage);
  }
}
