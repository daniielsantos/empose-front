import { Component, OnInit } from '@angular/core';
import { Inventory } from 'app/shared/models/inventory.model';
import notify from 'devextreme/ui/notify';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  inventory: Inventory[] = [];


  constructor(
    private inventoryService: InventoryService, 
  ) { }

  ngOnInit(): void {
    this.inventoryService.findAll().subscribe(inventoryes => {
      this.inventory = inventoryes;
      console.log("inventory ", inventoryes)
    })
  }

  onUpdatedInventory(data: any) {
    console.log("data ", data.data)
    this.inventoryService.update(data.data).subscribe(inventory => {
      notify({message: 'Inventario atualizado', width: 400})
    })
  }

}
