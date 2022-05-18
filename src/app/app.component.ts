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
  public roomOrganization: Organization;
  public addRoomWithOrganization: Organization;
  public reservationOrganization: Organization;

  public conferenceRooms: ConferenceRoom[];
  public editConferenceRoom: ConferenceRoom;
  public deleteConferenceRoom: ConferenceRoom;
  public addReservationRoom: ConferenceRoom;

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
    this.getReservations();
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
      if (organization.organizationName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(organization);
      }
    }
    this.organizations = results;
    if (results.length === 0 || !key) {
      this.getOrganizations();
    }
  }

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

  public onAddConferenceRoom(addFormRoom: NgForm): void {
    document.getElementById('add-room-form').click();
    console.log(addFormRoom)
    this.conferenceRoomService.addRoom(addFormRoom.value).subscribe(
      (response: ConferenceRoom) => {
        console.log(response);
        this.getConferenceRooms();
        addFormRoom.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addFormRoom.reset();
      }
    );
  }

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

  public onOpenModalOrganization(organization: Organization, mode: string): void{
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
    //TODO
    if(mode === 'roomList') {
      this.roomOrganization = organization;
      button.setAttribute('data-target', '#allOrganizationRoomModal');
    }
    //TODO
    if(mode === 'roomAdd') {
      this.addRoomWithOrganization = organization;
      button.setAttribute('data-target', '#addRoomModal');
    }
    //TODO
    if(mode === 'reservation') {
      this.reservationOrganization = organization;
      button.setAttribute('data-target', '#allReservationModal');
    }
    container.appendChild(button);
    button.click();
  }



  //ConferenceRoom

  public onAddReservation(addFormReservation: NgForm): void {
    document.getElementById('add-reservation-form').click();
    this.reservationService.addReservation(addFormReservation.value).subscribe(
      (response: Reservation) => {
        console.log(response);
        this.getReservations();
        addFormReservation.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addFormReservation.reset();
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
    this.conferenceRoomService.deleteRoom(conferenceRoomId).subscribe(
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

  public onOpenModalRoom(conferenceRoom: ConferenceRoom,   mode: string): void{
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if(mode === 'addReservation') {
      this.addReservationRoom = conferenceRoom;
      button.setAttribute('data-target', '#addReservationModal');
    }

    if(mode === 'updateRoom') {
      this.editConferenceRoom = conferenceRoom;
      button.setAttribute('data-target', '#updateRoomModal');
    }
    if(mode === 'deleteRoom') {
      this.deleteConferenceRoom = conferenceRoom;
      button.setAttribute('data-target', '#deleteRoomModal');
    }
    container.appendChild(button);
    button.click();
  }

  //Reservation



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


  public onOpenModalReservation(reservation: Reservation,   mode: string): void{
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if(mode === 'updateReservation') {
      this.editReservation = reservation;
      button.setAttribute('data-target', '#updateReservationModal');
    }
    if(mode === 'deleteReservation') {
      button.setAttribute('data-target', '#deleteReservationModal');
      this.deleteReservation = reservation;
    }
    container.appendChild(button);
    button.click();
  }

}
