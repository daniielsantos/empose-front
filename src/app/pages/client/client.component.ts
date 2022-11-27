import { Component, OnInit } from '@angular/core';
import { Address } from 'app/shared/models/address.model';
import { Client } from 'app/shared/models/client.model';
import { ClientService } from './services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  providers: [ClientService],
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  readonly allowedPageSizes = [5, 10, 'all'];

  constructor(private clientService: ClientService) { 
    this.clientService.findAll().subscribe(clients => {
      this.clients = clients;
    })
  }

  ngOnInit(): void {
  }

  customizeColumns(columns: any) {
    // columns[0].width = 300;
  }

  onSavedClient(data: any) {
    console.log("data ", data)
    if(data.changes[0] && data.changes[0].type == "update") {
      if(data.changes[0].data["address"]) {
        let cli = this.clients.find(x => x.id == data.changes[0].data["id"]) || {}
        let addr: Address = {}
        addr.address = data.changes[0].data["address"].address ? data.changes[0].data["address"]?.address : cli?.address![0].address
        addr.city = data.changes[0].data["address"].city ? data.changes[0].data["address"]?.city : cli?.address![0].city
        addr.state = data.changes[0].data["address"].state ? data.changes[0].data["address"]?.state : cli?.address![0].state
        addr.zip_code = data.changes[0].data["address"].zip_code ? data.changes[0].data["address"]?.zip_code : cli?.address![0].zip_code
        addr.country = "BR"
        cli.address = [addr]
        this.clientService.update(cli).subscribe(cli => {
          console.log("Client updated successfully");
        })
      }
    }
    
    if(data.changes[0] && data.changes[0].type == "insert") {
      console.log("entrou insert ", data.changes[0])
      let c: Client = {
        name: data.changes[0].data["name"],
        email: data.changes[0].data["email"],
        cpf: data.changes[0].data["cpf"],
        phone_number: data.changes[0].data["phone_number"]
      }
  
      const addr: Address = {}
      addr.address = data.changes[0].data["address[0]"].address
      addr.city = data.changes[0].data["address[0]"].city
      addr.state = data.changes[0].data["address[0]"].state
      addr.zip_code = data.changes[0].data["address[0]"].zip_code
      addr.country = "BR"
      c.address = [addr]
      this.clientService.save(c).subscribe(client => {
        console.log("Client saved successfully ",client);
      })
    }
  }

  onRemovedClient(data: any) {
    this.clientService.delete(data.data).subscribe(client => {
      console.log("Client deleted successfully ",client);
    })
  }

}
