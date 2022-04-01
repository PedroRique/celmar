import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelmarqComponent } from './celmarq.component';

describe('CelmarqComponent', () => {
  let component: CelmarqComponent;
  let fixture: ComponentFixture<CelmarqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelmarqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelmarqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
