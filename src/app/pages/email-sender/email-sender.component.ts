import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client/services/client.service';
import themes from 'devextreme/ui/themes';
import { Client } from 'app/shared/models/client.model';
import { EmailSenderService } from './services/email-sender.service';
import { EmailOptions } from 'app/shared/models/email.model';
import notify from 'devextreme/ui/notify';
import { Configs } from 'app/shared/models/configs.model';

@Component({
  selector: 'app-email-sender',
  templateUrl: './email-sender.component.html',
  styleUrls: ['./email-sender.component.css']
})
export class EmailSenderComponent implements OnInit {
  clients: Client[] = [];
  allMode!: string;
  checkBoxesMode!: string;
  clientSelected: Client[] = []
  readonly allowedPageSizes = [5, 10, 'all'];
  valueChangeEvents: any[] = [];
  eventValue: string;
  maxLength = null;
  value: string;
  contentText: any;
  subjectText: any;
  config: Configs = {};

  

  constructor(private clientService: ClientService, private emailSenderService: EmailSenderService) { 
    this.allMode = 'allPages'
    this.checkBoxesMode = 'always' //themes.current().startsWith('material') ? 'always' : 'onClick';
    this.emailSenderService.getConfigs().subscribe(config => {
      this.config = config
      console.log('configs ', config)
    })
    this.clientService.findAll().subscribe(clients => {
      this.clients = clients
    })
    this.contentText = ''
    this.value = ''
    this.valueChangeEvents = [{
      title: 'On Blur',
      name: 'change',
    }, {
      title: 'On Key Up',
      name: 'keyup',
    }];
    this.eventValue = this.valueChangeEvents[0].name;
  }

  getChanges(data: any) {
    this.clientSelected = data.selectedRowsData
  }

  ngOnInit(): void {
  }


  onCheckboxValueChanged(e: any) {
    console.log(e)
  }

  async onSubmit() {
    console.log(this.clientSelected)
    for await (const it of this.clientSelected) {
      let options: EmailOptions = {
        host: this.config.email_host,
        port: 587,
        username: this.config.email_username,
        password: this.config.email_password,
        from: this.config.email_username,
        to: it.email,
        template: "default",
        params: {
          name: '',
          password: ''
        },
        subject: this.subjectText,
        text: this.contentText,
        html: ""
      }
      this.emailSenderService.sendEmail(options).subscribe(res => {
        notify({message: 'Email enviado!', width: 400})
      })
    }
  }

}
