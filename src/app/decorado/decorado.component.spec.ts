import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoradoComponent } from './decorado.component';

describe('DecoradoComponent', () => {
  let component: DecoradoComponent;
  let fixture: ComponentFixture<DecoradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
