import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

import { AppGlobals } from "../../providers/config";
import { UserServiceProvider } from "../../providers/user-service/user-service";

/*
  Generated class for the NotificationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationServiceProvider {
  BASE_URL: string;
  currentUser: any;
  encrypted: string;

  constructor(
    public http: Http,
    private userService: UserServiceProvider,
    private global: AppGlobals
  ) {
    console.log("Hello NotificationServiceProvider Provider");

    this.BASE_URL = this.global.getBaseUrl();

    this.currentUser = this.userService.getCurrentUser();

    if (this.currentUser) this.encrypted = this.currentUser.encrypted;
  }

  buzzerCount(user: string) {
    console.log("buzzer count...");

    //this.BASE_URL = this.global.getBaseUrl();

    this.currentUser = this.userService.getCurrentUser();

    if (this.currentUser) this.encrypted = this.currentUser.encrypted;

    if (user === null) {
      return Observable.throw("Please give user");
    } else {
      console.log(user);

      let headers = new Headers({
        "Content-Type": "application/json",
        Authorization: "Basic " + this.encrypted
      });

      let options = new RequestOptions({
        headers: headers
      });

      return this.http
        .get(this.BASE_URL + "UnRead/" + user, options)
        .map(res => res.json());
    }
  }
}
