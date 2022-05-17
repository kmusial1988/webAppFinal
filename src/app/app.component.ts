import {Component, OnInit} from '@angular/core';
import {Organization} from "./model/organization";
import {HttpErrorResponse} from "@angular/common/http";
import {ServiceOrganizationService} from "./service/service-organization.service";
import {NgForm} from "@angular/forms";
import {ConferenceRoomService} from "./service/conference-room.service";
import {ReservationService} from "./service/reservation.service";
import {ConferenceRoom} from "./model/conferenceRoom";
import {Reservation} from "./model/reservation";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public organizations: Organization[];
  public editOrganization: Organization;
  public deleteOrganization: Organization;

  public conferenceRooms: ConferenceRoom[];
  public editConferenceRoom: ConferenceRoom;
  public deleteConferenceRoom: ConferenceRoom;

  public reservations: Reservation[];
  public editReservation: Reservation;
  public deleteReservation: Reservation;

  constructor(private organizationService: ServiceOrganizationService,
              private conferenceRoomService: ConferenceRoomService,
              private reservationService: ReservationService,
              ) { }

  ngOnInit() {
    this.getOrganizations();
    this.getConferenceRooms();
    this.getReservations()
  }

  //Organizatio

  public getOrganizations(): void{
    this.organizationService.getOrganization().subscribe(
      (response: Organization[]) => {
        this.organizations = response;
        console.log(this.organizations);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onAddOrganization(addForm: NgForm): void {
    document.getElementById('add-organization-form').click();
    this.organizationService.addOrganization(addForm.value).subscribe(
      (response: Organization) => {
        console.log(response);
        this.getOrganizations();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  public onUpdateOrganization(organization: Organization): void {
    this.organizationService.updateOrganization(organization).subscribe(
      (response: Organization) => {
        console.log(response);
        this.getOrganizations();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteOrganization(organizationId: number): void {
    this.organizationService.deleteOrganization(organizationId).subscribe(
      (response: void) => {
        console.log(response);
        this.getOrganizations();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public searchOrganizations(key: string): void {
    console.log(key);
    const results: Organization[] = [];
    for (const organization of this.organizations) {
      if (organization.nameOrganization.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(organization);
      }
    }
    this.organizations = results;
    if (results.length === 0 || !key) {
      this.getOrganizations();
    }
  }

  //ConferenceRoom

  public getConferenceRooms(): void{
    this.conferenceRoomService.getRoom().subscribe(
      (response: ConferenceRoom[]) => {
        this.conferenceRooms = response;
        console.log(this.conferenceRooms);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }


  public onAddConferenceRoom(addForm: NgForm): void {
    document.getElementById('add-room-form').click();
    this.conferenceRoomService.addRoom(addForm.value).subscribe(
      (response: ConferenceRoom) => {
        console.log(response);
        this.getConferenceRooms();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateConferenceRoom(conferenceRoom: ConferenceRoom): void {
    this.conferenceRoomService.updateRoom(conferenceRoom).subscribe(
      (response: ConferenceRoom) => {
        console.log(response);
        this.getConferenceRooms();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteConferenceRoom(conferenceRoomId: number): void {
    this.organizationService.deleteOrganization(conferenceRoomId).subscribe(
      (response: void) => {
        console.log(response);
        this.getConferenceRooms();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public searchConferenceRoom(key: string): void {
    console.log(key);
    const results: ConferenceRoom[] = [];
    for (const conferenceRoom of this.conferenceRooms) {

      if (conferenceRoom.conferenceRoomName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(conferenceRoom);
      }
    }
    this.conferenceRooms = results;
    if (results.length === 0 || !key) {
      this.getConferenceRooms();
    }
  }

  //Reservation

  public getReservations(): void{
    this.reservationService.getReservation().subscribe(
      (response: Reservation[]) => {
        this.reservations = response;
        console.log(this.reservations);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onAddReservation(addForm: NgForm): void {
    document.getElementById('add-reservation-form').click();
    this.reservationService.addReservation(addForm.value).subscribe(
      (response: Reservation) => {
        console.log(response);
        this.getReservations();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  public onUpdateReservation(reservation: Reservation): void {
    this.reservationService.updateReservation(reservation).subscribe(
      (response: Reservation) => {
        console.log(response);
        this.getReservations();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteReservation(reservationId: number): void {
    this.reservationService.deleteReservation(reservationId).subscribe(
      (response: void) => {
        console.log(response);
        this.getReservations()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public searchReservation(key: string): void {
    console.log(key);
    const results: Reservation[] = [];
    for (const reservation of this.reservations) {
      if (reservation.reservationIdentifier.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(reservation);
      }
    }
    this.reservations = results;
    if (results.length === 0 || !key) {
      this.getReservations();
    }
  }



  public onOpenModal(organization: Organization,  reservation: Reservation, conferenceRoom: ConferenceRoom, mode: string): void{
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addOrganizationModal');
    }
    if(mode === 'edit') {
      this.editOrganization = organization;
      button.setAttribute('data-target', '#updateOrganizationModal');
    }
    if(mode === 'delete') {
      this.deleteOrganization = organization;
      button.setAttribute('data-target', '#deleteOrganizationModal');
    }
    if(mode === 'roomList') {
      // TODO do zrobienia metoda
      button.setAttribute('data-target', '#allOrganizationRoomModal');
    }
    if(mode === 'roomAdd') {
      // TODO do zrobienia metoda
      button.setAttribute('data-target', '#addRoomModal');
    }
    if(mode === 'deleteRoom') {
      // TODO do zrobienia metoda
      button.setAttribute('data-target', '#deleteRoomModal');
    }
    if(mode === 'updateRoom') {
      // TODO do zrobienia metoda
      button.setAttribute('data-target', '#updateRoomModal');
    }
    if(mode === 'reservation') {
      // TODO do zrobienia metoda
      button.setAttribute('data-target', '#allReservationModal');
    }
    if(mode === 'addReservation') {
      button.setAttribute('data-target', '#addReservationModal');
    }
    if(mode === 'updateReservation') {
      // TODO do zrobienia metoda
      button.setAttribute('data-target', '#updateReservationModal');
    }
    if(mode === 'deleteReservation') {
      // TODO do zrobienia metoda
      button.setAttribute('data-target', '#deleteReservationModal');
    }
    container.appendChild(button);
    button.click();
  }



}
