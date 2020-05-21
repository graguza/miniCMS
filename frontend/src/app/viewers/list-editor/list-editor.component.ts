import { Component, OnInit } from "@angular/core";
import { DataService } from "src/services";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { FormBuilder } from "@angular/forms";
import { Location } from "@angular/common";
import { relative } from "path";

@Component({
  selector: "app-list-editor",
  templateUrl: "./list-editor.component.html",
  styleUrls: ["./list-editor.component.scss"],
})
export class ListEditorComponent implements OnInit {
  public metadata$;
  public metadata;
  public id;
  public editorForm = this.fb.group({
    title: ["", { updateOn: "blur" }],
    description: ["", { updateOn: "blur" }],
    required: [false],
  });

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.metadata$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.id = params.get("id");
        return this.dataService.get(environment.api.main, { collection: "metadata", id: this.id });
      })
    );

    this.metadata$.subscribe((m) => {
      this.metadata = m;
      let formObject = {};
      m.contentTypes.forEach((element) => {
        formObject[element.title] = [""];
      });

      this.editorForm = this.fb.group(formObject);
    });
  }

  public onSave() {
    this.dataService
      .post(environment.api.main, this.editorForm.value, { collection: this.metadata.collection })
      .subscribe(() => {
        console.log("done");
        this.router.navigate(["/"], { relativeTo: this.route });
      });
  }
}
