import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { DataService } from "src/services";
import { environment } from "src/environments/environment";
import { ListChangedService } from "src/services/list-changed.service";
import { ActivatedRoute } from "@angular/router";
import { switchMap, tap, filter } from "rxjs/operators";

@Component({
  selector: "app-editor-designer",
  templateUrl: "./editor-designer.component.html",
  styleUrls: ["./editor-designer.component.scss"],
})
export class EditorDesignerComponent implements OnInit {
  public editor: any = {};
  public listTypes = [
    { name: "Tabela", value: "table" },
    { name: "Karty", value: "cards" },
  ];
  private id;
  lightgreen = "lightgreen";
  public editorForm = this.fb.group({
    _id: [""],
    title: [],
    description: [],
    collection: [],
    type: ["table"],
    contentTypes: [[]],
  });
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dataService: DataService,
    private listNotify: ListChangedService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.id = params.get("id");
          if (!!this.id) {
            return this.dataService.get(environment.api.main, { collection: "metadata", id: this.id });
          }

          return null;
        }),
        filter((x) => !!x)
        // tap((x: any) => (this.displayedColumns = x.contentTypes.map((c) => c.title))),
        // tap(x=>this.data$ = this.dataService.get(environment.api.main, { collection: x.collection }))
      )
      .subscribe((x) => this.editorForm.setValue(x));

    this.editorForm.valueChanges.subscribe((options) => (this.editor = options));
  }

  public onAddInput() {
    const contentTypes = [
      ...this.editorForm.value.contentTypes,
      { title: "", description: "", required: false, visible: true, type: "input" },
    ];
    this.editorForm.get("contentTypes").setValue(contentTypes);
  }

  public onAddPicture() {
    const contentTypes = [
      ...this.editorForm.value.contentTypes,
      { title: "", description: "", required: false, visible: true, type: "picture" },
    ];
    this.editorForm.get("contentTypes").setValue(contentTypes);
  }

  public onAddSelect() {
    const contentTypes = [
      ...this.editorForm.value.contentTypes,
      {
        title: "",
        description: "",
        dataSource: "list",
        options: [],
        required: false,
        visible: true,
        type: "select",
        collection: "",
        field: "",
        isMultiple: false,
      },
    ];
    this.editorForm.get("contentTypes").setValue(contentTypes);
  }

  public onSave() {
    if (!!this.id) {
      this.dataService
        .put(environment.api.main, this.editor, { collection: "metadata", id: this.id })
        .subscribe((r) => this.listNotify.notify());
      return;
    }
    this.dataService
      .post(environment.api.main, this.editor, { collection: "metadata" })
      .subscribe((r) => this.listNotify.notify());
  }
}
