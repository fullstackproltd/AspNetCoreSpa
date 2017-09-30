import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ChatComponent } from './chat.component';
import { routing } from './chat.routes';

@NgModule({
    imports: [routing, SharedModule],
    declarations: [ChatComponent]
})
export class ChatModule { }
