import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureContentTypeComponent } from './picture-content-type.component';

describe('PictureContentTypeComponent', () => {
  let component: PictureContentTypeComponent;
  let fixture: ComponentFixture<PictureContentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureContentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureContentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
