import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploadService } from 'app/pages/file-upload/services/file-upload.service';
import { SkuService } from 'app/pages/product/services/sku.service';
import { Sku } from 'app/shared/models/sku.model';
import { Uploads } from 'app/shared/models/uploads.model';

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

  onEditorPreparing = (e: any) => {

  };

  setCellValue = (rowData: any, value: any) => {
    const files = this.fileUploads.find(s => s.id == value)
    console.log("encontrou ", files)
    rowData.id = files!.id;
    rowData.name = files!.name;
    rowData.url = files?.path
  };



  skuEdit(e: any) {
    this.skusEditing = e.data
    console.log("entoru sku edit ", this.skusEditing)
    if(this.skusEditing.images![0].id) {
      this.skuEditingImages = e.data.images
      // delete this.skuEditingImages.
      console.log("entrou if")
      // console.log("skuEdit  ", this.skuEditingImages)
    }
  }

  onSavedSku(data: any) {
    console.log('data ', data)
    console.log('data.changes[0].type', data.changes[0].type)
    this.skusEditing.images = this.skuEditingImages
  
    if(!data.changes || data.changes[0].type != 'remove') {
      console.log('entrou update')
      this.skuService.update(this.skusEditing).subscribe(skus => {
        this.refresh()
      })
    }
  }

  onSavedImages(data: any) {
    console.log('entrou saved image ', data)

  }

  deleteSku(data: any) {
    console.log('data aaaa ', data.data)
    this.skuService.remove(data.data).subscribe(res => {
      console.log('deletou ', res)
      this.refresh()
    })
  }

}
