import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000';
  private reservations: Reservation[] = [];
  constructor(private httpClient: HttpClient) {}

  getReservations(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(`${this.apiUrl}/reservations`);
  }

  getReservationById(id: string): Observable<Reservation> {
    return this.httpClient.get<Reservation>(`${this.apiUrl}/reservation/${id}`);
  }

  addReservation(reservation: Reservation): Observable<void> {
    reservation.id = Date.now().toString();
    return this.httpClient.post<void>(
      `${this.apiUrl}/reservation`,
      reservation
    );
  }
  removeReservation(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/reservation/${id}`);
  }
  updateReservation(id: string, reservation: Reservation): Observable<void> {
    reservation.id = id;
    return this.httpClient.put<void>(
      `${this.apiUrl}/reservation/${id}`,
      reservation
    );
  }
}
