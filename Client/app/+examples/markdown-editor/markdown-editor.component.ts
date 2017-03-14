import { Component, AfterViewInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';

// Declare Global Variable
import '../../../../node_modules/simplemde/dist/simplemde.min.js';
import '../../../../node_modules/simplemde/dist/simplemde.min.css';

import * as SimpleMDE from 'simplemde';
@Component({
  selector: 'appc-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MarkdownEditorComponent implements AfterViewInit {
  @ViewChild('simplemde')
  public textarea: ElementRef;

  constructor(private elementRef: ElementRef) { }
  public ngAfterViewInit() {
    const mde = new SimpleMDE({ element: this.textarea.nativeElement });
  }

}
