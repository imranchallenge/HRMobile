import { Component, ViewChild } from "@angular/core";
import { Nav, Platform, Content, AlertController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

import { LoginPage } from "../pages/login/login";

import { UserServiceProvider } from "../providers/user-service/user-service";
import { ManagerApprovalServiceProvider } from "../providers/manager-approval-service/manager-approval-service";
import { AppGlobals } from "../providers/config";

import { Page } from "../model/page";
import { Menu } from "../model/menu";

import { PagesServiceProvider } from "../providers/pages-service/pages-service";
import { NotificationServiceProvider } from "../providers/notification-service/notification-service";
import { SettingPage } from "../pages/setting/setting";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(Content) content: Content;

  currentUser: any;
  name: string;
  number: string;
  picture: string;
  unRead: string;
  rootPage: any = LoginPage;
  isManager: boolean;
  pages: Array<Page>;
  buzzerEmployeeManagerRequestCount: string;
  menus: Array<Menu>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private userService: UserServiceProvider,
    private pagesService: PagesServiceProvider,
    private notificationService: NotificationServiceProvider,
    private global: AppGlobals,
    private sqlite: SQLite,
    private approvalService: ManagerApprovalServiceProvider,
    private alertCtrl: AlertController
  ) {
    this.initializeApp();

    this.menus = [];
    //this.storage.set("picture","no-change");
    //this.pages = this.pagesService.getPages();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      console.log("called device ready method");

      this.getData();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log('Calling open page....');
    if (page.component) {
      this.nav.setRoot(page.component);
    } else if (page.title === "Logout") {
      this.logout();
    } else {
      this.nav.setRoot(SettingPage);
      this.pages = [];
    }
  }
  menuOpened() {
    console.log("menuOpend......");
    this.name = "Guest";
    this.currentUser = this.userService.getCurrentUser();
    this.picture = "assets/person.jpg";

    if (this.currentUser) {
      this.name = this.currentUser.userName;
      if (this.currentUser.number) {
        try {
          this.userService.getProfilePicture().then(pic => {
            if (pic === undefined || pic === null) {
              console.log("called to get pic");
              this.picture =
                this.global.getPhotoUrl() +
                this.currentUser.number +
                ".jpg?v=" +
                Math.random();
              this.userService.setProfilePicture(this.picture);
            } else this.picture = pic;
          });

          this.canManager(this.currentUser.loginName);

          //buzzer counter
          this.buzzerUnReadCount(this.currentUser.loginName);

          console.log(this.picture);
        } catch (ex) {
          console.log("calling exception");
        }
        this.content.resize();
      }
    }
    this.nav.setRoot(this.nav.getActive().component);
  }
  doRefresh(refresher) {
    console.log("Begin async operation", refresher);

    setTimeout(() => {
      console.log("Async operation has ended");
      refresher.complete();
    }, 2000);
  }
  buzzerUnReadCount(user: string) {
    console.log("buzzer counter....");
    this.notificationService.buzzerCount(user).subscribe(
      data => {
        if (data) {
          this.unRead = data;
        } else {
          console.log(data);
          this.unRead = "";
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  canManager(user: string) {
    console.log("manager counter....");
    var tempPages = this.pagesService.getPages().slice();
    this.approvalService.isManager(user).subscribe(
      data => {
        if (data) {
          this.pages = tempPages;
          this.counterEmployeeManagerRequest(user);
        } else {
          console.log(data);
          var index = tempPages.findIndex(element => {
            return element.title === "Manager Approval";
          });
          if (index > 0) {
            tempPages.splice(index, 1);
            this.pages = tempPages;
            this.nav.setRoot(this.nav.getActive().component);
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  counterEmployeeManagerRequest(user: string) {
    console.log("employee buzzer counter....");
    this.approvalService.countEmployeeManagerRequest(user).subscribe(
      data => {
        if (data) {
          this.buzzerEmployeeManagerRequestCount = data;
        } else {
          console.log(data);
          this.buzzerEmployeeManagerRequestCount = "";
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  getData() {
    this.sqlite
      .create({
        name: "gulfHR.db",
        location: "default"
      })
      .then((db: SQLiteObject) => {
        db
          .executeSql(
            "CREATE TABLE IF NOT EXISTS setting(rowid INTEGER PRIMARY KEY, date TEXT, picture TEXT, base TEXT,description TEXT)",
            {}
          )
          .then(res => console.log("created log"))
          .catch(e => console.log(e));
        db
          .executeSql("SELECT * FROM setting ORDER BY rowid DESC", {})
          .then(res => {
            if (res.rows.length === 0) this.nav.setRoot(SettingPage);
            else {
              this.global.setBaseUrl(res.rows.item(0).base);
              this.global.setPicUrl(res.rows.item(0).picture);
              //if (this.isValidDate()) this.nav.setRoot(SettingPage);
            }
          })
          .catch(e => console.log(e));
      })
      .catch(e => {
        console.log("setting url");
      });
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
            this.pages = [];
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
  isValidDate() {
    var day = Number(29),
      month = Number(8),
      year = Number(2018);

    var date = new Date();

    if (
      date.getFullYear() >= year &&
      date.getMonth() >= month - 1 &&
      date.getDate() >= day
    )
      return true;

    return false;
  }
}
