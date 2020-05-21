import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsNavigationComponent } from './lists-navigation.component';

describe('ListsNavigationComponent', () => {
  let component: ListsNavigationComponent;
  let fixture: ComponentFixture<ListsNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
