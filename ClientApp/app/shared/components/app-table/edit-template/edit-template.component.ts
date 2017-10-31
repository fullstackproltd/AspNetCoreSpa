import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'appc-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.scss']
})
export class EditTemplateComponent implements OnInit {
  @Input() public formData: any;
  @Output() public onSubmit: EventEmitter<any> = new EventEmitter<any>();
  public errors: any = [];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() { }

  public update(model: any) {
    this.onSubmit.next(model);
  }

}
