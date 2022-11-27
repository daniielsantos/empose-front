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
  
  categoryEditing: Category = {}
  selectedCategoryId: any = {}


  constructor(
    private productService: ProductService, 
    private router: Router,
    
    private categoryService: CategoryService
      
    ) { 

  }
  ngAfterViewInit(): void {
    this.productService.findAll().subscribe(products => {
      this.products = products;
    })



    this.categoryService.findAll().subscribe(categories => {
      this.categ = categories
      this.categories = categories
    })

  }

  onEditorPreparing = (e: any) => {

  };

  setCellValue = (rowData: any, value: any) => {
    const sku = this.sku.find(s => s.id == value)
    rowData.description = sku!.description;
    rowData.name = sku!.name;
    rowData.price = sku!.price;
    rowData.id = sku!.id;
  };



  productEditing(e: any) {
    this.prodEditing = {}
    this.categoryEditing = {}
    this.prodSkus = []
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


  deleteProduct(e: any) {
    this.productService.delete(e.data).subscribe(res => {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['product']);
      });
    })
  }

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

    if(data.changes.length && this.prodEditing)
      this.prodEditing = data.changes[0].data
    if(this.selectedCategoryId && this.prodEditing) {
      this.prodEditing.category!.id = parseInt(this.selectedCategoryId)
    }
    if(this.prodEditing) {
      this.productService.update(this.prodEditing).subscribe(product => {
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(['product']);
        });
      })
    }

    if(data.changes.length && data.changes[0].type == "insert") {
      let category: Category = {
        id: parseInt(this.selectedCategoryId)
      }
      let prodPayload: Product = {
        name: data.changes[0].data.name,
        description: data.changes[0].data.description,
        active: true,
        category: category,
        skus: this.prodSkus,
        discount: data.changes[0].data.discount || 0
      }
      this.productService.save(prodPayload).subscribe(res => {
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(['product']);
        });
      })      
    }
    localStorage.removeItem('selectedCategory')
  }

  getValue() {
    return this.categoryEditing.id
  }


  onSelectionChanged(e: any) {
    localStorage.setItem('selectedCategory', e.selectedItem.id);
  }



}
