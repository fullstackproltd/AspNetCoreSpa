import { SignalrComponent } from './signalr.component';
import { ChatComponent } from './chat/chat.component';
import { MoveShapeComponent } from './move-shape/move-shape.component';

export const routes = [
    {
        path: '', component: SignalrComponent, data: { displayText: 'SignalR' },
        children: [
            { path: '', redirectTo: 'chat' },
            { path: 'chat', component: ChatComponent, data: { state: 'chat', displayText: 'Chat' } },
            { path: 'moveshape', component: MoveShapeComponent, data: { state: 'moveshape', displayText: 'Move shape' } },
        ]
    }
];
