import { Component, OnInit, Inject, ElementRef } from '@angular/core';

import { UtilityService } from '../../../core/services/utility.service';

declare const jQuery: any;

@Component({
  selector: 'appc-jquery-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.scss'],
})
export class JQueryDragComponent implements OnInit {

  public elementRef: ElementRef;
  public loadAPI: Promise<any>;

  constructor( @Inject(ElementRef) elementRef: ElementRef, private us: UtilityService) {
    this.elementRef = elementRef;
  }

  public ngOnInit() {
    this.us.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js')
      .subscribe(x => {
        this.us.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js')
          .subscribe(y => {
            try {
              jQuery(this.elementRef.nativeElement).find('.moving-box').draggable({ containment: '#draggable-parent' });
            } catch (error) {
              console.log(error);
            }
          });
      });
  }

}
