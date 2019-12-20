import { Component, OnInit, Input } from '@angular/core';
import { IAccordionItem } from '../../models';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
})
export class AccordionComponent implements OnInit {
  @Input() items: IAccordionItem[];

  constructor() {}

  ngOnInit(): void {}
}
