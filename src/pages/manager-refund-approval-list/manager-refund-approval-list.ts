import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ManagerApprovalServiceProvider } from '../../providers/manager-approval-service/manager-approval-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

import { MessageComponent } from '../../components/message/message';

import { ManagerRefundApprovalPage } from '../../pages/manager-refund-approval/manager-refund-approval';
import { LandingPage } from '../../pages/landing/landing';

@IonicPage()
@Component({
  selector: 'page-manager-refund-approval-list',
  templateUrl: 'manager-refund-approval-list.html',
})
export class ManagerRefundApprovalListPage {
  currentUser:any;
  user:string;
  approvalItems: Array<{reqId:string,
    number:string,
    employee: string, 
    voucher:string, 
    reqDate: string}>;

    constructor(public nav: NavController, 
      public navParams: NavParams,
      private approvalService:ManagerApprovalServiceProvider,
      private userService: UserServiceProvider,
      private message:MessageComponent) {
  
        this.currentUser = this.userService.getCurrentUser();
        
            console.log(this.currentUser);
            
                if(this.currentUser)
                   this.user = this.currentUser.loginName;
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagerRefundApprovalListPage');
    this.approvalList();
  }
  approvalList(){
    //this.message.showLoading();
    this.approvalItems = [];

    this.approvalService.employeeRefundList(this.user).subscribe( data => {
      if (data) { 

        console.log(data);
        
        //this.message.dismissLoading(); 
      
        for (let i = 0; i < data.length; i++) {     
          this.approvalItems.push({
              reqId:data[i].ReqId,
              voucher:data[i].Voucher,
              employee: data[i].Employee,
              number:data[i].Number,
              reqDate: data[i].RequestDate
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
    this.nav.push(ManagerRefundApprovalPage, {
      item: item
    });
  }
  landingPage(){
    this.nav.setRoot(LandingPage);
  }
}
