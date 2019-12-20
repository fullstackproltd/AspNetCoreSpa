import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalService } from '../../services';

@Component({
  selector: 'app-image-resizer',
  templateUrl: './image-resizer.component.html',
  styleUrls: ['./image-resizer.component.scss'],
})
export class ImageResizerComponent implements OnInit {
  @Input() width = 200;
  @Input() height = 200;
  @Input() title: string;
  @Input() src: string;
  @Input() showUploadButton: boolean;
  @Input() triggerSaveOnSelect: boolean;
  @Output() save = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  public file_src: string;

  constructor(private modalService: ModalService) {}

  get imageSource(): string {
    return this.file_src || this.src;
  }
  ngOnInit() {}

  onSave() {
    this.save.next(this.file_src);
    this.file_src = null;
  }

  onRemove(input: HTMLInputElement) {
    if (this.file_src) {
      this.file_src = null;
      input.value = '';
      return;
    }

    if (this.src) {
      this.modalService
        .warn({
          title: 'Confirm',
          message: 'Are you sure you want to delete?',
          okLabel: 'Yes',
          cancelLabel: 'No',
        })
        .then(
          () => {
            input.value = '';
            this.remove.next();
          },
          () => {},
        );
    }
  }

  // This is called when the user selects new files from the upload button
  fileChange(input: any) {
    this.readFiles(input.files[0], () => {
      if (this.triggerSaveOnSelect) {
        this.save.next(this.file_src);
      }
    });
  }

  readFile(file: File, reader: any, callback: any) {
    // Set a callback funtion to fire after the file is fully loaded
    reader.onload = () => {
      // callback with the results
      callback(reader.result);
    };

    // Read the file
    reader.readAsDataURL(file);
  }

  readFiles(file: any, callback: any) {
    // Create the file reader
    const reader = new FileReader();

    // If there is a file
    // Start reading this file
    this.readFile(file, reader, (result: any) => {
      // Create an img element and add the image file data to it
      const img = document.createElement('img');
      img.src = result;

      // Send this img to the resize function (and wait for callback)
      this.resize(img, this.width, this.height, (resized_jpeg: any, before: any, after: any) => {
        // Add the resized jpeg img source to a list for preview
        // This is also the file you want to upload. (either as a
        // base64 string or img.src = resized_jpeg if you prefer a file).
        this.file_src = resized_jpeg;
        callback();
      });
    });
  }

  resize(img: any, MAX_WIDTH: number, MAX_HEIGHT: number, callback: any) {
    // This will wait until the img is loaded before calling this function
    return (img.onload = () => {
      // Get the images current width and height
      let width = img.width;
      let height = img.height;

      // Set the WxH to fit the Max values (but maintain proportions)
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      // create a canvas object
      const canvas = document.createElement('canvas');

      // Set the canvas to the new calculated dimensions
      canvas.width = width;
      canvas.height = height;
      const ctx: any = canvas.getContext('2d');

      ctx.drawImage(img, 0, 0, width, height);

      // Get this encoded as a jpeg
      // IMPORTANT: 'jpeg' NOT 'jpg'
      const dataUrl = canvas.toDataURL('image/jpeg');

      // callback with the results
      callback(dataUrl, img.src.length, dataUrl.length);
    });
  }
}
