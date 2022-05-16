import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Organization} from "../model/organization";

@Injectable({
  providedIn: 'root'
})
export class ServiceOrganizationService {

  private apiServerOrganizationUrl = 'http://localhost:8082';

  constructor(private http: HttpClient) { }

  public getOrganization(): Observable<Organization[]>{
    return this.http.get<Organization[]>(`${this.apiServerOrganizationUrl}/organization`);
  }

  public addOrganization(organization: Organization): Observable<Organization>{
    return this.http.post<Organization>(`${this.apiServerOrganizationUrl}/organization/add`, organization);
  }

  public updateOrganization(organization: Organization): Observable<Organization>{
    return this.http.put<Organization>(`${this.apiServerOrganizationUrl}/organization/update`, organization);
  }

  public deleteOrganization(organizationId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerOrganizationUrl}/organization/delete/${organizationId}`);
  }

}
