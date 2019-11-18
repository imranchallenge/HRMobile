import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  Loading,
  ToastController
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { InboxTypePage } from "../../pages/inbox-type/inbox-type";
import { MessageComponent } from "../../components/message/message";

import { LeaveServiceProvider } from "../../providers/leave-service/leave-service";
import { UserServiceProvider } from "../../providers/user-service/user-service";

@IonicPage()
@Component({
  selector: "page-cancel-leave",
  templateUrl: "cancel-leave.html"
})
export class CancelLeavePage {
  authForm: FormGroup;
  inbox: any;
  comments: string;
  loading: Loading;
  currentUser: any;
  user: string;
  requestNumber: string;
  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private messageCtrl: MessageComponent,
    private toastCtrl: ToastController,
    private leaveService: LeaveServiceProvider,
    private userService: UserServiceProvider
  ) {
    this.inbox = navParams.get("item");

    console.log("cancel item.....");

    console.log(this.inbox);

    this.requestNumber = this.inbox.id;

    this.authForm = this.fb.group({
      comments: [null, Validators.compose([Validators.required])]
    });

    this.authForm.get("comments").setValue(this.inbox.comments);

    this.currentUser = this.userService.getCurrentUser();

    console.log(this.currentUser);

    if (this.currentUser) this.user = this.currentUser.loginName;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CancelLeavePage");
  }
  submitForm(cancelRequest: any): void {
    cancelRequest.requestNumber = this.requestNumber;

    this.showLoading();
    this.leaveService.cancelLeaveRequest(cancelRequest, this.user).subscribe(
      allowed => {
        if (allowed) {
          console.log(allowed);
          this.dismissLoading();
          this.presentToastSuccessfully();
        } else {
          this.messageCtrl.showError("Access Denied");
        }
      },
      error => {
        this.dismissLoading();
        this.messageCtrl.showError(error);
      }
    );
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
  dismissLoading() {
    if (this.loading) console.log("dismiss loading");
    this.loading.dismiss();
    this.loading = null;
  }
  presentToastSuccessfully() {
    let toast = this.toastCtrl.create({
      message: "Successfully cancel the leave",
      duration: 2000,
      position: "bottom"
    });
    toast.onDidDismiss(() => {
      this.nav.setRoot(InboxTypePage);
    });
    toast.present();
  }
}
