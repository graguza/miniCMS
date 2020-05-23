import { Component, OnInit } from "@angular/core";
import { DataService } from "src/services";
import { environment } from "src/environments/environment";
import { ListChangedService } from "src/services/list-changed.service";

@Component({
  selector: "app-lists-navigation",
  templateUrl: "./lists-navigation.component.html",
  styleUrls: ["./lists-navigation.component.scss"],
})
export class ListsNavigationComponent implements OnInit {
  public lists$;
  constructor(private dataService: DataService, private listNotifyService: ListChangedService) {}

  ngOnInit(): void {
    this.getList();
    this.listNotifyService.subscribe(() => this.getList());
  }

  getList() {
    this.lists$ = this.dataService.get(environment.api.main, { collection: "metadata" });
  }
}
