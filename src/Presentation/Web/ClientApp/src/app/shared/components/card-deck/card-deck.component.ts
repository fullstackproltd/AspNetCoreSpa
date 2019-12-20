import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICardEvent } from '../../models';

@Component({
  selector: 'app-card-deck',
  styleUrls: ['./card-deck.component.scss'],
  templateUrl: './card-deck.component.html',
})
export class CardDeckComponent implements OnInit {
  @Input() title: string;
  @Input() hasSidebar: boolean;
  @Input() items: any[];
  @Input() titleKey: string;
  @Input() descriptionKey: string;
  @Input() bodyTemplate: any;
  @Input() footerTemplate: any;
  @Input() headerClass: any;
  @Output() onCardClick = new EventEmitter<ICardEvent>();

  constructor() {}

  ngOnInit(): void {}

  onClickHandler($event: MouseEvent, item: any) {
    this.onCardClick.next({ $event, data: item });
  }
}
