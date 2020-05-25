import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content-types-body',
  templateUrl: './picture-content-type-viewer.component.html',
  styleUrls: ['./picture-content-type-viewer.component.scss']
})
export class PictureContentTypeViewerComponent implements OnInit {
@Input()
public contentTypes;
  constructor() { }

  ngOnInit(): void {
  }

}
