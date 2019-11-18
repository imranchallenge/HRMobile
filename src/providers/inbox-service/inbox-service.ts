import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

import { AppGlobals } from "../../providers/config";
import { UserServiceProvider } from "../../providers/user-service/user-service";
/*
  Generated class for the InboxServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class InboxServiceProvider {
  BASE_URL: string;
  currentUser: any;
  encrypted: string;

  constructor(
    public http: Http,
    private userService: UserServiceProvider,
    private global: AppGlobals
  ) {
    console.log("Hello InboxServiceProvider Provider");

    this.BASE_URL = this.global.getBaseUrl();

    this.currentUser = this.userService.getCurrentUser();

    if (this.currentUser) this.encrypted = this.currentUser.encrypted;
  }
  inbox(user: string, type: string) {
    console.log("inbox...");

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
        .get(this.BASE_URL + "inbox/" + user + "/" + type, options)
        .map(res => res.json());
    }
  }
  documentInbox() {
    if (this.currentUser.loginName === null) {
      return Observable.throw("Please give user");
    } else {
      console.log(this.currentUser.loginName);

      let headers = new Headers({
        "Content-Type": "application/json",
        Authorization: "Basic " + this.currentUser.encrypted
      });

      let options = new RequestOptions({
        headers: headers
      });

      return this.http
        .get(
          this.BASE_URL + "DocumentInbox/" + this.currentUser.loginName,
          options
        )
        .map(res => res.json());
    }
  }
}
