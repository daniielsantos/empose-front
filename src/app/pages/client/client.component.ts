import { Component, OnInit, enableProdMode } from '@angular/core';
import { Address } from 'src/app/shared/models/address.model';
import { Client } from 'src/app/shared/models/client.model';
import { ClientService } from './services/client.service';
// enableProdMode()
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
    // console.log("this.clients ", this.clients)
  }

  customizeColumns(columns: any) {
    // columns[0].width = 300;
  }

  onSavedClient(data: any) {

    // const category = this.category.find(x => x.name == data.changes[0].data["category"].name);
    if(data.changes[0].type == "update") {
      console.log("entrou update ", data)
      if(data.changes[0].data["address[0]"]) {
        let cli = this.clients.find(x => x.id == data.changes[0].data["id"]) || {}
        let addr: Address = {}
        addr.address = data.changes[0].data["address[0]"].address ? data.changes[0].data["address[0]"]?.address : cli?.address![0].address
        addr.city = data.changes[0].data["address[0]"].city ? data.changes[0].data["address[0]"]?.city : cli?.address![0].city
        addr.state = data.changes[0].data["address[0]"].state ? data.changes[0].data["address[0]"]?.state : cli?.address![0].state
        addr.zip_code = data.changes[0].data["address[0]"].zip_code ? data.changes[0].data["address[0]"]?.zip_code : cli?.address![0].zip_code
        addr.country = "BR"
        cli.address = [addr]
        console.log("opa ", cli)
      }

      // this.clientService.update(data.data).subscribe(inventory => {
      //   console.log("Client updated successfully");
      // })
    }
    if(data.changes[0].type == "insert") {
      console.log("entrou insert")
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

  // onUpdatedClient(data: any) {
  //   console.log("data ", data)
  //   if(data.changes[0].data["address[0]"])
  //     console.log("aaa ", data.changes[0].data["address[0]"])
  //   // this.clientService.update(data.data).subscribe(inventory => {
  //   //   console.log("Inventory updated successfully");
  //   // })
  // }

}
