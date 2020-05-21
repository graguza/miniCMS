import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { DataService } from "src/services";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-editor-designer",
  templateUrl: "./editor-designer.component.html",
  styleUrls: ["./editor-designer.component.scss"],
})
export class EditorDesignerComponent implements OnInit {
  public editor: any = {};
  lightgreen = "lightgreen";
  public editorForm = this.fb.group({
    title: [],
    description: [],
    collection: [],
    contentTypes: [[]],
  });
  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.editorForm.valueChanges.subscribe((options) => (this.editor = options));
  }

  public onAddInput() {
    const contentTypes = [...this.editorForm.value.contentTypes, { title: "", description: "", required: false }];
    this.editorForm.get("contentTypes").setValue(contentTypes);
  }

  public onSave() {
    console.log(environment.api.main);
    console.log(this.editor);
    this.dataService
      .save(environment.api.main, this.editor, { collection: "metadata" })
      .subscribe((r) => console.log("done"));
  }
}
