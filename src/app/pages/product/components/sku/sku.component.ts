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

  onEditorPreparing = (e: any) => {

  };

  setCellValue = (rowData: any, value: any) => {
    const files = this.fileUploads.find(s => s.id == value)
    rowData.id = files!.id;
    rowData.name = files!.name;
    rowData.url = files?.path
  };



  skuEdit(e: any) {
    this.skusEditing = e.data
    console.log("entoru sku edit ", this.skusEditing)
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
      this.skuService.update(this.skusEditing).subscribe(async (skus) => {
        await this.alert("Sku atualizado")        
      })
      return
    }
    if(this.skusEditing && data.changes[0].type == 'update') {
      console.log('entrou update 2',this.skusEditing)
      this.skuService.update(this.skusEditing).subscribe(async (skus) => {
        await this.alert("Sku atualizado")
      })
      return
    }
    if(data.length && data.changes[0].type == 'remove') {
      console.log('entrouu remove ', this.skusEditing)
      let sku: Sku = {
        id: data.changes[0].key
      }
      this.skuService.remove(sku).subscribe(async (skus) => {
        await this.alert("Sku removido!")
      })
    }
  }

  onSavedImages(data: any) {
    console.log('entrou saved image ', data)
    // this.skuEditingImages.forEach(it => {
    //       if(it.id != data.changes[0].data.id) {
    //         console.log("entrou if ")
    //       }
    // });
    // this.skuEditingImages.push(data.changes[0].data)
  }

  deleteSku(data: any) {
    console.log('data aaaa ', data.data)
    // this.skuService.remove(data.data).subscribe(res => {
    //   console.log('deletou ', res)
    // })
  }

  deleteImage(data: any) {
    console.log("entrou para deletar ",data)

  }
}
