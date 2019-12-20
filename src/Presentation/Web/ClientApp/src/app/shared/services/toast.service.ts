import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: any[] = [];

  success(message: string | TemplateRef<any>) {
    this.show(message, { classname: 'bg-success' });
  }

  info(message: string | TemplateRef<any>) {
    this.show(message, { classname: 'bg-info' });
  }

  warn(message: string | TemplateRef<any>) {
    this.show(message, { classname: 'bg-warning' });
  }

  danger(message: string | TemplateRef<any>) {
    this.show(message, { classname: 'bg-danger' });
  }

  private show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
