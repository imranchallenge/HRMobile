import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams } from 'ionic-angular';

import { PayrollDetailPage } from '../../pages/payroll-detail/payroll-detail';
import { LandingPage } from '../../pages/landing/landing';

import { PayrollServiceProvider } from '../../providers/payroll-service/payroll-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

import { MessageComponent } from '../../components/message/message';
/**
 * Generated class for the PayrollListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payroll-list',
  templateUrl: 'payroll-list.html',
})
export class PayrollListPage {
  payrollItems: Array<{interval:string,intervalName:string}>;
  user:string;
  currentUser:any;

  constructor(public nav: NavController, 
    public navParams: NavParams,
    private payrollService:PayrollServiceProvider,
    private message:MessageComponent,
    private userService: UserServiceProvider) {

    this.currentUser = this.userService.getCurrentUser();

    if(this.currentUser)
       this.user = this.currentUser.loginName;
      
    this.payrollItems = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayrollListPage');
    this.payroll();
  }
  payroll(){
    this.message.showLoading();
    this.payrollItems = [];
    this.payrollService.payrollList(this.user).subscribe( data => {
      if (data) { 
        //this.message.dismissLoading(); 
        console.log(data[0].Interval);
        for (let i = 0; i < data.length; i++) {     
          this.payrollItems.push({
            interval:data[i].Interval,
            intervalName:data[i].IntervalName
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

    this.nav.push(PayrollDetailPage, {
      item: item
    });
    
  }
  landingPage(){
    this.nav.setRoot(LandingPage);
  }
}
