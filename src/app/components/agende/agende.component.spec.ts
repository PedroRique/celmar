import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendeComponent } from './agende.component';

describe('AgendeComponent', () => {
  let component: AgendeComponent;
  let fixture: ComponentFixture<AgendeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
