import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reservation} from "../model/reservation";
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiReservationUrl = environment.apiBaseUrl+"/reservations";

  constructor(private http: HttpClient) { }

  public getReservation(): Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.apiReservationUrl}`);
  }

  public addReservation(reservation: Reservation): Observable<Reservation>{
    console.log(reservation)
    return this.http.post<Reservation>(`${this.apiReservationUrl}`, reservation);
  }

  public updateReservation(reservation: Reservation): Observable<Reservation>{

    return this.http.put<Reservation>(`${this.apiReservationUrl}`, reservation);
  }

  public deleteReservation(reservationId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiReservationUrl}/${reservationId}`);
  }
}
