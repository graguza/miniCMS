import { Component, OnInit, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit, AfterViewInit {
  public pageMetadata;
  @ViewChild('hello', { static: true }) helloTemplate: TemplateRef<any>;

  constructor() {}
  ngAfterViewInit(): void {
    console.log(this.helloTemplate);
    this.helloTemplate
  }

  ngOnInit(): void {
    this.pageMetadata = {
      title: 'page',
      description: 'page description',
      contentType: 'panel',
      elements: [
        { title: 'header', contentType: 'panel' },
        {
          title: 'list',
          contentType: 'list',
          elements: [{ title: 'article1', contentType: 'article' }],
        },
      ],
    };
  }
}
