import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'appc-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {
  @Input() routes: any[];
  constructor() { }

  ngOnInit() {
  }

}
