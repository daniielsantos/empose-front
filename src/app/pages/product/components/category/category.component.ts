import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private categoryService: CategoryService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.categoryService.findAll().subscribe(categories => {
      this.categ = categories
      this.categories = categories
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

  onSavedCategory(data: any) {
    if(data.changes[0].type == "update") {
      this.categoryService.update(data.changes[0].data).subscribe({
        next: async (value) => {
          await this.alert('Categoria atualizada!', 'success')
        },
        error: async (err) => {
          await this.alert(err.error.message, 'error')
        }
      })  
    }

    if(data.changes[0].type == "insert") {
      this.categoryService.save(data.changes[0].data).subscribe({
        next: async (value) => {
          await this.alert('Categoria criada!', 'success')
        },
        error: async (err) => {
          await this.alert(err.error.message, 'error')
        }
      })  
    }
  }

  onRemovedCategory(data: any) {
    this.categoryService.delete(data.data).subscribe({
      next: async (value) => {
        await this.alert('Categoria deletada!', 'success')
      },
      error: async (err) => {
        await this.alert(err.error.message, 'error')
      }
    }) 

  }
}
