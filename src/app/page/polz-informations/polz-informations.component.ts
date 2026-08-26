import { Component, ViewEncapsulation } from '@angular/core';
import { ActionsComponent } from '../../components/actions/actions.component';

@Component({
  selector: 'app-polz-informations',
  imports: [ActionsComponent],
  templateUrl: './polz-informations.component.html',
  styleUrl: './polz-informations.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PolzInformationsComponent {}
