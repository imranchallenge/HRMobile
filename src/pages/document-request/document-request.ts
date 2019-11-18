import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController, Loading } from 'ionic-angular';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

import { ListPage } from '../../pages/list/list';
import { LandingPage } from '../../pages/landing/landing';

import { MessageComponent } from '../../components/message/message';

import { UserServiceProvider } from '../../providers/user-service/user-service';
import { DocumentServiceProvider } from '../../providers/document-service/document-service';

/**
 * Generated class for the DocumentRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-document-request',
  templateUrl: 'document-request.html',
})
export class DocumentRequestPage {

  documentTypes:any;
  authForm : FormGroup;
  languages: any;
  user:string;
  currentUser:any;
  types: Array<{title: string, icon:string,value:string}>;
  loading: Loading;

  constructor(public nav: NavController,
    public navParams:NavParams,
    private documentService:DocumentServiceProvider,
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private messageCtrl:MessageComponent,
    private userService: UserServiceProvider,
    private loadingCtrl:LoadingController) {
    
      this.currentUser = this.userService.getCurrentUser();
    
  if(this.currentUser)
    this.user = this.currentUser.loginName;
    
    this.authForm = this.fb.group({
      'documentType' : [null, Validators.compose([Validators.required])],
      'purpose': [null, null],
      'bankName': [null, null],
      'remark' :[null, null]
    }); 
    this.languages = ['English','Arabic'];
    
    this.types = [
      { title: 'Request',icon:'ios-book',value:'DOCUMENT'}
    ];

  }
  
  getDocumentTypes(){
    this.documentService.documentTypes().subscribe( data => {
      if (data) { 
          this.documentTypes = data;
          console.log(this.documentTypes);
      } else {    
        this.messageCtrl.showError("Access Denied");
      }
    },
      error => {
        this.messageCtrl.showError(error);
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentRequestPage');
    this.getDocumentTypes();
  }
     submitForm(documentRequest: any):void {
    
      this.showLoading();
      
          this.documentService.saveDocumentRequest(documentRequest).subscribe( allowed => {
            if (allowed) { 
              this.dismissLoading();       
              this.presentToast();
            } else {
              this.messageCtrl.showError("Access Denied");
            }
          },
            error => {
              this.dismissLoading();
              this.messageCtrl.showError(error);
            });
      }	
      presentToast() {
        let toast = this.toastCtrl.create({
          message: 'Document request successfully submitted',
          duration: 2000,
          position: 'bottom'
        });
      
        toast.onDidDismiss(() => {
         this.nav.setRoot(ListPage,{ item:this.types[0] } );
        });
      
        toast.present();
      }
      landingPage(){
        this.nav.setRoot(LandingPage);
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
}
