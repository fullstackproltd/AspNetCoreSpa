import { Component, OnInit, Input } from '@angular/core';

import { IListItem } from '../../models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  @Input() list: IListItem[];
  constructor() {}

  ngOnInit(): void {}

  trackByFn(index, item) {
    return index;
  }
}
