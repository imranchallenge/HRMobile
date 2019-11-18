import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Loading,LoadingController,
         ToastController,ActionSheetController,Platform,normalizeURL } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';


import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { LandingPage } from '../../pages/landing/landing';

import { ProfileServiceProvider } from '../../providers/profile-service/profile-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { FileHelperServiceProvider } from '../../providers/file-helper-service/file-helper-service';
import { AppGlobals } from '../../providers/config';

import { PersonalDetail } from '../../model/personalDetail';
import { MessageComponent } from '../../components/message/message';


@IonicPage()
@Component({
  selector: 'page-personal-detail',
  templateUrl: 'personal-detail.html',
})
export class PersonalDetailPage {
  authForm : FormGroup;
  maritalStatus:any[];
  disabled:any[];
  disability:any[];
  user:string;
  currentUser:any;
  personalDetailPD:PersonalDetail;
  loading: Loading;
  lastImage: string = null;
  imgName:string = null;
  BASE_URL:string;

  constructor(public nav: NavController, 
              public navParams: NavParams,
              private fb: FormBuilder,
              private profileService:ProfileServiceProvider,
              private userService: UserServiceProvider,
              private messageCtrl: MessageComponent,
              private loadingCtrl:LoadingController,
              private toastCtrl: ToastController, 
              public actionSheetCtrl: ActionSheetController,
              private fileHelperService:FileHelperServiceProvider,
              private camera: Camera, 
              private transfer: Transfer, 
              private filePath: FilePath, 
              public platform: Platform,
              private global:AppGlobals) {

    this.authForm = this.fb.group({
      'dob' : [null, null],
      'maritalStatus' : [null,null],
      'maritalDate' : [null, null],
      'disabled':[null,null],
      'typeofDisability':[null,null],
      'homeTelephone':[null,null],
      'workTelephone':[null,null],
      'mobile':[null,null],
      'physicalAddress1':[null,null],
      'physicalAddress2':[null,null],
      'physicalAddress3':[null,null],
      'physicalAddress4':[null,null],
      'physicalAddressPostalCode':[null,null],
      'physicalAddressCity':[null,null],
      'physicalAddressCountry':[null,null],
      'emergencyContact1Name': [null,null],
      'emergencyContact1Relationship':[null,null],
      'emergencyContact1Number':[null,null],
      'emergencyContact2Name': [null,null],
      'emergencyContact2Relationship':[null,null],
      'emergencyContact2Number':[null,null]
    });

    this.BASE_URL = this.global.BASE_URL;

    this.maritalStatus = [ {text: 'Married', value:'Married'} , 
                           {text: 'Divorced', value:'Divorced'},
                           {text: 'Single', value:'Single'},
                           {text: 'Widowed', value:'Widowed'}];
    this.disabled = [ {text: 'Yes', value:'Yes'} , {text: 'No', value:'No'}];
    this.disability = [ {text: 'N/A', value:'N/A'} ,
                        {text: 'Blind', value:'Blind'} , 
                        {text: 'Deaf', value:'Deaf'}];

    this.currentUser = this.userService.getCurrentUser();
                        
    if(this.currentUser)
        this.user = this.currentUser.loginName;

    this.personalDetailPD = new PersonalDetail();
        
  }
  landingPage(){
    this.nav.setRoot(LandingPage);
  }
  submitForm(personalDetailRequest: any):void {
    console.log('submit called...');
    this.showLoading();

    if(this.authForm.dirty) {
       this.profileService.updatePersonalDetail(personalDetailRequest,this.user).subscribe( allowed => {
            if (allowed) { 
               console.log('Update Personal Detail...');
               console.log(allowed);
            if (this.lastImage !== undefined && this.lastImage !== null) {
              console.log('called upload image...');
              this.userService.setProfilePicture(this.lastImage);
              console.log(allowed);
              this.uploadImage(allowed.Employee);
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
        else {
          console.log('went to else....');
          if (this.lastImage !== undefined && this.lastImage !== null) {
            console.log('called upload image...');
            this.userService.setProfilePicture(this.lastImage);
            this.uploadImage(this.currentUser.number);
          }
          this.dismissLoading();       
          this.presentToastSuccessfull();
        }
    }
        
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalDetailPage');
  }
  presentToastSuccessfull() {
    let toast = this.toastCtrl.create({
      message: 'Personal Detail updated successfully',
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
     this.nav.setRoot(LandingPage);
    });
  
    toast.present();
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter LandingPage');
    console.log(this.user);
   this.personalDetailFetch();
  }
  personalDetailFetch(){
    //this.showLoading()
    this.profileService.personalDetail(this.user).subscribe( data => {
      if (data) { 
        //this.loading.dismiss(); 
        console.log('PERSONAL DETAIL');
        console.log(data);

        this.personalDetailPD.dob = data[0].Date_of_Birth;
        this.personalDetailPD.maritalStatus = data[0].Marital_Status;
        this.personalDetailPD.maritalDate = data[0].Marital_Date;
        this.personalDetailPD.disabled = data[0].Disabled;
        this.personalDetailPD.typeofDisability = data[0].Type_of_Disability;
        this.personalDetailPD.homeTelephone = data[0].Home_Telephone_Number;
        this.personalDetailPD.workTelephone = data[0].Work_Telephone_Number;
        this.personalDetailPD.mobile = data[0].Mobile_Phone_Number;
        this.personalDetailPD.physicalAddress1 = data[0].Physical_Address_Line_1;
        this.personalDetailPD.physicalAddress2 = data[0].Physical_Address_Line_2;
        this.personalDetailPD.physicalAddress3 = data[0].Physical_Address_Line_3;
        this.personalDetailPD.physicalAddress4 = data[0].Physical_Address_Line_4;
        this.personalDetailPD.physicalAddressPostalCode = data[0].Physical_Address_Postal_Code;
        this.personalDetailPD.physicalAddressCity = data[0].Physical_Address_City;
        this.personalDetailPD.physicalAddressCountry = data[0].Physical_Address_Country;
        this.personalDetailPD.emergencyContact1Name = data[0].Emergency_Contact1_Name;
        this.personalDetailPD.emergencyContact2Name = data[0].Emergency_Contact2_Name;
        this.personalDetailPD.emergencyContact1Relationship = data[0].Emergency_Contact1_Relationship;
        this.personalDetailPD.emergencyContact2Relationship = data[0].Emergency_Contact2_Relationship;
        this.personalDetailPD.emergencyContact1Number = data[0].Emergency_Contact1_Number;
        this.personalDetailPD.emergencyContact2Number = data[0].Emergency_Contact2_Number;
        
        console.log(this.personalDetailPD);
        /*
        //setting login user information...
        this.userService.setCurrentUser(this.profileMD.loginName,
                                        this.profileMD.name,
                                        this.profileMD.employee,
                                        this.currentUser.encrypted,
                                        this.profileMD.number);
                                        */
        
      } else {    
        this.messageCtrl.showError("Access Denied");
      }
    },
      error => {
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
                'reqType':'PersonalDetail',
                'screenName':'PER_HRA_Personal_CLI',
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
}
