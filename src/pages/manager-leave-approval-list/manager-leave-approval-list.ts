import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { ManagerApprovalServiceProvider } from '../../providers/manager-approval-service/manager-approval-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

import { MessageComponent } from '../../components/message/message';

import { ManagerLeaveApprovalPage } from '../../pages/manager-leave-approval/manager-leave-approval';
import { LandingPage } from '../../pages/landing/landing';

/**
 * Generated class for the ManagerLeaveApprovalListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manager-leave-approval-list',
  templateUrl: 'manager-leave-approval-list.html',
})
export class ManagerLeaveApprovalListPage {
  currentUser:any;
  user:string;
  approvalItems: Array<{reqId:string,
    number:string,
    employee: string, 
    type:string, 
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
    console.log('ionViewDidLoad ManagerLeaveApprovalListPage');
    this.approvalList();
  }

  approvalList(){
    //this.message.showLoading();
    this.approvalItems = [];

    this.approvalService.employeeList(this.user).subscribe( data => {
      if (data) { 

        console.log(data);
        
        //this.message.dismissLoading(); 
      
        for (let i = 0; i < data.length; i++) {     
          this.approvalItems.push({
              reqId:data[i].ReqId,
              type:data[i].Leave_Type,
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
    this.nav.push(ManagerLeaveApprovalPage, {
      item: item
    });
  }
  landingPage(){
    this.nav.setRoot(LandingPage);
  }
}
