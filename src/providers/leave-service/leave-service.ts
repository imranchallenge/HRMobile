import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

import { AppGlobals } from "../../providers/config";
import { UserServiceProvider } from "../../providers/user-service/user-service";
/*
  Generated class for the LeaveServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LeaveServiceProvider {
  BASE_URL: string;
  currentUser: any;
  encrypted: string;

  constructor(
    public http: Http,
    private userService: UserServiceProvider,
    private global: AppGlobals
  ) {
    console.log("Hello LeaveServiceProvider Provider");

    this.BASE_URL = this.global.getBaseUrl();
    //this.global.BASE_URL;

    this.currentUser = this.userService.getCurrentUser();

    if (this.currentUser) this.encrypted = this.currentUser.encrypted;
  }
  leaveTypes() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "Basic " + this.encrypted
    });

    let options = new RequestOptions({
      headers: headers
    });

    return this.http
      .get(this.BASE_URL + "LeaveTypes", options)
      .map(res => res.json());
  }
  alternateManagers(user: string) {
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "Basic " + this.encrypted
    });

    let options = new RequestOptions({
      headers: headers
    });

    return this.http
      .get(this.BASE_URL + "AlternateManagers/" + user, options)
      .map(res => res.json());
  }
  saveLeaveRequest(leaveRequest, user) {
    if (leaveRequest.email === null || leaveRequest.password === null) {
      return Observable.throw("Please insert leave request");
    } else {
      console.log(leaveRequest);

      console.log(this.currentUser);

      let headers = new Headers({
        "Content-Type": "application/json",
        Authorization: "Basic " + this.encrypted
      });

      let options = new RequestOptions({
        headers: headers
      });

      let body = JSON.stringify({
        LeaveType: leaveRequest.leaveType,
        SubstituteEmployee: this.currentUser.userName,
        ApprovedTicket: "True",
        LeaveContact: leaveRequest.leaveContact,
        StartDate: leaveRequest.startDate,
        EndDate: leaveRequest.endDate,
        Route: null,
        ReasonForLeave: leaveRequest.leaveReason,
        ApprovedExitVisa: "True",
        User: user
      });

      console.log(this.BASE_URL);

      return this.http
        .post(this.BASE_URL + "LeaveRequests", body, options)
        .map(res => res.json());
    }
  }
  leaveBalances(user: string) {
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "Basic " + this.encrypted
    });

    let options = new RequestOptions({
      headers: headers
    });

    return this.http
      .get(this.BASE_URL + "LeaveBalances/" + user, options)
      .map(res => res.json());
  }
  cancelLeaveRequest(cancelLeaveRequest, user) {
    if (cancelLeaveRequest.reqId === null) {
      return Observable.throw("Please insert leave request");
    } else {
      console.log(cancelLeaveRequest);

      console.log(this.currentUser);

      let headers = new Headers({
        "Content-Type": "application/json",
        Authorization: "Basic " + this.encrypted
      });

      let options = new RequestOptions({
        headers: headers
      });

      let body = JSON.stringify({
        RequestNumber: cancelLeaveRequest.requestNumber,
        Comments: cancelLeaveRequest.comments,
        User: user
      });

      console.log(this.BASE_URL);

      return this.http
        .post(this.BASE_URL + "CancelLeave", body, options)
        .map(res => res.json());
    }
  }
}
