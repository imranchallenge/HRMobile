export class User {
    loginName: string;
    userName: string;
    number:string;
    encrypted:string;
    externalNumber:string;
  
    constructor(loginName:string,userName: string,number:string,encrypted:string,externalNumber:string) {
      this.loginName = loginName;
      this.userName = userName;
      this.number = number;
      this.encrypted = encrypted;
      this.externalNumber = externalNumber;
    }
  }