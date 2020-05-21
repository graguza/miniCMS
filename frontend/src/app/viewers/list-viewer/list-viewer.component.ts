import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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
  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    this.metadata$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get("id");
        return this.dataService.get(environment.api.main, { collection: "metadata", id });
      }),
      tap((x: any) => (this.displayedColumns = x.contentTypes.map((c) => c.title))),
      tap(x=>this.data$ = this.dataService.get(environment.api.main, { collection: x.collection }))
    );

    // this.metadata$.subscribe((s) => {
    //   this.metadata = s;
    //   this.data$ = this.dataService.get(environment.api.main, { collection: s.collection });
    // });
  }
}
