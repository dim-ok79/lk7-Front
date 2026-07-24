import { Component, ViewEncapsulation } from '@angular/core';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { DocumentsComponent } from './documents/documents.component';
import { LogoutsListComponent } from './logouts-list/logouts-list.component';

@Component({
  selector: 'app-account',
  imports: [PatientInfoComponent, DocumentsComponent, LogoutsListComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class AccountComponent {}
