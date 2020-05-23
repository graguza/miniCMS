import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap, map, tap } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { DataService } from "src/services";

@Component({
  selector: "app-list-viewer",
  templateUrl: "./list-viewer.component.html",
  styleUrls: ["./list-viewer.component.scss"],
})
export class ListViewerComponent implements OnInit {
  public metadata$;
  public metadata;
  public data$;
  public displayedColumns: string[];
  public id;
  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.metadata$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.id = params.get("id");
        return this.dataService.get(environment.api.main, { collection: "metadata", id: this.id });
      }),
      tap((x: any) => (this.displayedColumns = x.contentTypes.map((c) => c.title))),
      tap((x) => (this.data$ = this.dataService.get(environment.api.main, { collection: x.collection })))
    );
  }

  onClick(row) {
    this.router.navigate(["/list/", this.id, "list-editor", row._id]);
  }
}
