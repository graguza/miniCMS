import { Component, OnInit } from "@angular/core";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "src/services";
import { switchMap, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { FormBuilder } from "@angular/forms";
import { saveAs } from "file-saver";

@Component({
  selector: "app-blind-cv",
  templateUrl: "./blind-cv.component.html",
  styleUrls: ["./blind-cv.component.scss"],
})
export class BlindCvComponent implements OnInit {
  constructor(private route: ActivatedRoute, private dataService: DataService, private fb: FormBuilder) {}
  public metadata$;
  public metadata;
  public id;
  public itemId;
  public editorForm = this.fb.group({});

  title = [];
  subtitle = [];
  sections = [];

  data = ["Imię", "Nazwisko", "Płeć", "Umiejętności", "Wykształcenie"];
  entity = {};
  blind = { title: "", subtitle: "", sections: [] };

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }

    console.log(this.sections);
    this.blind.title = this.title.map((x) => this.entity[x]).join(" ");
    this.blind.subtitle = this.subtitle.map((x) => this.entity[x]).join(" ");
    this.blind.sections = this.sections.map((x) => ({ key: x, value: this.entity[x].toString() }));
  }
  ngOnInit(): void {
    this.metadata$ = this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.id = params.get("id");
          this.itemId = params.get("itemId");

          return this.dataService.get(environment.api.main, { collection: "metadata", id: this.id }).pipe(
            map((m: any) => {
              this.dataService
                .get(environment.api.main, { collection: m.collection, id: this.itemId })
                .subscribe((x) => {
                  this.entity = x;
                  this.data = Object.keys(x);
                });

              return m;
            })
          );
        })
      )
      .subscribe((x) => {
        console.log(x);
      });
  }

  getPdf() {
    console.log(this.blind);
    this.dataService.post("http://localhost:9090/", this.blind).subscribe((x) => {
      saveAs(x, "test.pdf");
    });
  }

  onModelChange(changes, key) {
    console.log(changes, key);
  }
}
