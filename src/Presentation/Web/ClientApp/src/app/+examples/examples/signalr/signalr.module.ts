import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';
import { SignalrComponent } from './signalr.component';
import { ChatComponent } from './chat/chat.component';
import { MoveShapeComponent } from './move-shape/move-shape.component';
import { DraggableDirective } from './move-shape/draggable.directive';

import { routes } from './signalr.routes';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        SignalrComponent,
        ChatComponent,
        MoveShapeComponent,
        DraggableDirective
    ]
})
export class SignalrModule { }
