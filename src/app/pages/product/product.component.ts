import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  readonly allowedPageSizes = [5, 10, 'all'];

  constructor(private productService: ProductService) { 
    this.products = this.productService.getProducts();
  }

  ngOnInit(): void {
  }

  customizeColumns(columns: any) {
    // columns[0].width = 300;
  }

}
