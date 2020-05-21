import { Component, OnInit } from "@angular/core";
import { DataService } from "src/services";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-lists-navigation",
  templateUrl: "./lists-navigation.component.html",
  styleUrls: ["./lists-navigation.component.scss"],
})
export class ListsNavigationComponent implements OnInit {
  public lists$;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.lists$ = this.dataService.get(environment.api.main, { collection: "metadata" });
  }
}
