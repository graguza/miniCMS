import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsContentTypeComponent } from './options-content-type.component';

describe('OptionsContentTypeComponent', () => {
  let component: OptionsContentTypeComponent;
  let fixture: ComponentFixture<OptionsContentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsContentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsContentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
