import { Component,OnInit, Renderer,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController, 
         Loading,ActionSheetController,Platform,normalizeURL } from 'ionic-angular';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { ListPage } from '../../pages/list/list';
import { LandingPage } from '../../pages/landing/landing';

import { MessageComponent } from '../../components/message/message';

import { UserServiceProvider } from '../../providers/user-service/user-service';
import { LeaveServiceProvider } from '../../providers/leave-service/leave-service';
import { FileHelperServiceProvider } from '../../providers/file-helper-service/file-helper-service';
import { AppGlobals } from '../../providers/config';
import { Leaves } from '../../model/leaves';
/**
 * Generated class for the LeaveRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leave-request',
  templateUrl: 'leave-request.html',
})
export class LeaveRequestPage implements OnInit  {
  
  leaveType:string;
  leaveTypes:any;
  startDate:string;
  endDate:string;
  reasonLeave:string;
  subject:string;
  message:string;
  authForm : FormGroup;
  alternateManagers: any;
  user:string;
  currentUser:any;
  isApplyRequest:boolean = true;
  todayStartDate:string;
  todayEndDate:string;
  types: Array<{title: string, icon:string,value:string}>;
  loading: Loading;
  lastImage: string = null;
  imgName:string = null;
  BASE_URL:string;
  leaveBalances:Leaves;
  accordionExapanded = false;
  @ViewChild("cc") cardContent: any;
  icon: string = "md-arrow-dropright";

  constructor(public nav: NavController,
    public navParams:NavParams,
    private leaveService:LeaveServiceProvider,
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private messageCtrl:MessageComponent,
    private userService: UserServiceProvider,
    private loadingCtrl:LoadingController, 
    public actionSheetCtrl: ActionSheetController,
    private fileHelperService:FileHelperServiceProvider,
    private camera: Camera, 
    private transfer: Transfer, 
    private filePath: FilePath, 
    public platform: Platform,
    private global:AppGlobals,public renderer: Renderer) {
    
    this.BASE_URL = this.global.BASE_URL;

    this.currentUser = this.userService.getCurrentUser();
      
    if(this.currentUser)
      this.user = this.currentUser.loginName;

      this.authForm = this.fb.group({
        'startDate' : [null, Validators.compose([Validators.required])],
        'endDate' : [null, Validators.compose([Validators.required])],
        'leaveContact': [null, Validators.compose([Validators.required])],
        'leaveReason': [null, Validators.compose([Validators.required])],
        'leaveType' : [null, Validators.compose([Validators.required])],
        //'alternateManager' :[null, Validators.compose([Validators.required])],
      });  

      this.todayStartDate = new Date().toISOString();
      this.todayEndDate = new Date().toISOString();

      this.types = [
        { title: 'Leave', icon:'ios-jet',value:'LEAVE'}
      ];
      this.leaveBalances = new Leaves();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveRequestPage');
    this.getLeaveTypes();
    this.getLeaveBalances();
  }
  getLeaveBalances(){
    this.leaveService.leaveBalances(this.user).subscribe( data => {
      if (data) { 
          console.log('Leave Balances');
          //console.log(data);
          this.leaveBalances.annual = data.Annual_Leave;
          this.leaveBalances.sick = data.Sick_Leave;
          this.leaveBalances.compassionate = data.Compassionate_Leave;
          console.log(this.leaveBalances);
      } else {    
        this.messageCtrl.showError("Access Denied");
      }
    },
      error => {
        this.messageCtrl.showError(error);
      });
  }
  getLeaveTypes(){
    this.leaveService.leaveTypes().subscribe( data => {
      if (data) { 
          this.leaveTypes = data;
          console.log(this.leaveTypes);
      } else {    
        this.messageCtrl.showError("Access Denied");
      }
    },
      error => {
        this.messageCtrl.showError(error);
      });
  }
  getAlternateManager(){
    this.leaveService.alternateManagers(this.user).subscribe( data => {
      if (data) { 
          this.alternateManagers = data;
          console.log(this.alternateManagers);
      } else {    
        this.messageCtrl.showError("Access Denied");
      }
    },
      error => {
        console.log(error);
        this.messageCtrl.showError(error);
      });
  }

  submitForm(leaveRequest: any):void {

    this.showLoading();

    this.leaveService.saveLeaveRequest(leaveRequest,this.user).subscribe( allowed => {
      if (allowed) { 

        if (this.lastImage !== undefined && this.lastImage !== null) {
          console.log('called upload image...');
          this.uploadImage(allowed.Id);
        }
        
          this.dismissLoading();       
        this.presentToastSuccessfull();
      } else {
        this.messageCtrl.showError("Access Denied");
      }
    },
      error => {
        this.dismissLoading();       
        this.messageCtrl.showError(error);
      });
  }	
  presentToastSuccessfull() {
    let toast = this.toastCtrl.create({
      message: 'Leave request successfully submitted',
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
     this.nav.setRoot(ListPage,{item:this.types[0]});
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
            'reqType':'Leaves',
            'screenName':'PER_LVE_Absence_Request_emp',
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
private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
toggleAccordion() {
  if (this.accordionExapanded) {
    this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "0px");
    this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "0px 16px");
  } else {
    this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "500px");
    this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "13px 16px");
  }
  this.accordionExapanded = !this.accordionExapanded;
  this.icon = this.icon == "md-arrow-dropright" ? "md-arrow-dropdown" : "md-arrow-dropright";

}
ngOnInit() {
  console.log(this.cardContent.nativeElement);
  this.renderer.setElementStyle(this.cardContent.nativeElement, "webkitTransition", "max-height 500ms, padding 500ms");
}
}
