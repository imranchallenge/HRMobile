import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";

import { MessageComponent } from "../../components/message/message";
import { LoginPage } from "../../pages/login/login";

import { UserServiceProvider } from "../../providers/user-service/user-service";
import { ProfileServiceProvider } from "../../providers/profile-service/profile-service";
import { PagesServiceProvider } from "../../providers/pages-service/pages-service";
import { BuzzerServiceProvider } from "../../providers/buzzer-service/buzzer-service";
import { ManagerApprovalServiceProvider } from "../../providers/manager-approval-service/manager-approval-service";

import { AppGlobals } from "../../providers/config";
import { Profile } from "../../model/profile";
import { Page } from "../../model/page";

@IonicPage()
@Component({
  selector: "page-landing",
  templateUrl: "landing.html"
})
export class LandingPage {
  picture: string;
  currentUser: any;
  user: string;
  name: string;
  public profileMD: Profile;
  externalNumber: string;
  pages: Array<Page>;
  unReadCount: string;
  isManager: boolean;
  buzzerEmployeeManagerRequestCount: string;
  resultRowIcon: string = "";
  resultRowText: string = "";
  langingMenu: Array<string>;
  loopData: any[];
  currentPageIndex: number;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private userService: UserServiceProvider,
    private profileService: ProfileServiceProvider,
    private messageCtrl: MessageComponent,
    private pagesService: PagesServiceProvider,
    private buzzerService: BuzzerServiceProvider,
    private global: AppGlobals,
    private approvalService: ManagerApprovalServiceProvider,
    private alertCtrl: AlertController
  ) {
    console.log("Constructor Called....");

    this.profileMD = new Profile();
    this.currentUser = this.userService.getCurrentUser();
    this.picture = "assets/person.jpg";

    this.pages = this.pagesService.getDisplayPages();

    if (this.currentUser) {
      this.user = this.currentUser.loginName;

      console.log(this.currentUser);
    } else {
      this.messageCtrl.showError("User not available");
    }
    this.loopData = [0, 2, 4, 6, 8];

    console.log(this.pages);
  }

  ionViewDidEnter() {
    console.log("ionic View Did Enter Landing Page");
    this.currentPageIndex = 0;
    this.profile(this.user);
    this.buzzerUnReadCount(this.user);
    this.canManager(this.user);
   
  }
  profile(user: string) {
    //this.messageCtrl.showLoading();
    this.profileService.profile(this.user).subscribe(
      data => {
        if (data) {
          //this.loading.dismiss();
          this.profileMD.name = data[0].Name;
          this.profileMD.number = data[0].Number;
          this.profileMD.company = data[0].Company;
          this.profileMD.department = data[0].Department;
          this.profileMD.job_title = data[0].Job_Title;
          this.profileMD.engagement_date = data[0].Engagement_Date;
          this.profileMD.nationality = data[0].Nationality;
          this.profileMD.manager = data[0].Manager;
          this.profileMD.loginName = data[0].Login_Name;
          this.profileMD.employee = data[0].Employee;
          this.profileMD.visaNumber = data[0].Visa_Number;
          this.profileMD.visaStartDate = data[0].Visa_Start_Date;
          this.profileMD.visaEndDate = data[0].Visa_End_Date;
          this.profileMD.passportNumber = data[0].Passport_Number;
          this.profileMD.passportIssueDate = data[0].Passport_Date_Issue;
          this.profileMD.passportExpiryDate = data[0].Passport_Expiry_Date;
          this.profileMD.annualLeave = data[0].Annual_Leave;
          this.profileMD.sickLeave = data[0].Sick_Leave;

          console.log(data);
          //setting login user information...
          this.userService.setCurrentUser(
            this.profileMD.loginName,
            this.profileMD.name,
            this.profileMD.employee,
            this.currentUser.encrypted,
            this.profileMD.number
          );

          console.log("Landing Page called....");

          this.userService.getProfilePicture().then(pic => {
            if (pic === undefined || pic === null)
              this.picture =
                this.global.getPhotoUrl() +
                this.profileMD.employee +
                ".jpg?v=" +
                Math.random();
            else this.picture = pic;
          });

          this.name = this.profileMD.name;

          this.externalNumber = this.profileMD.number;
        } else {
          this.messageCtrl.showError("Access Denied");
        }
      },
      error => {
        this.messageCtrl.showError(error);
      }
    );
  }
  openPage(p) {
    console.log(p);
    let title = p.title;
    let page = this.pagesService.getPage(title);
    console.log(page);

    if (page.component) {
      this.nav.setRoot(page.component);
    }
  }
  openManagerApproval(title: string) {
    let page = this.pagesService.getPage(title);
    console.log(page);

    if (page.component) {
      this.nav.setRoot(page.component);
    }
  }
  nextPage(index) {
    let nextPages = this.pages;

    index = this.loopData[index];

    index = index + 1;

    if (this.pages.length === index) return null;

    return nextPages[index];
  }
  currentPage(index) {
    let currentPages = this.pages;

    index = this.loopData[index];

    if (this.pages.length === index) return null;

    return currentPages[index];
  }
  buzzerUnReadCount(user: string) {
    //this.showLoading()
    this.buzzerService.buzzerCounter(this.user).subscribe(
      data => {
        if (data) {
          this.unReadCount = data;
          console.log('Buzzer Count ....');
          console.log(this.unReadCount);
        } else {
          console.log(data);
        }
      },
      error => {
        console.log(error);
        this.messageCtrl.showError(error);
      }
    );
  }
  canManager(user: string) {
    console.log("manager counter....Landing");

    this.approvalService.isManager(user).subscribe(
      data => {
        if (data) {
          this.isManager = true;
          console.log("is manager called....");
          this.counterEmployeeManagerRequest(user);
        } else {
          console.log(data);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  counterEmployeeManagerRequest(user: string) {
    console.log("changes in.....");

    this.buzzerService.countEmployeeManagerRequest(this.user).subscribe(
      data => {
        if (data) {
          console.log(data);
          this.buzzerEmployeeManagerRequestCount = data;
        } else {
          console.log(data);
          this.buzzerEmployeeManagerRequestCount = "";
        }
      },
      error => {
        console.log(error);
        this.messageCtrl.showError(error);
      }
    );
  }
  logout() {
    let alert = this.alertCtrl.create({
      title: "Logout gulfHR",
      message: "Are sure you want logout?",
      buttons: [
        {
          text: "Yes",
          role: "yes",
          handler: () => {
            this.userService.clearProfilePicture();
            this.nav.setRoot(LoginPage);
          }
        },
        {
          text: "No",
          handler: () => {
            console.log("Buy clicked");
          }
        }
      ]
    });
    alert.present();
  }
}
