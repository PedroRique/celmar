import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoradosComponent } from './decorados.component';

describe('DecoradosComponent', () => {
  let component: DecoradosComponent;
  let fixture: ComponentFixture<DecoradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoradosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
