import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'app/shared/models/address.model';
import { Client } from 'app/shared/models/client.model';
import notify from 'devextreme/ui/notify';
import { ClientService } from './services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  providers: [ClientService],
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  clientAddress: [] = [];
  clientEdit: Client = {}
  readonly allowedPageSizes = [5, 10, 'all'];

  constructor(private clientService: ClientService, private router: Router) { 

  }

  ngOnInit(): void {
    this.clientService.findAll().subscribe(clients => {
      this.clients = clients;
    })
  }

  alert(msg: string) {
    notify({message: msg, width: 400})
    return new Promise(resolve => setTimeout(() => {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['client']);
      });
      resolve('a')
    }, 2000))
  }

  clientEditing(e: any) {
    console.log('aaaaaa ', e.data)
    this.clientAddress = []
    this.clientEdit = e.data
    if(e.data.address[0].id){
      this.clientAddress = e.data.address
      console.log("entrou if ", this.clientAddress)
    }
  }

  onSavedClient(data: any) {
    // console.log('this.clients ', this.clients)
    // console.log('this.clientAddress ', this.clientAddress)
    // console.log('this.this.clientEdit ', this.clientEdit)
    // console.log('data ', data)
    if(this.clientEdit) {
      console.log("entrou update ", data, ' data.changes[0].key ', data.changes[0].key)
      this.clientService.update(this.clientEdit).subscribe(async(cli) => {
        // console.log("Client updated successfully");
        await this.alert("Cliente atualizado!")
      })
    }
    
    if(data.changes[0] && data.changes[0].type == "insert") {
      let found = this.clients.find(c => typeof c.id == 'string')      
      let c: Client = {
        ...found,
        address: this.clientAddress
      }
      this.clientService.save(c).subscribe(async (client) => {
        await this.alert("Cliente inserido!")
      })
    }
  }

  onRemovedClient(data: any) {
    this.clientService.delete(data.data).subscribe(client => {
      console.log("Client deleted successfully ",client);
    })
  }

}
