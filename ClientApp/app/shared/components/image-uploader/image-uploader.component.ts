// http://raydaq.com/articles/resize-images-angular2
import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'appc-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent {

  public file_srcs: string[] = [];

  // The next two lines are just to show the resize debug
  // they can be removed
  public debug_size_before: string[] = [];
  public debug_size_after: string[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  // This is called when the user selects new files from the upload button
  fileChange(input: any) {
    this.readFiles(input.files);
  }

  readFile(file: any, reader: any, callback: any) {
    // Set a callback funtion to fire after the file is fully loaded
    reader.onload = () => {
      // callback with the results
      callback(reader.result);
    };

    // Read the file
    reader.readAsDataURL(file);
  }

  readFiles(files: any, index = 0) {
    // Create the file reader
    const reader = new FileReader();

    // If there is a file
    if (index in files) {
      // Start reading this file
      this.readFile(files[index], reader, (result: any) => {
        // Create an img element and add the image file data to it
        const img = document.createElement('img');
        img.src = result;

        // Send this img to the resize function (and wait for callback)
        this.resize(img, 200, 200, (resized_jpeg: any, before: any, after: any) => {
          // For debugging (size in bytes before and after)
          this.debug_size_before.push(before);
          this.debug_size_after.push(after);

          // Add the resized jpeg img source to a list for preview
          // This is also the file you want to upload. (either as a
          // base64 string or img.src = resized_jpeg if you prefer a file).
          this.file_srcs.push(resized_jpeg);

          // Read the next file;
          this.readFiles(files, index + 1);
        });
      });
    } else {
      // When all files are done This forces a change detection
      this.changeDetectorRef.detectChanges();
    }
  }


  resize(img: any, MAX_WIDTH: number, MAX_HEIGHT: number, callback: any) {
    // This will wait until the img is loaded before calling this function
    return img.onload = () => {
      console.log('img loaded');
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
    };
  }

}
