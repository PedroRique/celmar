import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface GoogleReview {
  nome: string;
  texto: string;
  foto?: string;
  nota?: number;
  tempo?: string;
  autorUrl?: string;
  loja?: string;
  mapsUrl?: string;
}

export interface GoogleReviewsPayload {
  rating: number;
  total: number;
  mapsUrl: string;
  reviews: GoogleReview[];
}

@Injectable({
  providedIn: 'root',
})
export class GoogleReviewsService {
  constructor(private http: HttpClient) {}

  getReviews(brand: string): Observable<GoogleReviewsPayload> {
    const url = `${environment.googleReviewsUrl}?brand=${encodeURIComponent(brand)}&v=3`;
    return this.http.get<GoogleReviewsPayload>(url).pipe(timeout(20000));
  }
}
