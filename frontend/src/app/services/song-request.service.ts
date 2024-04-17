import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SongRequest } from '../models/song-request.model';

@Injectable({
  providedIn: 'root'
})
export class SongRequestService {
  private apiUrl = 'http://localhost:8080/api/song-requests'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Submit a song request
  submitRequest(request: SongRequest): Observable<SongRequest> {
    return this.http.post<SongRequest>(this.apiUrl, request).pipe(
      map((res: SongRequest) => res),
      catchError((error) => {
        console.error('Error submitting song request', error);
        return of(null);
      })
    );
  }

  // Get all song requests
  getRequests(): Observable<SongRequest[]> {
    return this.http.get<SongRequest[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching song requests', error);
        return of([]);
      })
    );
  }
}

