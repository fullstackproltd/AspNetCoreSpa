import { Routes, RouterModule } from '@angular/router';

import { MarkdownEditorComponent } from './markdown-editor.component';

const routes: Routes = [
    {
        path: '', component: MarkdownEditorComponent
    }
];

export const routing = RouterModule.forChild(routes);
