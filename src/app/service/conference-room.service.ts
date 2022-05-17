import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ConferenceRoom} from "../model/conferenceRoom";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConferenceRoomService {

  private apiRoomOrganizationUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getRoom(): Observable<ConferenceRoom[]>{
    return this.http.get<ConferenceRoom[]>(`${this.apiRoomOrganizationUrl}/conference-room`);
  }

  public getRoomByName(organizatonName: string): Observable<ConferenceRoom[]>{
    return this.http.get<ConferenceRoom[]>(`${this.apiRoomOrganizationUrl}/conference-room/organization/${organizatonName}`);
  }

  public addRoom(conferenceRoom: ConferenceRoom): Observable<ConferenceRoom>{
    return this.http.post<ConferenceRoom>(`${this.apiRoomOrganizationUrl}/conference-room/add`, conferenceRoom);
  }

  public updateRoom(conferenceRoom: ConferenceRoom): Observable<ConferenceRoom>{
    return this.http.put<ConferenceRoom>(`${this.apiRoomOrganizationUrl}/conference-room/update`, conferenceRoom);
  }

  public deleteRoom(conferenceRoomId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiRoomOrganizationUrl}/conference-room//delete/${conferenceRoomId}`);
  }
}
