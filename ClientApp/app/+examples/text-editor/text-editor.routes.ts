import { Routes, RouterModule } from '@angular/router';

import { TextEditorComponent } from './text-editor.component';

const routes: Routes = [
    {
        path: '', component: TextEditorComponent
    }
];

export const routing = RouterModule.forChild(routes);
