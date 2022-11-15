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
import { DxDataGridComponent, DxFormComponent, DxSelectBoxComponent } from 'devextreme-angular';
import { Router } from '@angular/router';

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
  grid!: DxDataGridComponent;
  selectedBox: any
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
  selectedCategoryId: any = {}

  data: any;
  // bosta: any;

  positions : string[] = [
    'HR Manager',
    'IT Manager',
    'CEO',
    'Controller',
    'Sales Manager',
    'Support Manager',
    'Shipping Manager',
  ];

  constructor(private productService: ProductService, private skuService: SkuService, private inventoryService: InventoryService, private categoryService: CategoryService, private router: Router) { 

  }
  ngAfterViewInit(): void {
    this.productService.findAll().subscribe(products => {
      this.products = products;
    })

    this.skuService.findAll().subscribe(skus => {
      this.sku = skus;
    })
    // this.inventoryService.findAll().subscribe(inventoryes => {
    //   this.inventory = inventoryes;
    // })

    this.categoryService.findAll().subscribe(categories => {
      this.categ = categories
      this.categories = categories
    })
  }



  
  onEditorPreparing = (e: any) => {
    // console.log("editing ", e) 
    console.log("parentType ", e) 
    // if (e.parentType === "dataRow" && e.dataField === "id") {
    //   e.editorOptions.onValueChanged = function (ev: any) {
    //     let selectedItem = ev.component.option("selectedItem");
    //     e.setValue(selectedItem);
    //   };
    // }
  };

  setCellValue = (rowData: any, value: any) => {
    const sku = this.sku.find(s => s.id == value)
    rowData.description = sku!.description;
    rowData.name = sku!.name;
    rowData.price = sku!.price;
    rowData.id = sku!.id;
  };





  onSelectionChangedSkus(e: any) {
    // console.log("aaaaaaaa ", this.grid)
    // this.addRow()
    // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ', e.selectedItem)
    // this.sku.push(e.selectedItem)
    // console.log('atualizou ', this.sku)
  }

  // onSelectionChanged(e: any) {
  //   localStorage.setItem('selectedCategory', e.selectedItem.id);
  //   // this.selectedCategoryId = e.selectedItem
  //   console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ', e.selectedItem)
  // }

  productEditing(e: any) {
    console.log("e.data ", e.data)
    if(e.data.skus[0].id){
      this.prodSkus = e.data.skus
      this.prodEditing = e.data
      this.categoryEditing = e.data.category
    }
  }

  cancelProducEditing() {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['product']);
    });
  }


  deleteRow() {
    console.log("entrou ", this.prodSkus)
    // this.dataGrid.instance.deleteRow(1)
  }

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
    this.selectedCategoryId = localStorage.getItem('selectedCategory')
    
    if(data.changes.length)
      this.prodEditing = data.changes[0].data
    if(this.selectedCategoryId)
      this.prodEditing.category!.id = parseInt(this.selectedCategoryId)

      console.log("entrou para atualizar ", this.prodEditing)
    this.productService.update(this.prodEditing).subscribe(product => {
      // window.location.reload();
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['product']);
      });
    })
    localStorage.removeItem('selectedCategory')

    if(data.changes.length && data.changes[0].type == "remove") {
      console.log("entrou remove", this.prodEditing)
    }
  }

  updateProdutoSku(data: any) {
    console.log("update prod ")
  }


  onSelectionChanged(e: any) {
    localStorage.setItem('selectedCategory', e.selectedItem.id);
    // this.selectedCategoryId = e.selectedItem
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ', e.selectedItem)
  }


  saving(data: any) {
    console.log('saving', data)
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
