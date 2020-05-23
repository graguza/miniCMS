import { Component, OnInit } from "@angular/core";
import { DataService } from "src/services";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap, map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { FormBuilder } from "@angular/forms";
import { uuid } from "uuid";

@Component({
  selector: "app-list-editor",
  templateUrl: "./list-editor.component.html",
  styleUrls: ["./list-editor.component.scss"],
})
export class ListEditorComponent implements OnInit {
  public metadata$;
  public metadata;
  public id;
  public itemId;
  public editorForm = this.fb.group({
    _id: [""],
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
        this.itemId = params.get("itemId");

        return this.dataService.get(environment.api.main, { collection: "metadata", id: this.id }).pipe(
          map((m: any) => {
            m.contentTypes.forEach((element) => {
              if (element.type === "select" && !!element.collection) {
                let options$ = this.dataService.get(environment.api.main, { collection: element.collection });
                if (!!element.field) {
                  options$ = options$.pipe(map((opt: any[]) => opt.map((x) => x[element.field])));
                }
                element.options = options$;
              }
            });

            return m;
          })
        );
      })
    );

    this.metadata$.subscribe((m) => {
      this.metadata = m;
      let formObject = {
        _id: [],
      };
      m.contentTypes.forEach((element) => {
        formObject[element.title] = [""];
      });

      this.editorForm = this.fb.group(formObject);
      if (!this.itemId) {
        return;
      }

      this.dataService
        .get(environment.api.main, { collection: this.metadata.collection, id: this.itemId })
        .subscribe((x) => this.editorForm.setValue(x));
    });
  }

  public onSave() {
    if (!!this.itemId) {
      this.dataService
        .put(environment.api.main, this.editorForm.value, { collection: this.metadata.collection, id: this.itemId })
        .subscribe(() => this.router.navigate(["/list/", this.id]));
      return;
    }
    this.dataService
      .post(environment.api.main, this.editorForm.value, { collection: this.metadata.collection })
      .subscribe(() => this.router.navigate(["/list/", this.id]));
  }
}
