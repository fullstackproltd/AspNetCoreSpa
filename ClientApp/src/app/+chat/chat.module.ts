import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatComponent } from './chat.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', component: ChatComponent, data: { state: 'chat' } }
        ])
    ],
    declarations: [ChatComponent]
})
export class ChatModule { }
