import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { routing } from './text-editor.routes';
import { TextEditorComponent } from './text-editor.component';
import { SimpleTinyComponent } from './simple-tiny.component';

@NgModule({
    imports: [
        routing,
        SharedModule
    ],
    exports: [],
    declarations: [
        SimpleTinyComponent,
        TextEditorComponent
    ],
    providers: [],
})
export class TextEditorModule { }
