import { Component, Renderer, OnInit, ViewChild } from "@angular/core";

/**
 * Generated class for the LandingMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "landing-menu",
  templateUrl: "landing-menu.html"
})
export class LandingMenuComponent implements OnInit {
  text: string;
  @ViewChild("cc") gridContent: any;
  constructor(public renderer: Renderer) {
    console.log("Hello LandingMenuComponent Component");
    this.text = "Hello World";
  }
  ngOnInit() {
    console.log("hello init");
  }
}
