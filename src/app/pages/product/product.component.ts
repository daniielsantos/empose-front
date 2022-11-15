import { Component, enableProdMode, ViewChild, AfterViewInit } from '@angular/core';
import { Category } from 'app/shared/models/category.model';
import { Inventory } from 'app/shared/models/inventory.model';
import { Product } from 'app/shared/models/product.model';
import { Sku } from 'app/shared/models/sku.model';
import { CategoryService } from './services/category.service';
import { InventoryService } from './services/inventory.service';
import { ProductService } from './services/product.service';
import { SkuService } from './services/sku.service';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import notify from 'devextreme/ui/notify';
import { DxDataGridComponent } from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements AfterViewInit {
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;
  products: Product[] = [];
  sku: Sku[] = [];
  prodSkus: Sku[] = [];
  inventory: Inventory[] = [];
  categories: any[] = [];
  categ: any[] = [];
  active: number = 1;
  readonly allowedPageSizes = [5, 10, 'all'];
  prodEditing: Product = {}
  categoryEditing: Category = {}

  data: any;
  bosta: any;

  positions : string[] = [
    'HR Manager',
    'IT Manager',
    'CEO',
    'Controller',
    'Sales Manager',
    'Support Manager',
    'Shipping Manager',
  ];


  constructor(private productService: ProductService, private skuService: SkuService, private inventoryService: InventoryService, private categoryService: CategoryService) { 
    this.data = new ArrayStore({
      data: this.categ,
      key: 'id',
    });

  }
  onValueChanged(e: any) {
    console.log("bostaaaaaaaaaaaaaaaaaaaaa ",e)
    // notify(`The value is changed to: "${e.value}"`);
  }

  ngAfterViewInit(): void {
    this.productService.findAll().subscribe(products => {
      this.products = products;
      // this.prodSkus = products.fo
      console.log(products)
    })

    this.skuService.findAll().subscribe(skus => {
      this.sku = skus;
    })
    // this.inventoryService.findAll().subscribe(inventoryes => {
    //   this.inventory = inventoryes;
    // })

    this.categoryService.findAll().subscribe(categories => {
      this.categ = categories
      categories.forEach(it => {
        // console.log(it.name)
        if(!this.categories.includes(it.name))
          this.categories.push(it.name)
      })
      // console.log('cate ', this.categories)
      // this.categories = categories;
    })
  }

  productEditing(e: any) {
    console.log("bostaaaaaa ", this.bosta)
    console.log("categoryEditing ", this.categoryEditing)
    console.log('prod editing ', e)
    this.prodSkus = e.data.skus
    this.prodEditing = e.data
    this.categoryEditing = e.data.category
  }

  getChanges(e: any) {
    console.log('evento ', e)
  }

 







  // deleteRow() {
  //   console.log("entrou ")
  //   this.dataGrid.instance.deleteRow(1)
  // }

  // ngOnInit(): void {
  // }

  onExporting(e: any) {
    const doc = new jsPDF();
    exportDataGrid({
      jsPDFDocument: doc,
      component: e.component,
      // indent: 5,
    }).then(() => {
      doc.save('Companies.pdf');
    });
  }

  onSavedProduct(data: any) {
    console.log('dataaaaaaaaaa ', data)
    console.log('prod ', this.prodEditing)
    // const category = this.prodEditing.skus!.find(x => x.id == data.changes[0].key);
    // console.log('kkkkkkkk ', data)
    // data.changes[0].data["active"] = true;
    // data.changes[0].data["discount"] = 0.0;
    // data.changes[0].data["category"] = category;  

    if(data.changes.length && data.changes[0].type == "remove") {
      console.log("entrou ", this.prodEditing)
      this.productService.update(this.prodEditing).subscribe(product => {
        notify({message: 'Produto salvo!', width: 400})
      })
    }
  }

  onSavedCategory(data: any) {
    if(data.changes[0].type == "update") {
      this.categoryService.update(data.changes[0].data).subscribe(cat => {
        notify({message: 'Categoria atualizada!', width: 400})
      })
    }

    if(data.changes[0].type == "insert") {
      this.categoryService.save(data.changes[0].data).subscribe(cat => {
        notify({message: 'Categoria salva!', width: 400})
      })
    }
  }

  onRemovedCategory(data: any) {
    this.categoryService.delete(data.data).subscribe(cat => {
      notify({message: 'Categoria deletada!', width: 400})
    })
  }

  onUpdatedInventory(data: any) {
    this.inventoryService.update(data.data).subscribe(inventory => {
      notify({message: 'Inventario atualizado', width: 400})
    })
  }

  onSavedSku(data: any) {
    console.log('save sku ', data)
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





}
