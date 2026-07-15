import { Component, inject } from '@angular/core';
import { ToastService } from './toast-service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
/*
https://stackblitz.com/run?file=src%2Fapp%2Ftoasts-container.component.ts
 */
@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [NgbToastModule],
  template: `
      @for (toast of toastService.toasts(); track toast) {
      <ngb-toast
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hidden)="toastService.remove(toast)"
      >{{toast.message}}
      </ngb-toast>
      }
  `,
  host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
})
export class ToastsContainer {
  toastService = inject(ToastService);
}
