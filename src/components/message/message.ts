import { Component } from '@angular/core';
import { AlertController,LoadingController, Loading } from 'ionic-angular';
/**
 * Generated class for the MessageComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'message',
  templateUrl: 'message.html'
})
export class MessageComponent {

  loading: Loading;

  constructor(private loadingCtrl:LoadingController, 
              private alertCtrl: AlertController) {
    console.log('Hello MessageComponent Component');
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

  showError(text) {
    if(this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
    
    let message:string;
    
    message = text;
    
    if(text._body)
      {
       try {
        message = JSON.parse(text._body).Message;
       }
       catch(err) {
        message = text;
       }
      }

    let alert = this.alertCtrl.create({
         title: 'Fail',
         subTitle: message,
         buttons: ['OK']
       });
       alert.present(prompt);
  }
}
