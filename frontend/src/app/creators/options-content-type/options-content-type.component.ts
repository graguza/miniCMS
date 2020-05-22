import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-options-content-type",
  templateUrl: "./options-content-type.component.html",
  styleUrls: ["./options-content-type.component.scss"],
})
export class OptionsContentTypeComponent implements OnInit {
  public dataSources = ["list", "collection"];
  constructor() {}

  ngOnInit(): void {}
}
