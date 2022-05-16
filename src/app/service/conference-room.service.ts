import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Organization} from "../model/organization";
import {ConferenceRoom} from "../model/conferenceRoom";

@Injectable({
  providedIn: 'root'
})
export class ConferenceRoomService {

  private apiRoomOrganizationUrl = 'http://localhost:8082';

  constructor(private http: HttpClient) { }

  public getRoom(): Observable<ConferenceRoom[]>{
    return this.http.get<ConferenceRoom[]>(`${this.apiRoomOrganizationUrl}/conference-room`);
  }

  public addRoom(conferenceRoom: ConferenceRoom): Observable<Organization>{
    return this.http.post<Organization>(`${this.apiRoomOrganizationUrl}/conference-room/add`, conferenceRoom);
  }

  public updateRoom(conferenceRoom: ConferenceRoom): Observable<Organization>{
    return this.http.put<Organization>(`${this.apiRoomOrganizationUrl}/conference-room/update`, conferenceRoom);
  }

  public deleteRoom(organizationId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiRoomOrganizationUrl}/conference-room/delete/${organizationId}`);
  }
}
