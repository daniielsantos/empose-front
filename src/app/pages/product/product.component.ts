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
  
  alert(msg: string, type: string) {
    notify({message: msg, type: type, width: 400})
    return new Promise(resolve => setTimeout(() => {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
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
    this.productService.delete(e.data).subscribe({
      next: async (value) => {
        await this.alert('Produto deletado!', 'success')
      },
      error: async (err) => {
        await this.alert(err.error.message, 'error')
      }
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

  async onSavedProduct(data: any) {
    console.log('data ', data)
   
    if(data.changes.length && this.prodEditing)
      this.prodEditing = data.changes[0].data

    if(this.prodEditing) {
      console.log("product editing ", this.prodEditing)
      let res = this.prodEditing.skus?.map(it => {
        if(typeof it.id == 'string') {
          it.id = 0
        }
        return it
      })
      this.productService.update(this.prodEditing).subscribe({
        next: async (value) => {
          await this.alert('Produto atualizado!', 'success')
        },
        error: async (err) => {
          await this.alert(err.error.message, 'error')
        }
      }) 
    }

    if(data.changes.length && data.changes[0].type == "insert") {
      if(!this.prodSkus.length) {
        await this.alert('Insira os skus', 'error')
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
      this.productService.save(prodPayload).subscribe({
        next: async (value) => {
          await this.alert('Produto criado!', 'success')
        },
        error: async (err) => {
          await this.alert(err.error.message, 'error')
        }
      })    
    }
  }

  setCellValue = (rowData: any, value: any) => {
    rowData.name = value;
    rowData.active = true
  };

  getSku(e: any) {
    console.log("eeeeeeee ", e)

  }
}
