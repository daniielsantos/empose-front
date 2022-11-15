import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client/services/client.service';
import themes from 'devextreme/ui/themes';
import { Client } from 'app/shared/models/client.model';
import { EmailSenderService } from './services/email-sender.service';
import { EmailOptions } from 'app/shared/models/email.model';

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

  valueChangeEvents: any[] = [];
  eventValue: string;
  maxLength = null;
  value: string;
  contentText: any;
  subjectText: any;

  

  constructor(private clientService: ClientService, private emailSenderService: EmailSenderService) { 
    this.allMode = 'allPages'
    this.checkBoxesMode = 'always' //themes.current().startsWith('material') ? 'always' : 'onClick';
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
    // console.log(data.selectedRowsData)
    this.clientSelected = data.selectedRowsData
  }

  ngOnInit(): void {
  }




//-------- text

  onCheckboxValueChanged(e: any) {
    console.log(e)
  }

  async onSubmit() {
    console.log(this.clientSelected)
    for await (const it of this.clientSelected) {
      console.log("it ", it.email)
      let options: EmailOptions = {
        host: "smtp.gmail.com",
        port: 587,
        username: "daniielsouzapvh@gmail.com",
        password: "manjmogzlupwopwx",
        from: "daniielsouzapvh@gmail.com",
        to: it.email,
        template: "default",
        subject: this.subjectText,
        text: this.contentText,
        html: ""
      }
      this.emailSenderService.sendEmail(options).subscribe(res => {
        console.log("emails sent")
      })
    }
  }

}
