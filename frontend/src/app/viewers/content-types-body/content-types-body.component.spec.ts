import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTypesBodyComponent } from './content-types-body.component';

describe('ContentTypesBodyComponent', () => {
  let component: ContentTypesBodyComponent;
  let fixture: ComponentFixture<ContentTypesBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTypesBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTypesBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
