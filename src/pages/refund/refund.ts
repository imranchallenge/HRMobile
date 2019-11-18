import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController, Loading,
         Platform,normalizeURL,ActionSheetController } from 'ionic-angular';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

import { Transfer, TransferObject  } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { MessageComponent } from '../../components/message/message';
import { ListPage } from '../../pages/list/list';
import { LandingPage } from '../../pages/landing/landing';

import { UserServiceProvider } from '../../providers/user-service/user-service';
import { RefundServiceProvider } from '../../providers/refund-service/refund-service';
import { AppGlobals } from '../../providers/config';
import { FileHelperServiceProvider } from '../../providers/file-helper-service/file-helper-service';

/**
 * Generated class for the RefundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-refund',
  templateUrl: 'refund.html',
})
export class RefundPage {
  refundTypes:any;
  authForm : FormGroup;
  user:string;
  currentUser:any;
  types: Array<{title: string, icon:string,value:string}>;
  todayStartDate:string;
  loading: Loading;
  lastImage: string = null;
  imgName:string = null;
  BASE_URL:string;

  constructor(public nav: NavController,
    public navParams:NavParams,
    private refundService:RefundServiceProvider,
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private messageCtrl:MessageComponent,
    private userService: UserServiceProvider,
    private loadingCtrl:LoadingController,
    private camera: Camera, 
    private transfer: Transfer, 
    private filePath: FilePath, 
    public platform: Platform,
    public actionSheetCtrl: ActionSheetController,
    public fileHelperService:FileHelperServiceProvider,
    private global:AppGlobals) {
    this.authForm = this.fb.group({
      'refundType' : [null, Validators.compose([Validators.required])],
      'transactionDate' : [null, Validators.compose([Validators.required])],
      'value': [null, Validators.compose([Validators.required])],
      'description': [null, null],
      'noOfExpenses' : [null, Validators.compose([Validators.required])],
      //'alternateManager' :[null, Validators.compose([Validators.required])],
    }); 
   
    this.BASE_URL = this.global.BASE_URL;

    this.currentUser = this.userService.getCurrentUser();
    
    if(this.currentUser)
       this.user = this.currentUser.loginName;
   
    this.types = [
      { title: 'Refund',icon:'ios-aperture',value:'REFUND' }
    ];

    this.todayStartDate = new Date().toISOString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RefundPage');
    this.getRefundTypes();
  }
  getRefundTypes(){
    this.refundService.refundTypes().subscribe( data => {
      if (data) { 
          this.refundTypes = data;
          console.log(this.refundTypes);
      } else {    
        this.messageCtrl.showError("Access Denied");
      }
    },
      error => {
        this.messageCtrl.showError(error);
      });
  }
  submitForm(refundRequest: any):void {
  
    this.showLoading();
    this.refundService.saveRefundRequest(refundRequest).subscribe( allowed => {
            if (allowed) { 
              console.log(allowed);

              if (this.lastImage !== undefined && this.lastImage !== null) {
                console.log('called upload image...');
                this.uploadImage(allowed.Id);
              }
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
  
      presentToastSuccessfully() {
        let toast = this.toastCtrl.create({
          message: 'Refund request successfully submitted',
          duration: 2000,
          position: 'bottom'
        });
      
        toast.onDidDismiss(() => {
         this.nav.setRoot(ListPage,{ item:this.types[0] });
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
     
      
    private presentToast(text) {
        let toast = this.toastCtrl.create({
          message: text,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
      public presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
          title: 'Select Image Source',
          buttons: [
            {
              text: 'Load from Library',
              handler: () => {
                this.fileHelperService.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY).then(
                  (imagePath) => {
                          var newFileName = this.fileHelperService.createFileName();
                          if (this.platform.is('android')) {
                              this.filePath.resolveNativePath(imagePath).then(filePath => {
                              let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                              let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                          
                              this.fileHelperService.copyFileToLocalDir(correctPath, currentName, newFileName).then(success => {
                            
                              this.lastImage =  this.fileHelperService.pathForImage(newFileName);
                              
                              this.imgName = newFileName;
                            },
                            err => {
                               this.presentToast(err); 
                            }
                          );
                        });
                      }
                      else {
                        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                        this.fileHelperService.copyFileToLocalDir(correctPath, currentName, newFileName).then(success => {
                          
                            this.lastImage =  this.fileHelperService.pathForImage(newFileName);

                            if(this.platform.is('ios'))
                               this.lastImage = normalizeURL(this.lastImage);
                            
                            this.imgName = newFileName;
                          },
                          err => {
                             this.presentToast(err); 
                          }
                        );
                      }
                     }, (err) => {
                       this.presentToast(err);
                    });
              }
            },
            {
              text: 'Use Camera',
              handler: () => {
                this.fileHelperService.takePicture(this.camera.PictureSourceType.CAMERA).
                then((imagePath) => {
                  var newFileName = this.fileHelperService.createFileName();

                  var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                  var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);

                  this.fileHelperService.copyFileToLocalDir(correctPath, currentName, newFileName).then(success => {
                   
                    this.lastImage =  this.fileHelperService.pathForImage(newFileName);
                      
                     if(this.platform.is('ios'))
                         this.lastImage = normalizeURL(this.lastImage);
                      
                      this.imgName = newFileName;
                    },
                    err => {
                       this.presentToast(err); 
                    }
                  );
                }, (err) => {
                   this.presentToast(err);
                });
              }
            },
            {
              text: 'Cancel',
              role: 'cancel'
            }
          ]
        });
        actionSheet.present();
      }
  public uploadImage(id) {
    // Destination URL
    var url = this.BASE_URL + "upload";
    // File for Upload
     var targetPath = this.lastImage;
    // File name only
    var filename = this.imgName;

    var options = {
     fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'id': id,
                'reqType':'Refunds',
                'screenName':'PER_REM_Refund_Request_Emp',
                'user':this.user,
                'employeeId':this.currentUser.number,
                'employeeNumber':this.currentUser.externalNumber },
                 headers: {'Authorization': 'Basic ' + this.currentUser.encrypted}
     };
 
    const fileTransfer: TransferObject = this.transfer.create();
 
    this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
   });
   this.loading.present();
 
    // Use the FileTransfer to upload the image
   fileTransfer.upload(targetPath, url, options).then(data => {
     this.loading.dismissAll();
     this.presentToast('Image succesful uploaded.');
   }, err => {
    this.loading.dismissAll();
    this.presentToast(JSON.stringify(err));
    });
  }

}
