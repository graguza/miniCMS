import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlindCvComponent } from './blind-cv.component';

describe('BlindCvComponent', () => {
  let component: BlindCvComponent;
  let fixture: ComponentFixture<BlindCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlindCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlindCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
