import {Component, inject, OnDestroy, TemplateRef, ViewChild} from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import {Toast, ToastService} from './toast-service';
import { ToastsContainer } from './toast-container.component';

@Component({
  selector: 'ngbd-toast-global',
  standalone: true,
  imports: [NgbTooltipModule, ToastsContainer],
  templateUrl: './toast-global.component.html',
})
export class NgbdToastGlobal implements OnDestroy {
  toastService = inject(ToastService);

  success(text: string) {
    this.toastService.show({message: text, classname: 'bg-success text-light', delay: 10000});

  }

  danger(text: string) {
    console.log('22 danger txt=', text);
    this.toastService.show({message: text, classname: 'bg-danger text-light', delay: 15000});
  }

  info(text: string) {
    this.toastService.show({message: text, classname: '', delay: 15000} );
  }

  /*
    showDanger1(template: TemplateRef<any>) {
      this.toastService.show({ template, classname: 'bg-danger text-light', delay: 15000 });
    }
  */

  ngOnDestroy(): void {
    this.toastService.clear();
  }
}
