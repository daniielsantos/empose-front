import { Component, enableProdMode, ViewChild, AfterViewInit } from '@angular/core';
import { Category } from 'app/shared/models/category.model';
import { Product } from 'app/shared/models/product.model';
import { Sku } from 'app/shared/models/sku.model';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import notify from 'devextreme/ui/notify';
import { DxDataGridComponent, DxFormComponent, DxSelectBoxComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
import { FileUploadService } from '../file-upload/services/file-upload.service';
import { Uploads } from 'app/shared/models/uploads.model';

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
  categories: any[] = [];
  prodSkus: Sku[] = [];
  
  categ: Category[] = [];
  active: number = 1;
  readonly allowedPageSizes = [5, 10, 'all'];
  prodEditing!: Product 
  
  idCounter: number = 0
  selectedCategoryId: any = {}


  constructor(
    private productService: ProductService, 
    private router: Router,
    private categoryService: CategoryService
      
    ) { 

  }
  ngAfterViewInit(): void {
    this.categoryService.findAll().subscribe(categories => {
      this.categ = categories
      this.categories = categories
    })
    this.productService.findAll().subscribe(products => {
      console.log("prod ", products)
      this.products = products;
    })



  }
  alert(msg: string) {
    notify({message: msg, width: 400})
    return new Promise(resolve => setTimeout(() => {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        console.log('redirect')
        this.router.navigate(['product']);
      });
      resolve('a')
    }, 2000))
  }

  productEditing(e: any) {
    // this.prodEditing = {}
    // this.prodEditing = e.data || null
    this.prodSkus = []
    if(e.data.skus[0].id) {
      this.prodSkus = e.data.skus
      this.prodEditing = e.data
    }
  }


  cancelProducEditing() {    
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['product']);
    });
  }


  deleteProduct(e: any) {
    this.productService.delete(e.data).subscribe(async (res) => {
      await this.alert("Produto deletado!")
    })
  }

  onExporting(e: any) {
    const doc = new jsPDF();
    exportDataGrid({
      jsPDFDocument: doc,
      component: e.component,
      // indent: 5,
    }).then(() => {
      doc.save('produtos.pdf');
    });
  }

  onSavedProduct(data: any) {
    console.log('data ', data)
   
    if(data.changes.length && this.prodEditing)
      this.prodEditing = data.changes[0].data

    if(this.prodEditing) {
      console.log("product editing ", this.prodEditing)
      this.productService.update(this.prodEditing).subscribe(async (product) => {
        await this.alert("Produto atualizado!")
      })
    }

    if(data.changes.length && data.changes[0].type == "insert") {
      if(!this.prodSkus.length) {
        notify("Insira os skus")
        return
      }
      let category: Category = {
        id: data.changes[0].data.category.id
      }
      let prodPayload: Product = {
        name: data.changes[0].data.name,
        description: data.changes[0].data.description,
        active: true,
        category: category,
        skus: this.prodSkus,
        discount: data.changes[0].data.discount || 0
      }
      this.productService.save(prodPayload).subscribe(async (res) => {
        await this.alert("Produto criado!")
        // this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        //   this.router.navigate(['product']);
        // });
      })      
    }
  }

  setCellValue = (rowData: any, value: any) => {
    // console.log("rowData.id ", this.idCounter)
    // this.idCounter = this.idCounter -1
    // rowData.id = this.idCounter;
    rowData.name = value;
    rowData.active = true
  };

  getSku(e: any) {
    console.log("eeeeeeee ", e)

  }
}
