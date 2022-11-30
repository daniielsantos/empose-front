import { Component, OnInit } from '@angular/core';
import { Configs } from 'app/shared/models/configs.model';
import notify from 'devextreme/ui/notify';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  labelMode: string;

  labelLocation: string;

  readOnly: boolean;

  showColon: boolean;

  minColWidth: number;

  colCount: number;

  width: any;

  config: Configs = {};

  constructor(private configService: ConfigService) {
    this.labelMode = 'floating';
    this.labelLocation = 'left';
    this.readOnly = false;
    this.showColon = true;
    this.minColWidth = 300;
    this.colCount = 2;
  }
  ngOnInit(): void {
    this.configService.find().subscribe(config => {
      this.config = config
    })
  }
  onSubmit(e: any) {
    if(e.changes[0].type == 'insert') {
      this.configService.save(e.changes[0].data).subscribe(config => {
        this.config = config
        notify({message: 'Configurações inseridas', width: 400})
      })
    }
    if(e.changes[0].type == 'remove') {
      let payload = {
        id: e.changes[0].key
      }
      this.configService.delete(payload).subscribe(config => {
        this.config = config
        notify({message: 'Configurações atualizadas', width: 400})
      })
    }
    if(e.changes[0].type == 'update') {
      this.configService.update(this.config).subscribe(config => {
        this.config = config
        notify({message: 'Configurações atualizadas', width: 400})
      })
    }
  }
}
