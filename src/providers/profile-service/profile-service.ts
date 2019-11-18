import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

import { AppGlobals } from "../../providers/config";
import { UserServiceProvider } from "../../providers/user-service/user-service";

export class Profile {
  name: string;
  number: string;
  company: string;
  department: string;
  job_title: string;
  engagment_date: string;
  nationality: string;
  manager: string;

  constructor() {}
}
/*
  Generated class for the ProfileServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProfileServiceProvider {
  currentUser: any;
  encrypted: string;
  BASE_URL: string;

  constructor(
    public http: Http,
    private userService: UserServiceProvider,
    private global: AppGlobals
  ) {
    console.log("Hello ProfileServiceProvider Provider");

    this.BASE_URL = this.global.getBaseUrl();

    console.log(this.BASE_URL);

    this.currentUser = this.userService.getCurrentUser();

    if (this.currentUser) this.encrypted = this.currentUser.encrypted;
  }
  profile(user: string) {
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
        .get(this.BASE_URL + "profile/" + user, options)
        .map(res => res.json());
    }
  }
  personalDetail(user: string) {
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
        .get(this.BASE_URL + "PersonalDetail/" + user, options)
        .map(res => res.json());
    }
  }
  updatePersonalDetail(personalDetailRequest, user) {
    if (
      personalDetailRequest.email === null ||
      personalDetailRequest.password === null
    ) {
      return Observable.throw("Please insert leave request");
    } else {
      console.log(personalDetailRequest);

      console.log(this.currentUser);

      let headers = new Headers({
        "Content-Type": "application/json",
        Authorization: "Basic " + this.encrypted
      });

      let options = new RequestOptions({
        headers: headers
      });

      let body = JSON.stringify({
        Date_of_Birth: personalDetailRequest.dob,
        Marital_Status: personalDetailRequest.maritalStatus,
        Marital_Date: personalDetailRequest.maritalDate,
        Disabled: personalDetailRequest.disabled,
        Type_of_Disability: personalDetailRequest.typeofDisability,
        Home_Telephone_Number: personalDetailRequest.homeTelephone,
        Work_Telephone_Number: personalDetailRequest.workTelephone,
        Mobile_Phone_Number: personalDetailRequest.mobile,
        Physical_Address_Line_1: personalDetailRequest.physicalAddress1,
        Physical_Address_Line_2: personalDetailRequest.physicalAddress2,
        Physical_Address_Line_3: personalDetailRequest.physicalAddress3,
        Physical_Address_Line_4: personalDetailRequest.physicalAddress4,
        Physical_Address_Postal_Code:
          personalDetailRequest.physicalAddressPostalCode,
        Physical_Address_City: personalDetailRequest.physicalAddressCity,
        Physical_Address_Country: personalDetailRequest.physicalAddressCountry,
        Emergency_Contact1_Name: personalDetailRequest.emergencyContact1Name,
        Emergency_Contact2_Name: personalDetailRequest.emergencyContact2Name,
        Emergency_Contact1_Relationship:
          personalDetailRequest.emergencyContact1Relationship,
        Emergency_Contact2_Relationship:
          personalDetailRequest.emergencyContact2Relationship,
        Emergency_Contact1_Number:
          personalDetailRequest.emergencyContact1Number,
        Emergency_Contact2_Number:
          personalDetailRequest.emergencyContact2Number,
        User: user
      });

      console.log(this.BASE_URL);

      return this.http
        .post(this.BASE_URL + "PersonalDetail", body, options)
        .map(res => res.json());
    }
  }
}
