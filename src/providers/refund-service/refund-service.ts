import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

import { AppGlobals } from "../../providers/config";
import { UserServiceProvider } from "../../providers/user-service/user-service";
/*
  Generated class for the RefundServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RefundServiceProvider {
  BASE_URL: string;
  currentUser: any;
  encrypted: string;
  constructor(
    public http: Http,
    private userService: UserServiceProvider,
    private global: AppGlobals
  ) {
    this.BASE_URL = this.global.getBaseUrl();

    this.currentUser = this.userService.getCurrentUser();

    if (this.currentUser) this.encrypted = this.currentUser.encrypted;
  }

  refundTypes() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "Basic " + this.encrypted
    });

    let options = new RequestOptions({
      headers: headers
    });

    return this.http
      .get(this.BASE_URL + "RefundTypes", options)
      .map(res => res.json());
  }
  saveRefundRequest(refundRequest) {
    if (
      refundRequest.typeofExpenditure === null ||
      refundRequest.value === null
    ) {
      return Observable.throw("Please insert refund request");
    } else {
      //console.log(refundRequest);

      let headers = new Headers({
        "Content-Type": "application/json",
        Authorization: "Basic " + this.encrypted
      });

      let options = new RequestOptions({
        headers: headers
      });

      let body = JSON.stringify({
        Employee: this.currentUser.number,
        TypeofExpenditure: refundRequest.refundType,
        NoOfExpenses: refundRequest.noOfExpenses,
        Description: refundRequest.description,
        Value: refundRequest.value,
        TDate: refundRequest.transactionDate,
        User: this.currentUser.loginName
      });

      console.log(this.BASE_URL);
      console.log("Refund Request.....");
      console.log(body);

      return this.http
        .post(this.BASE_URL + "RefundRequest", body, options)
        .map(res => res.json());
    }
  }
}
