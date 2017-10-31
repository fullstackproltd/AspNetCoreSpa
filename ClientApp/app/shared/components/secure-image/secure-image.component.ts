import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../../../core';

@Component({
  selector: 'appc-secure-image',
  templateUrl: './secure-image.component.html',
  styleUrls: ['./secure-image.component.scss']
})
export class SecureImageComponent implements OnInit {
  @Input() public imageUrl: string;
  @Input() public height: string;
  @Input() public width: string;
  @Input() public imageText: string;

  public imageData: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    if (this.imageUrl) {
      this.dataService.getImage(this.imageUrl)
        .subscribe(data => {
          this.imageData = data;
        });
    }
  }

}
