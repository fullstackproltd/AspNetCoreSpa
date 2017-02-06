import { FirstAdvancedDirective, BasicComponent } from './first/first-directive';
import { StructuralAdvancedDirective } from './structural/structural-directive';
import { AdvancedDirectivesComponent } from './advanced-directive.component';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [],
    exports: [],
    declarations: [
        AdvancedDirectivesComponent,
        BasicComponent,
        FirstAdvancedDirective,
        StructuralAdvancedDirective
    ],
    providers: [],
})
export class AdvancedDirectivesModule { }
