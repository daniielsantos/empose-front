import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category.model';
import { Inventory } from 'src/app/shared/models/inventory.model';
import { Product } from 'src/app/shared/models/product.model';
import { Sku } from 'src/app/shared/models/sku.model';
import { CategoryService } from './services/category.service';
import { InventoryService } from './services/inventory.service';
import { ProductService } from './services/product.service';
import { SkuService } from './services/sku.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  sku: Sku[] = [];
  inventory: Inventory[] = [];
  category: Category[] = [];
  active: number = 1;
  readonly allowedPageSizes = [5, 10, 'all'];

  constructor(private productService: ProductService, private skuService: SkuService, private inventoryService: InventoryService, private categoryService: CategoryService) { 
    this.productService.findAll().subscribe(products => {
      this.products = products;
    })
    this.skuService.findAll().subscribe(skus => {
      this.sku = skus;
    })
    this.inventoryService.findAll().subscribe(inventoryes => {
      this.inventory = inventoryes;
    })

    this.categoryService.findAll().subscribe(categories => {
      this.category = categories;
    })
  }

  ngOnInit(): void {
  }

  onSavedProduct(data: any) {
    const category = this.category.find(x => x.name == data.changes[0].data["category"].name);
    data.changes[0].data["status"] = true;
    data.changes[0].data["discount"] = 0.0;
    data.changes[0].data["category"] = category;    
    this.productService.save(data.changes[0].data).subscribe(product => {
      console.log("Product saved successfully");
    })
  }

  onSavedCategory(data: any) {
    if(data.changes[0].type == "update") {
      this.categoryService.update(data.changes[0].data).subscribe(cat => {
        console.log("Category updated successfully");
      })
    }

    if(data.changes[0].type == "insert") {
      this.categoryService.save(data.changes[0].data).subscribe(cat => {
        console.log("Category saved successfully");
      })
    }
  }

  onRemovedCategory(data: any) {
    this.categoryService.delete(data.data).subscribe(cat => {
      console.log("Category deleted successfully");
    })
  }

  onUpdatedInventory(data: any) {
    this.inventoryService.update(data.data).subscribe(inventory => {
      console.log("Inventory updated successfully");
    })
  }

  onSavedSku(data: any) {
    console.log(data)
    // const dados = {
    //   product_id: data.changes[0].data["product"].id,
    //   skus: [{
    //     name: data.changes[0].data["name"],
    //     description: data.changes[0].data["description"],
    //     active: true,
    //   }]
    // }
    // if(data.changes[0].type == "insert") {
    //   console.log(data)
    //   console.log(dados)
    //   this.skuService.save(dados).subscribe(sku => {
    //     console.log("Sku saved successfully");
    //   })
    // }
  }


  customizeColumns(columns: any) {
    // columns[0].width = 300;
  }

}
