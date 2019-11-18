import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams} from 'ionic-angular';

import { PayrollServiceProvider } from '../../providers/payroll-service/payroll-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

import { MessageComponent } from '../../components/message/message';

/**
 * Generated class for the PayrollDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payroll-detail',
  templateUrl: 'payroll-detail.html',
})
export class PayrollDetailPage {

  payroll:any;
  user:string;
  interval:string;
  employeeName:string;
  basicSalary:string;
  totalEarnings:string;
  totalDeductions:string;
  netPay:string;
  currentUser:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private payrollService:PayrollServiceProvider,
    private message:MessageComponent,
    private userService: UserServiceProvider) {

    this.currentUser = this.userService.getCurrentUser();

    if(this.currentUser)
      this.user = this.currentUser.loginName;

    this.payroll = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayrollDetailPage');
    console.log(this.payroll);
    this.payrollDetail();
  }
  payrollDetail(){
    this.message.showLoading();
        this.payrollService.payrollDetail(this.user,this.payroll.interval).subscribe( data => {
      if (data) { 
          console.log(data.Interval);
            this.interval = data.Interval;
            this.employeeName = data.EmployeeName;
            this.basicSalary = data.BasicSalary;
            this.totalEarnings = data.TotalEarnings;
            this.totalDeductions = data.TotalDeductions;
            this.netPay = data.NetPay;
      } else {    
        this.message.showError("Access Denied");
      }
    },
      error => {
        this.message.showError(error);
      });
   }
 
}
