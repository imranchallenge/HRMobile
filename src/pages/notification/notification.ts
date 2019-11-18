import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserServiceProvider } from '../../providers/user-service/user-service';
import { BuzzerServiceProvider } from '../../providers/buzzer-service/buzzer-service';

import { MessageComponent } from '../../components/message/message';
import { LandingPage } from '../../pages/landing/landing';
import { NotificationDetailPage } from '../../pages/notification-detail/notification-detail';


/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  buzzerItems: Array<{id:string,type: string, detail:string,reminderDate: string,read:boolean}>;
  icons: string[];
  user:string;
  currentUser:any;
 
  constructor(public nav: NavController, 
    public navParams: NavParams,
    private buzzerService:BuzzerServiceProvider,
    private message:MessageComponent,
    private userService: UserServiceProvider) {

      this.currentUser = this.userService.getCurrentUser();
      
          if(this.currentUser)
             this.user = this.currentUser.loginName;
     
  }
  /*
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
    this.buzzer();
  }
  */
 ionViewDidEnter() {
    console.log('ionViewDidEnter NotificationPage');
    this.buzzer();
  }
  
  buzzer(){
    //this.message.showLoading();
    this.buzzerItems = [];

    this.buzzerService.buzzer(this.user).subscribe( data => {
      if (data) { 
        console.log(data);

        for (let i = 0; i < data.length; i++) {     
        this.buzzerItems.push({
              id:data[i].ID,
              type:data[i].Type,
              detail:data[i].Detail,
              reminderDate:data[i].Info_Date,
              read : data[i].Read
        });  
        //this.message.dismissLoading(); 
      }
      } else {    
        this.message.showError("Access Denied");
      }
    },
      error => {
        this.message.showError(error);
      });
   }
   landingPage(){
    this.nav.setRoot(LandingPage);
  }

  markRead(buzzerItem) {

    //console.log(buzzerItem); 
    if (this.currentUser)
    {
      buzzerItem.employee = this.currentUser.number; 
      console.log('Buzzer Employee.....');
      console.log(buzzerItem);
    
    this.buzzerService.updateRead(buzzerItem).subscribe( allowed => {
        if (allowed) { 
            console.log(allowed);
        } else {
            console.log(allowed);
        }
      },
        error => {
            console.log(error);
        });
      }
      else{
        this.message.showError('no user found');
      }
  }
  
  itemTapped(event, item) {
    
    console.log('called.....');

    this.markRead(item);
    
    this.nav.push(NotificationDetailPage, {
      item: item
    });
    
  }
}
