import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client/services/client.service';
import themes from 'devextreme/ui/themes';
import { Client } from 'app/shared/models/client.model';
import { EmailSenderService } from './services/email-sender.service';
import { EmailOptions } from 'app/shared/models/email.model';
import notify from 'devextreme/ui/notify';
import { Configs } from 'app/shared/models/configs.model';
import { Router } from '@angular/router';

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

  

  constructor(
    private clientService: ClientService, 
    private emailSenderService: EmailSenderService,
    private router: Router,
    ) { 
    this.allMode = 'allPages'
    this.checkBoxesMode = 'always' //themes.current().startsWith('material') ? 'always' : 'onClick';
    this.emailSenderService.getConfigs().subscribe(config => {
      this.config = config
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

  alert(msg: string, type: string) {
    notify({message: msg, type: type, width: 400})
    return new Promise(resolve => setTimeout(() => {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['email']);
      });
      resolve('a')
    }, 2000))
  }


  onCheckboxValueChanged(e: any) {
    console.log(e)
  }

  async onSubmit() {
    if(!this.config) {
      await this.alert('Sistema sem configuração de email!', 'error')
      return
    }
    if(!this.clientSelected.length) {
      await this.alert('Selecione um cliente!', 'error')
      return
    }
    let emailListSize = 0
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
      this.emailSenderService.sendEmail(options).subscribe({
        next: async (value) => {
          emailListSize +=1
          if(emailListSize == this.clientSelected.length) {
            notify({message: 'Email enviado!', width: 400})
          }
        },
        error: async (err) => {
          await this.alert(err.error.message, 'error')
        }
      })
    }
  }

}
