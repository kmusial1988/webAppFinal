import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ConferenceRoom} from "../model/conferenceRoom";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConferenceRoomService {

  private apiRoomOrganizationUrl = environment.apiBaseUrl+"/conference-room";

  constructor(private http: HttpClient) { }

  public getRoom(): Observable<ConferenceRoom[]>{
    return this.http.get<ConferenceRoom[]>(`${this.apiRoomOrganizationUrl}`);
  }

  public addRoom(conferenceRoom: ConferenceRoom): Observable<ConferenceRoom>{
    return this.http.post<ConferenceRoom>(`${this.apiRoomOrganizationUrl}/add`, conferenceRoom);
  }

  public updateRoom(conferenceRoom: ConferenceRoom): Observable<ConferenceRoom>{
    return this.http.put<ConferenceRoom>(`${this.apiRoomOrganizationUrl}/update`, conferenceRoom);
  }

  public deleteRoom(conferenceRoomId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiRoomOrganizationUrl}/delete/${conferenceRoomId}`);
  }
}
