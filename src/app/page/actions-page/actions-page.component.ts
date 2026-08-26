import { Component, ViewEncapsulation } from '@angular/core';
import { ActionsComponent } from '../../components/actions/actions.component';

@Component({
  selector: 'app-actions-page',
  imports: [ActionsComponent],
  templateUrl: './actions-page.component.html',
  styleUrl: './actions-page.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class ActionsPageComponent {}
