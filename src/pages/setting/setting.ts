import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  LoadingController,
  Loading
} from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { LoginPage } from "../../pages/login/login";
import { AppGlobals } from "../../providers/config";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageComponent } from "../../components/message/message";

@IonicPage()
@Component({
  selector: "page-setting",
  templateUrl: "setting.html"
})
export class SettingPage {
  authForm: FormGroup;
  loading: Loading;
  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private global: AppGlobals,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private messageCtrl: MessageComponent
  ) {
    this.authForm = this.fb.group({
      licensekey: [null, Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SettingPage");
  }
  submitForm(settingRequest: any): void {
    this.showLoading();
    this.saveData(settingRequest);
  }

  saveData(settingRequest: any) {
    let encoded = settingRequest.licensekey;
    let rawText = atob(encoded);
    let splitArray = rawText.split(";");
    let secretKey = "random99*";
    let secretText;

    if (splitArray.length === 3) {
      secretText = splitArray[2];
      if (secretKey === secretText) {
        this.sqlite
          .create({
            name: "gulfHR.db",
            location: "default"
          })
          .then((db: SQLiteObject) => {
            db
              .executeSql("INSERT INTO setting VALUES(NULL,?,?,?,?)", [
                new Date(),
                splitArray[1],
                splitArray[0],
                "Url settings"
              ])
              .then(res => {
                this.global.setBaseUrl(splitArray[0]);
                this.global.setPicUrl(splitArray[1]);
                this.dismissLoading();
                this.presentToastSuccessfull();
              })
              .catch(e => {
                this.dismissLoading();
                this.messageCtrl.showError(e);
              });
          })
          .catch(e => {
            this.dismissLoading();
            this.messageCtrl.showError(e);
          });
      } else {
        alert("Key is not correct");
      }
    } else {
      alert("key is not correct");
    }
  }
  dismissLoading() {
    if (this.loading) console.log("dismiss loading");
    this.loading.dismiss();
    this.loading = null;
  }
  presentToastSuccessfull() {
    let toast = this.toastCtrl.create({
      message: "Setting save sucessfully",
      duration: 3000,
      position: "bottom"
    });

    toast.onDidDismiss(() => {
      this.nav.setRoot(LoginPage);
    });

    toast.present();
  }
  showLoading() {
    if (!this.loading) {
      console.log("create loading");
      this.loading = this.loadingCtrl.create({
        content: "Please wait...",
        dismissOnPageChange: true
      });
      this.loading.present();
    }
  }
}
