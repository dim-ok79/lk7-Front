import { Component, signal, ViewEncapsulation } from '@angular/core';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { DocumentsComponent } from './documents/documents.component';
import { LogoutsListComponent } from './logouts-list/logouts-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  imports: [CommonModule,PatientInfoComponent, DocumentsComponent, LogoutsListComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class AccountComponent {

/*
  isShown = signal(false);

  toggle() {
    this.isShown.update((value) => !value);
  }
*/
}
