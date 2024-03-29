import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploadService } from 'app/pages/file-upload/services/file-upload.service';
import { SkuService } from 'app/pages/product/services/sku.service';
import { Sku } from 'app/shared/models/sku.model';
import { Uploads } from 'app/shared/models/uploads.model';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-sku',
  templateUrl: './sku.component.html',
  styleUrls: ['./sku.component.css']
})
export class SkuComponent implements OnInit {
  skusEditing: Sku = {}
  skuEditingImages: Uploads[] = []
  skus: Sku[] = []
  fileUploads: Uploads[] = []


  constructor(
    private skuService: SkuService, 
    private router: Router,
    private fileUploadService: FileUploadService,  
  ) { }

  ngOnInit(): void {
    this.skuService.findAll().subscribe(skus => {
      this.skus = skus;
      console.log('sku ', this.skus)
    })
    this.fileUploadService.findAll().subscribe(uploads => {
      this.fileUploads = uploads
    })
  }

  cancelSkuEditing() {
    this.refresh()
  }

  refresh() {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['product']);
    });
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

  onEditorPreparing = (e: any) => {

  };

  setCellValue = (rowData: any, value: any) => {
    const files = this.fileUploads.find(s => s.id == value)
    rowData.id = files!.id;
    rowData.name = files!.name;
    rowData.path = files?.path
  };



  skuEdit(e: any) {
    this.skusEditing = e.data
    if(this.skusEditing.images![0].id) {
      this.skuEditingImages = e.data.images
    }
  }

  onSavedSku(data: any) {
    console.log('data ', data)
    // console.log('data.changes[0].type', data.changes[0].type)
    this.skusEditing.images = this.skuEditingImages
    console.log("skuediting ", this.skusEditing)
    // if(!data.changes || data.changes[0].type != 'remove') {
    if(this.skusEditing && !data.changes.length) {
      console.log('entrou update ',this.skusEditing)
      this.skuService.update(this.skusEditing).subscribe({
        next: async (value) => {
          await this.alert('Sku atualizado!', 'success')
        },
        error: async (err) => {
          await this.alert(err.error.message, 'error')
        }
      })   
      return
    }
    if(this.skusEditing && data.changes[0].type == 'update') {
      console.log('entrou update 2',this.skusEditing)
      this.skuService.update(this.skusEditing).subscribe({
        next: async (value) => {
          await this.alert('Sku atualizado!', 'success')
        },
        error: async (err) => {
          await this.alert(err.error.message, 'error')
        }
      })  
      return
    }
    if(data.changes.length && data.changes[0].type == 'remove') {
      let sku: Sku = {
        id: data.changes[0].key
      }
      this.skuService.remove(sku).subscribe({
        next: async (value) => {
          await this.alert('Sku removido!', 'success')
        },
        error: async (err) => {
          await this.alert(err.error.message, 'error')
        }
      })  

    }
  }

  onSavedImages(data: any) {
    let res = this.skuEditingImages.find((it, index) => { 
      if(it.id == data.changes[0].key) {
        this.skuEditingImages[index].path = this.skuEditingImages[index].path?.split(/\/(.*)/)[1]
      }
    })
  }



  deleteImage(data: any) {
    console.log("entrou para deletar ",data)
  }
}
