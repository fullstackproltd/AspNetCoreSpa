import { Component } from '@angular/core';

// import '../../../../node_modules/tinymce/tinymce.js';
// import '../../../../node_modules/tinymce/themes/modern/theme.js';
// import '../../../../node_modules/tinymce/plugins/link/plugin.js';
// import '../../../../node_modules/tinymce/plugins/paste/plugin.js';
// import '../../../../node_modules/tinymce/plugins/table/plugin.js';

@Component({
  selector: 'appc-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent {
  public keyupHandlerFunction(content: any) {
    console.log(content);
  }
}
