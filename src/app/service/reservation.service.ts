import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reservation} from "../model/reservation";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiReservationUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getReservation(): Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.apiReservationUrl}/reservation`);
  }

  public addReservation(reservation: Reservation): Observable<Reservation>{
    return this.http.post<Reservation>(`${this.apiReservationUrl}/reservation/add`, reservation);
  }

  public updateReservation(reservation: Reservation): Observable<Reservation>{
    return this.http.put<Reservation>(`${this.apiReservationUrl}/reservation/update`, reservation);
  }

  public deleteReservation(reservationId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiReservationUrl}/reservation/delete/${reservationId}`);
  }
}
