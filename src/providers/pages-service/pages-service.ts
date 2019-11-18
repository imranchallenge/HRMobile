import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

import { HomePage } from "../../pages/home/home";
import { LeaveRequestPage } from "../../pages/leave-request/leave-request";
import { PayrollListPage } from "../../pages/payroll-list/payroll-list";
import { DocumentRequestPage } from "../../pages/document-request/document-request";
import { NotificationPage } from "../../pages/notification/notification";
import { RefundPage } from "../../pages/refund/refund";
import { InboxTypePage } from "../../pages/inbox-type/inbox-type";
import { PersonalDetailPage } from "../../pages/personal-detail/personal-detail";
import { Page } from "../../model/page";
import { Menu } from "../../model/menu";

import { ApproveTypePage } from "../../pages/approve-type/approve-type";

@Injectable()
export class PagesServiceProvider {
  pages: Array<Page>;

  constructor(public http: Http) {
    console.log("Hello PagesServiceProvider Provider");

    this.pages = [
      {
        title: "Profile",
        icon: "ios-person",
        component: HomePage,
        display: true
      },
      {
        title: "Inbox",
        icon: "mail",
        component: InboxTypePage,
        display: true
      },
      {
        title: "Leave",
        icon: "ios-jet",
        component: LeaveRequestPage,
        display: true
      },
      {
        title: "Request",
        icon: "ios-book",
        component: DocumentRequestPage,
        display: true
      },
      {
        title: "Refund",
        icon: "ios-aperture",
        component: RefundPage,
        display: false
      },
      {
        title: "Payroll",
        icon: "ios-paper-plane",
        component: PayrollListPage,
        display: true
      },
      {
        title: "Buzzers",
        icon: "ios-notifications",
        component: NotificationPage,
        display: true
      },
      {
        title: "Update PD",
        icon: "ios-person",
        component: PersonalDetailPage,
        display: true
      },
      {
        title: "Manager Approval",
        icon: "ios-folder",
        component: ApproveTypePage,
        display: false
      },
      {
        title: "Logout",
        icon: "md-power",
        component: null,
        display: false
      }
    ];
  }

  getPages(): Array<Page> {
    return this.pages;
  }

  getPage(title: string): Page {
    let currentPage;

    for (let page of this.pages) {
      // for acts as a foreach
      if (title === page.title) {
        currentPage = page;
        break;
      }
    }
    return currentPage;
  }
  setPages(menus: Array<Menu>) {
    let menuObj;
    for (let i = 0; i < this.pages.length; i++) {
      menuObj = menus.find(o => o.name === this.pages[i].title);
      if (menuObj != null) {
        this.pages[i].display = menuObj.display;
      }
    }
  }
  getDisplayPages() {
    let displayPages = this.pages.filter(p => p.display === true);

    return displayPages;
  }
}
