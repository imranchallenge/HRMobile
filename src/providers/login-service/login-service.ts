import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

import { AppGlobals } from '../../providers/config';

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {
    BASE_URL : string;

    constructor(private http: Http,private global: AppGlobals) {
      console.log('Hello LoginServiceProvider Provider');
    }
    login(credentials) {
  
      this.BASE_URL = this.global.getBaseUrl();

      if (credentials.name === null || credentials.password === null) {
        return Observable.throw("Please insert credentials");
      } else {
        console.log(credentials);

          let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + credentials.encrypted
          });
      
          let options = new RequestOptions({
            headers: headers
          });
          
          let body = JSON.stringify({
            DeviceToken: '6a39a7967390daab107899e53319f15106a73d3713bb5bfc18bf8e479e9b837d',
            DeviceType: 'iOS',
            LoginName : credentials.name.trim(),
            Password :  credentials.password
          });
      
          return this.http.post(this.BASE_URL + 'login',body,options)
              .map(res =>  res.json());
      }
    }
}
