import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Injectable } from "@angular/core";
import { AppGlobals } from "../../providers/config";

@Injectable()
export class SettingServiceProvider {
  BASE_URL: string;
  constructor(public http: Http, private global: AppGlobals) {
    console.log("Hello SettingServiceProvider Provider");

    this.BASE_URL = this.global.getBaseUrl();
  }

  allMenus() {
    
    this.BASE_URL = this.global.getBaseUrl();

    return this.http.get(this.BASE_URL + "Menus").map(res => res.json());
  }
}
