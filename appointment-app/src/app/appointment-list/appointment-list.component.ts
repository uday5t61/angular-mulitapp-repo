import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css',
})
export class AppointmentListComponent implements OnInit {
  newAppointmentTitle: string = '';
  newAppointmentDescription: string = '';
  newAppointmentDate: Date = new Date();
  appointments: Appointment[] = [];

  ngOnInit() {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      this.appointments = JSON.parse(storedAppointments);
    }
  }
  addAppointment() {
    if (
      this.newAppointmentTitle.trim() &&
      this.newAppointmentDescription.trim() &&
      this.newAppointmentDate
    ) {
      const newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        description: this.newAppointmentDescription,
        date: this.newAppointmentDate,
      };
      this.appointments.push(newAppointment);
      this.newAppointmentTitle = '';
      this.newAppointmentDescription = '';
      this.newAppointmentDate = new Date();

      localStorage.setItem('appointments', JSON.stringify(this.appointments));
    }
  }

  deleteAppointment(appointmentId: number) {
    this.appointments = this.appointments.filter(
      (appointment) => appointment.id !== appointmentId
    );
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }
}
