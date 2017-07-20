import { FirstAdvancedDirective, BasicComponent } from './first/first-directive';
import { StructuralAdvancedDirective } from './structural/structural-directive';
import { DirectivesHomeComponent } from './directives-home.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { routing } from './directives.routes';

@NgModule({
    imports: [routing, SharedModule],
    exports: [],
    declarations: [
        DirectivesHomeComponent,
        BasicComponent,
        FirstAdvancedDirective,
        StructuralAdvancedDirective
    ],
    providers: [],
})
export class DirectivesModule { }
