import { CommonModule } from '@angular/common';
import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';

import { GridComponent } from './grid.component';
import { CellComponent } from './cell.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        GridComponent,
        CellComponent
    ],
    exports: [
        GridComponent
    ]
})
export class GridModule {
    public static withComponents(components: any[]) {
        return {
            ngModule: GridModule,
            providers: [
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true }
            ]
        };
    }
}
