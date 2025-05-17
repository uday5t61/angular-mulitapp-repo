import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];
  constructor() {
    const storedReservations = localStorage.getItem('reservations');
    if (storedReservations) {
      this.reservations = JSON.parse(storedReservations);
    }
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }
  getReservationById(id: string): Reservation | undefined {
    return this.reservations.find((reservation) => reservation.id === id);
  }
  addReservation(reservation: Reservation): void {
    reservation.id = Date.now().toString();
    this.reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
  removeReservation(id: string): void {
    const index = this.reservations.findIndex((res) => res.id === id);
    if (index > -1) {
      this.reservations.splice(index, 1);
    }
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
  updateReservation(id: string, reservation: Reservation): void {
    reservation.id = id;
    var index = this.reservations.findIndex((res) => res.id === id);
    if (index > -1) {
      this.reservations[index] = reservation;
    }
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
}
