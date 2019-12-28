import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Validators, NgForm } from '@angular/forms';

import { IFieldConfig, FieldTypes, AppFormComponent } from '@app/shared';

@Component({
  selector: 'appc-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @ViewChild(AppFormComponent, { static: true }) form: AppFormComponent;
  private hub: HubConnection;
  messages: string[] = [];
  config: IFieldConfig[];

  constructor(@Inject('BASE_URL') private baseUrl: string) {}

  public sendMessage(form: NgForm): void {
    if (form.valid) {
      const { message } = form.value;
      const data = `Sent: ${message}`;
      this.hub.invoke('send', message);
      this.messages.push(data);
      this.form.reset();
    }
  }

  ngOnInit() {
    this.config = [
      {
        name: 'message',
        type: FieldTypes.Textbox,
        label: 'Message',
        validation: [Validators.required],
      },
      {
        name: 'button',
        type: FieldTypes.Button,
        label: 'Send',
        onSubmit: this.sendMessage.bind(this),
      },
    ];
    this.hub = new HubConnectionBuilder().withUrl(`${this.baseUrl}chathub`).build();

    this.hub.on('send', (data: any) => {
      const received = `Received: ${data}`;
      this.messages.push(received);
    });

    this.hub
      .start()
      .then(() => console.log('Hub connection started'))
      .catch(err => console.log('Error while establishing connection: ' + err));
  }
}
