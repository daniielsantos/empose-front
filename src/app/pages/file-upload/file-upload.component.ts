import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Uploads } from 'app/shared/models/uploads.model';
import { environment } from 'environments/environment';
import { FileUploadService } from './services/file-upload.service';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  // @ViewChild('form') form: NgForm;
  uploads: Uploads[] = [];
  readonly allowedPageSizes = [5, 10, 'all'];
  @ViewChild('form')
  form!: NgForm;
  value: any[] = []

  updateClick() {
  }

  startUpload() {
    console.log('value ', this.value[0])
    let file = this.value[0]
    let formData = new FormData();
    formData.append("file", file, file.name);
    this.fileUploadService.save(formData).subscribe(res => {
      // console.log('done')
      window.location.reload();
    })
    // notify("Upload feito!")
    return true
  }

  constructor(private fileUploadService: FileUploadService, private httpClient: HttpClient) { 
    this.fileUploadService.findAll().subscribe(uploads => {
      this.uploads = uploads;
    })
  }


  ngOnInit(): void {
  }

  // customizeColumns(columns: any) {
  //   // columns[0].width = 300;
  // }

  onSavedClient(data: any) {
    if(data.changes[0] && data.changes[0].type == "update") {
      let upload: Uploads = {
        id: data.changes[0].data["id"],
        name: data.changes[0].data["name"]
      }
      this.fileUploadService.update(upload).subscribe(cli => {
        console.log("File updated successfully");
      })
    }
  }


  onRemovedClient(data: any) {
    let upload: Uploads = {
      id: data.data.id,
      name: data.data.name
    }
    this.fileUploadService.delete(upload).subscribe(res => {
      console.log("File deleted successfully ", res);
    })
  }
}
