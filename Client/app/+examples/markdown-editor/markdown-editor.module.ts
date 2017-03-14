import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { routing } from './markdown-editor.routes';
import { MarkdownEditorComponent } from './markdown-editor.component';

@NgModule({
    imports: [
        routing,
        SharedModule
    ],
    exports: [],
    declarations: [
        MarkdownEditorComponent
    ],
    providers: [],
})
export class MarkdownEditorModule { }
