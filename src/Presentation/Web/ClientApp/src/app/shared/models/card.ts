import { TemplateRef } from '@angular/core';

export interface ICard {
  title: string;
  headerClass?: string;
  body: string | TemplateRef<any>;
  footer?: TemplateRef<any>;
}

export interface ICardEvent {
  $event: Event;
  data: any;
}
