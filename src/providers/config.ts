import { Injectable } from "@angular/core";
import { Menu } from "../model/menu";

@Injectable()
export class AppGlobals {
  BASE_URL: string;
  PIC_URL: string;
  inboxTypes: Array<{
    title: string;
    icon: string;
    value: string;
    display: boolean;
  }>;
  approvalTypes: Array<{
    title: string;
    icon: string;
    value: string;
    display: boolean;
  }>;

  constructor() {
    console.log("global provider.....");

    this.BASE_URL = "http://999app.ops.ae/api/";
    this.PIC_URL = "https://999.ops.ae/Photos/";

    this.inboxTypes = [
      { title: "Leave", icon: "ios-jet", value: "LEAVE", display: true },
      { title: "Request", icon: "ios-book", value: "DOCUMENT", display: true },
      { title: "Refund", icon: "ios-aperture", value: "REFUND", display: true }
    ];

    this.approvalTypes = [
      { title: "Leave", icon: "ios-jet", value: "LEAVE", display: true },
      { title: "Refund", icon: "ios-aperture", value: "REFUND", display: true }
    ];
  }
  setBaseUrl(baseUrl: string) {
    this.BASE_URL = baseUrl;
  }
  setPicUrl(picUrl: string) {
    this.PIC_URL = picUrl;
  }
  getBaseUrl(): string {
    return this.BASE_URL;
  }
  getPhotoUrl(): string {
    return this.PIC_URL;
  }
  setInboxTypes(menus: Array<Menu>) {
    let menuObj;
    for (let i = 0; i < this.inboxTypes.length; i++) {
      menuObj = menus.find(o => o.name === this.inboxTypes[i].title);
      if (menuObj != null) {
        this.inboxTypes[i].display = menuObj.display;
      }
    }
  }
  setApprovalTypes(menus: Array<Menu>) {
    let menuObj;
    for (let i = 0; i < this.approvalTypes.length; i++) {
      menuObj = menus.find(o => o.name === this.approvalTypes[i].title);
      if (menuObj != null) {
        this.approvalTypes[i].display = menuObj.display;
      }
    }
  }
  getInboxTypes() {
    return this.inboxTypes;
  }
  getApproveTypes() {
    return this.approvalTypes;
  }
}
