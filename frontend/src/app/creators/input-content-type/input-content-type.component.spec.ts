import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputContentTypeComponent } from './input-content-type.component';

describe('InputContentTypeComponent', () => {
  let component: InputContentTypeComponent;
  let fixture: ComponentFixture<InputContentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputContentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputContentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
