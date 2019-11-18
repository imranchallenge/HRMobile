import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

import { AppGlobals } from "../../providers/config";
import { UserServiceProvider } from "../../providers/user-service/user-service";

/*
  Generated class for the ManagerApprovalServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ManagerApprovalServiceProvider {
  BASE_URL: string;
  currentUser: any;
  encrypted: string;

  constructor(
    public http: Http,
    private userService: UserServiceProvider,
    private global: AppGlobals
  ) {
    console.log("Hello ManagerApprovalServiceProvider Provider");

    console.log("Hello InboxServiceProvider Provider");

    this.BASE_URL = this.global.getBaseUrl();

    this.currentUser = this.userService.getCurrentUser();

    if (this.currentUser) this.encrypted = this.currentUser.encrypted;
  }
  employeeList(user: string) {
    console.log("employeesList...");

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
        .get(this.BASE_URL + "LeaveApproval/" + user, options)
        .map(res => res.json());
    }
  }
  employeeRefundList(user: string) {
    console.log("employees Refund List...");

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
        .get(this.BASE_URL + "RefundApproval/" + user, options)
        .map(res => res.json());
    }
  }
  employeeDetail(reqId: string) {
    console.log("employeesList...");

    if (reqId === null) {
      return Observable.throw("Please give user");
    } else {
      console.log(reqId);

      let headers = new Headers({
        "Content-Type": "application/json",
        Authorization: "Basic " + this.encrypted
      });

      let options = new RequestOptions({
        headers: headers
      });

      return this.http
        .get(this.BASE_URL + "LeaveEmployeeApprovalDetail/" + reqId, options)
        .map(res => res.json());
    }
  }
  leaveApproveReject(approveRequest: any) {
    if (approveRequest.status === null) {
      return Observable.throw("Please select approve type");
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
        ID: approveRequest.reqId,
        User: this.currentUser.loginName,
        Type: approveRequest.type,
        Status: "APPROVED BY MANAGER"
      });

      console.log(this.BASE_URL);
      console.log("Refund Request.....");
      console.log(body);

      return this.http
        .post(this.BASE_URL + "ManagerLeaveApproval", body, options)
        .map(res => res.json());
    }
  }
  isManager(user: string) {
    console.log("buzzer count...");

    this.BASE_URL = this.global.getBaseUrl();

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
        .get(this.BASE_URL + "isManager/" + user, options)
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
  employeeRefundDetail(reqId: string) {
    console.log("employees Refund...");

    if (reqId === null) {
      return Observable.throw("Please give user");
    } else {
      console.log(reqId);

      let headers = new Headers({
        "Content-Type": "application/json",
        Authorization: "Basic " + this.encrypted
      });

      let options = new RequestOptions({
        headers: headers
      });

      return this.http
        .get(this.BASE_URL + "EmployeeRefundApprovalDetail/" + reqId, options)
        .map(res => res.json());
    }
  }
  refundApproveReject(approveRequest: any) {
    if (approveRequest.status === null) {
      return Observable.throw("Please select approve type");
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
        ID: approveRequest.reqId,
        User: this.currentUser.loginName,
        Status: approveRequest.status,
        ManagerComments: approveRequest.managerComments
      });

      console.log(this.BASE_URL);
      console.log("Refund Request.....");
      console.log(body);

      return this.http
        .post(this.BASE_URL + "ManagerRefundApproval", body, options)
        .map(res => res.json());
    }
  }
}
