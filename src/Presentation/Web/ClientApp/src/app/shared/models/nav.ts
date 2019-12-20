import { TemplateRef } from '@angular/core';

export interface PageNav {
  leftNav: NavItem[];
  rightNav: NavItem[];
}

export interface NavItem {
  text?: string;
  icon?: string;
  hide?: boolean;
  disabled?: boolean;
  link?: string;
  handler?: Function;
  navItemTemplate?: TemplateRef<any>;
}
