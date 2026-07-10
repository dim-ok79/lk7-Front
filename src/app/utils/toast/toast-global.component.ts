import { Component, inject, OnDestroy, TemplateRef } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip';
import { ToastsContainer } from './toast-container.component';
import { ToastService } from './toast-service';

@Component({
  selector: 'ngbd-toast-global',
  imports: [NgbTooltip, ToastsContainer],
  templateUrl: './toast-global.component.html',
})
export class NgbdToastGlobal implements OnDestroy {
  private readonly toastService = inject(ToastService);

  showStandard(template: TemplateRef<any>) {
    this.toastService.show({ template });
  }

  showSuccess(template: TemplateRef<any>) {
    this.toastService.show({ template, classname: 'bg-success text-light', delay: 10000 });
  }

  showDanger(template: TemplateRef<any>) {
    this.toastService.show({ template, classname: 'bg-danger text-light', delay: 15000 });
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }
}
