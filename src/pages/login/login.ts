import { Component } from "@angular/core";
import { NavController, IonicPage } from "ionic-angular";

import { LandingPage } from "../../pages/landing/landing";
import { Menu } from "../../model/menu";

import { PagesServiceProvider } from "../../providers/pages-service/pages-service";
import { SettingServiceProvider } from "../../providers/setting-service/setting-service";
import { LoginServiceProvider } from "../../providers/login-service/login-service";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { AppGlobals } from "../../providers/config";

import { MessageComponent } from "../../components/message/message";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  registerCredentials = { name: "", password: "", encrypted: "" };
  menus: Array<Menu>;
  constructor(
    private nav: NavController,
    private loginService: LoginServiceProvider,
    private userService: UserServiceProvider,
    private message: MessageComponent,
    private global: AppGlobals,
    private settingService: SettingServiceProvider,
    private pagesService: PagesServiceProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
    this.setLoginName();
  }
  login() {
    this.message.showLoading();

    let encryptedstr =
      this.registerCredentials.name + ":" + this.registerCredentials.password;
    let encrypted = btoa(encryptedstr);

    this.registerCredentials.encrypted = encrypted;

    this.loginService.login(this.registerCredentials).subscribe(
      allowed => {
        if (allowed) {
          //this.message.dismissLoading();
          console.log(this.registerCredentials.name);

          //setting login name
          this.userService.setCurrentUser(
            this.registerCredentials.name,
            "",
            "",
            this.registerCredentials.encrypted,
            ""
          );
          //setting login Name
          this.userService.setLoginName(this.registerCredentials.name);

          //setting menu
          this.allMenus();
        } else {
          this.message.showError("Access Denied");
        }
      },
      error => {
        this.message.showError(error);
        //console.log(error);
      }
    );
  }
  setLoginName() {
    this.userService.getLoginName().then(loginName => {
      if (loginName) {
        this.registerCredentials.name = loginName;
      }
    });
  }
  allMenus() {
    this.settingService.allMenus().subscribe(
      data => {
        if (data) {
          this.menus = [];
          for (let i = 0; i < data.length; i++) {
            this.menus.push({
              name: data[i].Name,
              display: data[i].Display,
              icon: data[i].Icon
            });
          }
          if (this.menus) {
            console.log("menu data....");

            console.log(this.menus);

            this.global.setInboxTypes(this.menus);
            this.global.setApprovalTypes(this.menus);
            this.pagesService.setPages(this.menus);

            this.nav.setRoot(LandingPage);
          }
        } else {
          console.log("Access Denied");
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
