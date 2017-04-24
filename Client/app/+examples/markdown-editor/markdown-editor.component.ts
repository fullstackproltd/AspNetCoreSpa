import { Component, AfterViewInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';

import { UtilityService } from '../../core/services/utility.service';

declare const SimpleMDE: any;

@Component({
  selector: 'appc-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MarkdownEditorComponent implements AfterViewInit {
  @ViewChild('simplemde')
  public textarea: ElementRef;

  constructor(private us: UtilityService) { }
  public ngAfterViewInit() {
    this.us.loadStyle('https://cdnjs.cloudflare.com/ajax/libs/simplemde/1.11.2/simplemde.min.css')
      .subscribe(style => {
        this.us.loadScript('https://cdnjs.cloudflare.com/ajax/libs/simplemde/1.11.2/simplemde.min.js')
          .subscribe(script => {
            const mde = new SimpleMDE({ element: this.textarea.nativeElement });
            console.log(mde);
          });
      });
  }

}
