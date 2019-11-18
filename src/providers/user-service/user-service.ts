import { Injectable } from "@angular/core";
import { User } from "../../model/user";
import { Storage } from "@ionic/storage";

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  currentUser: User;
  profilePicture: string;

  constructor(public storage: Storage) {
    console.log("Hello UserServiceProvider Provider");
  }
  setCurrentUser(
    loginName: string,
    userName: string,
    number: string,
    encrypted: string,
    externalNumber: string
  ) {
    this.currentUser = new User(
      loginName,
      userName,
      number,
      encrypted,
      externalNumber
    );
  }
  getCurrentUser(): User {
    return this.currentUser;
  }
  setProfilePicture(pic: string) {
    this.profilePicture = pic;
    this.storage.set("profilePic", this.profilePicture);
  }
  getProfilePicture(): Promise<string> {
    return this.storage.get("profilePic");
  }
  clearProfilePicture() {
    this.storage.set("profilePic", null);
    //this.storage.clear();
  }
  setLoginName(name: string) {
    this.storage.set("loginName", name);
  }
  getLoginName(): Promise<string> {
    return this.storage.get("loginName");
  }
}
