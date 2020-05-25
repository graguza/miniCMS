import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureContentTypeViewerComponent } from './picture-content-type-viewer.component';

describe('PictureContentTypeViewerComponent', () => {
  let component: PictureContentTypeViewerComponent;
  let fixture: ComponentFixture<PictureContentTypeViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureContentTypeViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureContentTypeViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
