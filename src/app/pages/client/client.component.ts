import { Component, OnInit, enableProdMode } from '@angular/core';
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
    console.log("this.clients ", this.clients)
  }

  customizeColumns(columns: any) {
    // columns[0].width = 300;
  }


}
