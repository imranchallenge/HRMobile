import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { ProfileServiceProvider } from "../../providers/profile-service/profile-service";
import { UserServiceProvider } from "../../providers/user-service/user-service";

import { MessageComponent } from "../../components/message/message";
import { LandingPage } from "../../pages/landing/landing";

import { Profile } from "../../model/profile";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  user: string;
  currentUser: any;
  public profileMD: Profile;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private profileService: ProfileServiceProvider,
    private userService: UserServiceProvider,
    private messageCtrl: MessageComponent
  ) {
    this.currentUser = this.userService.getCurrentUser();

    if (this.currentUser) this.user = this.currentUser.loginName;

    this.profileMD = new Profile();
  }

  ionViewDidEnter() {
    console.log(this.user);
    this.profile(this.user);
  }

  profile(user: string) {
    //this.showLoading()
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
      }
    );
  }
  landingPage() {
    this.nav.setRoot(LandingPage);
  }
}
