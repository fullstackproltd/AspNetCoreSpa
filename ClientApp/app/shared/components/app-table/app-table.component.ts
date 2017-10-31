import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';

import { AppTableModel } from './app-table.model';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import { DataService, UtilityService } from '../../../core';

@Component({
  selector: 'appc-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss'],
  providers: [DatePipe]
})
export class AppTableComponent implements OnInit {
  @Input()
  public data: AppTableModel;
  private modalInstance: NgbModalRef;
  // public currentRowToEdit: Subject<any> = new Subject();

  constructor(
    public dataService: DataService,
    public us: UtilityService,
    public datePipe: DatePipe,
    private modalService: NgbModal
  ) { }

  ngOnInit() { }

  public formatDate(val: any) {
    return this.datePipe.transform(val, 'dd/MM/yyyy');
  }

  public openModal(dataRow: any) {
    this.modalInstance = this.modalService.open(EditTemplateComponent);
    this.modalInstance.componentInstance.onSubmit.subscribe((model: any) => {
      this.updateOrCreate(model);
    });
    this.modalInstance.componentInstance.formData = {
      fields: dataRow.id ? this.data.formFields : this.data.formFields.slice(1),
      dataToEdit: Observable.of(JSON.parse(JSON.stringify(dataRow)))
    };

    this.modalInstance.result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  public updateOrCreate(model: any) {
    if (model.id) {
      // Update
      this.dataService.put(`${this.data.apiUrl}/${model.id}`, model)
        .subscribe(user => {
          this.data.rows.forEach((u, i) => {
            if (u.id === model.id) {
              Object.assign(u, model);
            }
          });
          this.modalInstance.close();
        });
    } else {
      // Insert
      this.dataService.post(`${this.data.apiUrl}`, model)
        .subscribe(user => {
          this.data.rows.push(user);
          this.modalInstance.close();
        });
    }

  }

  public delete(row: any) {
    if (confirm('Are you sure you want to delete?')) {
      this.dataService.delete(`${this.data.apiUrl}/${row.id}`)
        .subscribe((user: any) => {
          this.data.rows.forEach((u, i) => {
            if (u.id === user.id) {
              this.data.rows.splice(i, 1);
            }
          });
        });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
