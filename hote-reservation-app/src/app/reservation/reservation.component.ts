import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../models/reservation';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HomeComponent,
    RouterModule,
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css',
})
export class ReservationComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', [Validators.required, Validators.minLength(3)]],
      guestEmail: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      roomNumber: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.reservationService.getReservationById(id).subscribe({
        next: (reservation) => {
          if (reservation) {
            this.reservationForm.patchValue({
              checkInDate: reservation.checkInDate,
              checkOutDate: reservation.checkOutDate,
              guestName: reservation.guestName,
              guestEmail: reservation.guestEmail,
              roomNumber: reservation.roomNumber,
            });
          }
        },
        error: (error) => {
          console.error('Error fetching reservation:', error);
        },
      });
    }
  }
  onSubmit() {
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        this.reservationService.updateReservation(id, reservation).subscribe({
          next: () => {
            console.log('Reservation updated successfully');
          },
          error: (error) => {
            console.error('Error updating reservation:', error);
          },
        });
      } else {
        this.reservationService.addReservation(reservation).subscribe({
          next: () => {
            console.log('Reservation added successfully');
          },
          error: (error) => {
            console.error('Error adding reservation:', error);
          },
        });
      }

      this.router.navigate(['/list']);
    }
  }
  onCancel() {
    this.location.back();
  }
}
