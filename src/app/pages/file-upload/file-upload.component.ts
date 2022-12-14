import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Uploads } from 'app/shared/models/uploads.model';
import { FileUploadService } from './services/file-upload.service';
import notify from 'devextreme/ui/notify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  uploads: Uploads[] = [];
  readonly allowedPageSizes = [5, 10, 'all'];
  @ViewChild('form')
  form!: NgForm;
  value: any[] = []




  constructor(private fileUploadService: FileUploadService, private httpClient: HttpClient, private router: Router) { 
    this.fileUploadService.findAll().subscribe(uploads => {
      this.uploads = uploads;
    })
  }
  alert(msg: string, type: string) {
    notify({message: msg, type: type, width: 400})
    return new Promise(resolve => setTimeout(() => {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['uploads']);
      });
      resolve('a')
    }, 2000))
  }

  startUpload(e:any) {
    let formData = new FormData();
    formData.append("file", e.file, e.file.name);
    this.fileUploadService.save(formData).subscribe({
      next: async (value) => {
        await this.alert('Upload feito!', 'success')
      },
      error: async (err) => {
        await this.alert(err.error.message, 'error')
      }
    }) 
    return true
  }

  ngOnInit(): void {
  }

  onSavedClient(data: any) {
    if(data.changes[0] && data.changes[0].type == "update") {
      let upload: Uploads = {
        id: data.changes[0].data["id"],
        name: data.changes[0].data["name"]
      }
      this.fileUploadService.update(upload).subscribe({
        next: async (value) => {
          await this.alert('Upload atualizado!', 'success')
        },
        error: async (err) => {
          await this.alert(err.error.message, 'error')
        }
      }) 
    }
  }

  onRemovedClient(data: any) {
    let upload: Uploads = {
      id: data.data.id,
      name: data.data.name
    }
    this.fileUploadService.delete(upload).subscribe({
      next: async (value) => {
        await this.alert('Upload removido!', 'success')
      },
      error: async (err) => {
        await this.alert(err.error.message, 'error')
      }
    }) 

  }
  cellTemplate(container: any, options: any) {
    // $("<a>").text(options.displayValue)
    //   .attr("href", options.data.myUrlField)
    //   .appendTo(container);
  }
}
