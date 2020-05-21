import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorDesignerComponent } from './editor-designer.component';

describe('EditorDesignerComponent', () => {
  let component: EditorDesignerComponent;
  let fixture: ComponentFixture<EditorDesignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorDesignerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
