import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  public lists$;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.lists$ = this.dataService.get(environment.api.main, { collection: "metadata" });
  }

}
