import { Injectable, signal } from '@angular/core';

export interface Toast {
  /*	template: TemplateRef<any>;*/
  message: string;
  classname?: string;
  delay?: number;
}

@Injectable({ providedIn: 'root' })

export class ToastService {
//  toasts: Toast[] = [];
  private readonly _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();


/*
  show(toast: Toast) {
    console.log('33 show toast=', toast);
    this.toasts.push(toast);
    console.log('44 show this.toasts=', this.toasts);
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
*/

  show(toast: Toast) {
    this._toasts.update((toasts) => [...toasts, toast]);
  }

  remove(toast: Toast) {
    this._toasts.update((toasts) => toasts.filter((t) => t !== toast));
  }

  clear() {
    this._toasts.set([]);
  }
}
