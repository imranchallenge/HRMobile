import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Loading,ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

import { ManagerApprovalServiceProvider } from '../../providers/manager-approval-service/manager-approval-service';

import { MessageComponent } from '../../components/message/message';

import { RequestEmployee } from '../../model/RequestEmployee';
import { ManagerLeaveApprovalListPage } from '../../pages/manager-leave-approval-list/manager-leave-approval-list';

/**
 * Generated class for the ManagerLeaveApprovalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manager-leave-approval',
  templateUrl: 'manager-leave-approval.html',
})
export class ManagerLeaveApprovalPage {
  currentUser:any;
  user:string;
  requestEmployee:RequestEmployee; 
  reqId:string;
  reqItem:any;
  authForm : FormGroup;
  statusTypes:any [];
  loading: Loading;

  constructor(public nav: NavController, 
    public navParams: NavParams,
    private approvalService:ManagerApprovalServiceProvider,
    private message:MessageComponent,private fb: FormBuilder,
    private loadingCtrl:LoadingController,
    private messageCtrl:MessageComponent,
    private toastCtrl: ToastController) {

      this.authForm = this.fb.group({
        'type' :  [null, Validators.compose([Validators.required])]
      }); 

      this.reqItem =  navParams.get('item');

      console.log(this.reqItem);
     
      if(this.reqItem)
         this.reqId = this.reqItem.reqId;

      this.requestEmployee = new RequestEmployee();

      this.statusTypes = [ {text: 'Approve', value:'APPROVE'} , {text: 'Reject', value:'REJECT'}];

      console.log(this.reqId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagerLeaveApprovalPage');
    this.employeeDetail();
  }
  employeeDetail(){
    
    this.message.showLoading();

    this.approvalService.employeeDetail(this.reqId).subscribe( data => {
      if (data) {
        console.log(data);
        this.message.dismissLoading(); 

        this.requestEmployee = {
          employee: data.Employee,
          name: data.Name,
          description: data.Description,
          numberOfDays: data.Number_of_Days,
          halfDays:data.Half_Days,
          comments: data.Comments,
          leaveBalance : data.Leave_Balance,
          reqId: data.ReqId,
          intervalMonth : data.Interval_Month,
          intervalYear : data.Interval_Year
        };
      }
      else {    
        this.message.showError("Access Denied");
      }
    },
      error => {
        this.message.showError(error);
      });
   }
   submitForm(approvalRequest: any):void {

    approvalRequest.reqId = this.reqId;

    console.log(approvalRequest);
    
      this.showLoading();
      this.approvalService.leaveApproveReject(approvalRequest).subscribe( allowed => {
              if (allowed) { 
                console.log(allowed);
                this.dismissLoading();       
                this.presentToastSuccessfully();
              } else {
                this.messageCtrl.showError("Access Denied");
              }
            },
              error => {
                this.dismissLoading();
                this.messageCtrl.showError(error);
              });
  }
  showLoading() {
    if(!this.loading){
      console.log('create loading');
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
   }
  }
  dismissLoading() {
    if(this.loading)
      console.log('dismiss loading');
      this.loading.dismiss();
      this.loading = null;
   }
   presentToastSuccessfully() {
    let toast = this.toastCtrl.create({
      message: 'Successfully updated the leave status',
      duration: 2000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
     this.nav.setRoot(ManagerLeaveApprovalListPage);
    });
    toast.present();
  }
}
