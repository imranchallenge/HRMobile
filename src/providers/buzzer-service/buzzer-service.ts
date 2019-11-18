import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

import { AppGlobals } from "../../providers/config";
import { UserServiceProvider } from "../../providers/user-service/user-service";

/*
  Generated class for the BuzzerServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BuzzerServiceProvider {
  currentUser: any;
  encrypted: string;
  BASE_URL: string;

  constructor(
    public http: Http,
    private userService: UserServiceProvider,
    private global: AppGlobals
  ) {
    console.log("Hello BuzzerServiceProvider Provider");

    this.BASE_URL = this.global.getBaseUrl();

    this.currentUser = this.userService.getCurrentUser();

    if (this.currentUser) this.encrypted = this.currentUser.encrypted;
  }
  buzzer(user: string) {
    console.log("buzzer...");

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
        .get(this.BASE_URL + "buzzer/" + user, options)
        .map(res => res.json());
    }
  }
  buzzerCounter(user: string) {
    console.log("buzzer count...");

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
  updateRead(buzzer) {
    if (buzzer.id === null) {
      return Observable.throw("Please insert buzzer id");
    } else {
      console.log(buzzer);

      let headers = new Headers({
        "Content-Type": "application/json",
        Authorization: "Basic " + this.encrypted
      });

      let options = new RequestOptions({
        headers: headers
      });

      let body = JSON.stringify({
        ID: buzzer.id,
        Employee: buzzer.employee
      });

      console.log(this.BASE_URL);

      return this.http
        .post(this.BASE_URL + "BuzzerRead", body, options)
        .map(res => res.json());
    }
  }
  countEmployeeManagerRequest(user: string) {
    console.log("employee manager buzzer count...");

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
        .get(this.BASE_URL + "ManagerRequestCount/" + user, options)
        .map(res => res.json());
    }
  }
}
