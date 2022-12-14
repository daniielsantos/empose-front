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

  alert(msg: string, type: string) {
    notify({message: msg, type: type, width: 400})
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
    if(this.clientEdit.id) {
      this.clientService.update(this.clientEdit).subscribe({
        next: async (value) => {
          await this.alert('Cliente atualizado!', 'success')
        },
        error: async (err) => {
          await this.alert(err.error.message, 'error')
        }
      }) 
    }
    
    if(data.changes.length && data.changes[0].type == "insert") {
      let found = this.clients.find(c => typeof c.id == 'string')      
      let c: Client = {
        ...found,
        address: this.clientAddress
      }
      this.clientService.save(c).subscribe({
        next: async (value) => {
          await this.alert('Cliente inserido!', 'success')
        },
        error: async (err) => {
          await this.alert(err.error.message, 'error')
        }
      }) 
    }
  }

  onRemovedClient(data: any) {
    this.clientService.delete(data.data).subscribe({
      next: async (value) => {
        await this.alert('Cliente removido!', 'success')
      },
      error: async (err) => {
        await this.alert(err.error.message, 'error')
      }
    }) 
  }

}
