import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

// Uage
// <app-toggle-switch
//   [checked]="false"
//   (onChange)="change($event)"
// ></app-toggle-switch>
@Component({
  selector: 'app-toggle-switch',
  styleUrls: ['./toggle-switch.component.scss'],
  templateUrl: './toggle-switch.component.html',
})
export class ToggleSwitchComponent implements OnInit {
  constructor() {}

  @Input() checked: boolean;
  @Input() label: string;
  @Input() disabled: boolean;
  @Output() onChange = new EventEmitter<boolean>();

  ngOnInit(): void {}

  changeHandler(e) {
    this.onChange.next(e.target.checked);
  }
}
