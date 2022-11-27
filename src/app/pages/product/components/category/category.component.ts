import { Component, OnInit } from '@angular/core';
import { Category } from 'app/shared/models/category.model';
import notify from 'devextreme/ui/notify';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  categ: Category[] = [];


  constructor(
    private categoryService: CategoryService
    ) { }

  ngOnInit(): void {
    this.categoryService.findAll().subscribe(categories => {
      this.categ = categories
      this.categories = categories
    })
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
}
