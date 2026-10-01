import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { DepoimentosComponent } from './depoimentos.component';
import { BrandingService } from '../../core/branding.service';
import { GoogleReviewsService } from '../../services/google-reviews.service';

describe('DepoimentosComponent', () => {
  let component: DepoimentosComponent;
  let fixture: ComponentFixture<DepoimentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepoimentosComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: BrandingService,
          useValue: { branding: { appTitle: 'Celmar' } }
        },
        {
          provide: GoogleReviewsService,
          useValue: {
            getReviews: () => of({ rating: 0, total: 0, mapsUrl: '', reviews: [] })
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepoimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
