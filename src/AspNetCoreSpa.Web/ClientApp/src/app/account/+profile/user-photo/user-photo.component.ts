import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { NotificationsService } from '../../../core/simple-notifications/simple-notifications.module';

@Component({
  selector: 'appc-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.scss']
})
export class UserPhotoComponent implements OnInit {
  public URL = 'api/manage/photo';
  existingImage: any;
  selectedImage: any;
  imageToUpload: any;

  constructor(
    private dataService: DataService,
    private ns: NotificationsService
  ) { }

  ngOnInit() {
    this.getImage();
  }

  fileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imageToUpload = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = {
          mimetype: e.target.result.split(',')[0].split(':')[1].split(';')[0],
          url: e.target.result
        };
      };
      reader.readAsDataURL(this.imageToUpload);
    }
  }
  upload() {
    const file = new FormData();
    file.append('file', this.imageToUpload);

    this.dataService
      .post(this.URL, file)
      .subscribe(() => {
        this.ns.success('Success', 'Image changed successfully');
        this.existingImage = this.selectedImage.url;
        this.selectedImage = undefined;
      });
  }

  cancel() {
    this.selectedImage = undefined;
  }

  private getImage() {
    this.dataService.getImage(this.URL)
      .subscribe(base64String => {
        this.existingImage = 'data:image/png;base64,' + base64String;
      });
  }
}
