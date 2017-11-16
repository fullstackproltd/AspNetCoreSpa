import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { DataService, NotificationsService } from '@app/core';

@Component({
  selector: 'appc-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.scss']
})
export class UserPhotoComponent implements OnInit {
  profilePicture: any = '';
  selectedImage: any;
  filesToUpload: any;

  constructor(
    private dataService: DataService,
    private ns: NotificationsService,
    private http: HttpClient

  ) { }

  ngOnInit() {
    this.dataService.getImage('api/manage/photo').subscribe(pic => {
      this.profilePicture = pic;
    });
  }

  fileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      /** No need to include Content-Type in Angular 4 */
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      this.http.post(`api/manage/photo`, formData, { headers: headers })
        .subscribe(res => this.ns.success('Upload successfull'));
    }
  }

  upload() {
    this.dataService.post('api/manage/photo', this.filesToUpload)
      .subscribe(image => {
        this.selectedImage = null;
        this.ns.success('Success', 'Image changed successfully');

      });
  }

  cancel() {
    this.selectedImage = undefined;
  }
}
