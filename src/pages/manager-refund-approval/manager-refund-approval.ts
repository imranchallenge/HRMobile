import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Loading,ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

import { RefundRequestEmployee } from '../../model/RefundRequestEmployee';

import { MessageComponent } from '../../components/message/message';

import { ManagerApprovalServiceProvider } from '../../providers/manager-approval-service/manager-approval-service';
import { ManagerRefundApprovalListPage } from '../../pages/manager-refund-approval-list/manager-refund-approval-list';


@IonicPage()
@Component({
  selector: 'page-manager-refund-approval',
  templateUrl: 'manager-refund-approval.html',
})
export class ManagerRefundApprovalPage {
  authForm : FormGroup;
  requestEmployee:RefundRequestEmployee; 
  statusTypes:any [];
  loading: Loading;
  reqItem:any;
  reqId:string;
  constructor(public nav: NavController, 
              public navParams: NavParams,
              private message:MessageComponent,
              private fb: FormBuilder,
              private loadingCtrl:LoadingController,
              private messageCtrl:MessageComponent,
              private toastCtrl: ToastController,
              private approvalService:ManagerApprovalServiceProvider) {

    this.authForm = this.fb.group({
      'status' :  [null, Validators.compose([Validators.required])],
      'managerComments' :  [null, Validators.compose([Validators.required])]
    }); 

    this.reqItem =  navParams.get('item');
    
    console.log(this.reqItem);
         
    if(this.reqItem)
       this.reqId = this.reqItem.reqId;

    this.requestEmployee = new RefundRequestEmployee();

    this.statusTypes = [ {text: 'Approve', value:'APPROVE'} , {text: 'Reject', value:'REJECT'}];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagerRefundApprovalPage');
    this.employeeDetail();
  }
  employeeDetail(){
    
    this.message.showLoading();

    this.approvalService.employeeRefundDetail(this.reqId).subscribe( data => {
      if (data) {
        console.log(data);
        this.message.dismissLoading(); 

        this.requestEmployee = {
          employee: data.Employee,
          name: data.Name,
          description: data.Description,
          voucher: data.Voucher_Code,
          comments: data.Comments,
          value:data.Value
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
      message: 'Successfully updated the refund status',
      duration: 2000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
     this.nav.setRoot(ManagerRefundApprovalListPage);
    });
    toast.present();
  }
  submitForm(approvalRequest: any):void {
    
        approvalRequest.reqId = this.reqId;
    
        console.log(approvalRequest);
      
          this.showLoading();
          this.approvalService.refundApproveReject(approvalRequest).subscribe( allowed => {
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
      
}
