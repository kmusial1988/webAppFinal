import {Component, OnInit} from '@angular/core';
import {Organization} from "./model/organization";
import {HttpErrorResponse} from "@angular/common/http";
import {ServiceOrganizationService} from "./service/service-organization.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public organizations: Organization[];
  public editOrganization: Organization;
  public deleteOrganization: Organization;

  constructor(private organizationService: ServiceOrganizationService) { }

  ngOnInit() {
    this.getOrganizations();
  }


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

  public onOpenModal(organization: Organization, mode: string): void{
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addOrganizationModal');
    }
    if(mode === 'reservation') {
      // TODO do zrobienia metoda
      button.setAttribute('data-target', '#allReservationModal');
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
    container.appendChild(button);
    button.click();
  }



}
