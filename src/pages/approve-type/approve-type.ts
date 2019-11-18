import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { ManagerLeaveApprovalListPage } from "../../pages/manager-leave-approval-list/manager-leave-approval-list";
import { ManagerRefundApprovalListPage } from "../../pages/manager-refund-approval-list/manager-refund-approval-list";
import { LandingPage } from "../../pages/landing/landing";
import { AppGlobals } from "../../providers/config";

@IonicPage()
@Component({
  selector: "page-approve-type",
  templateUrl: "approve-type.html"
})
export class ApproveTypePage {
  types: any[];
  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private global: AppGlobals
  ) {
    this.types = this.global.getApproveTypes();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ApproveTypePage");
  }

  itemTapped(event, item) {
    console.log("item tapped called...." + item.title);

    let navLeaveApprovalPage = ManagerLeaveApprovalListPage;
    let navRefundApprovalPage = ManagerRefundApprovalListPage;

    if (item.title === "Leave") {
      this.nav.push(navLeaveApprovalPage);
    } else {
      this.nav.push(navRefundApprovalPage);
    }
  }
  landingPage() {
    this.nav.setRoot(LandingPage);
  }
}
