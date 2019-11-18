import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { ListPage } from "../../pages/list/list";
import { LandingPage } from "../../pages/landing/landing";

import { AppGlobals } from "../../providers/config";

@IonicPage()
@Component({
  selector: "page-inbox-type",
  templateUrl: "inbox-type.html"
})
export class InboxTypePage {
  types: any[];
  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private global: AppGlobals
  ) {
    this.types = this.global.getInboxTypes();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad InboxTypePage");
  }
  itemTapped(event, item) {
    console.log("item tapped called....");
    // That's right, we're pushing to ourselves!
    this.nav.push(ListPage, {
      item: item
    });
  }
  landingPage() {
    this.nav.setRoot(LandingPage);
  }
}
