import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { SignalrComponent } from './signalr.component';
import { ChatComponent } from './chat/chat.component';
import { MoveShapeComponent } from './move-shape/move-shape.component';
import { DraggableDirective } from './move-shape/draggable.directive';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '', component: SignalrComponent,
                children: [
                    { path: '', redirectTo: 'chat' },
                    { path: 'chat', component: ChatComponent, data: { state: 'chat' } },
                    { path: 'moveshape', component: MoveShapeComponent, data: { state: 'moveshape' } },
                ]
            }
        ])
    ],
    declarations: [
        SignalrComponent,
        ChatComponent,
        MoveShapeComponent,
        DraggableDirective
    ]
})
export class SignalrModule { }
