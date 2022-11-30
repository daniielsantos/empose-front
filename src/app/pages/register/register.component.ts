import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from 'app/shared/models/store.model';
import { Users } from 'app/shared/models/users.model';
import { RegisterService } from './services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  labelMode: string = 'floating'
  labelLocation: string ='left'
  readOnly: boolean = false
  showColon: boolean = true
  minColWidth: number = 300
  colCount: number = 2
  width: any;


  form: any = {
    name: null,
    email: null,
    password: null,
    storeName: null,
    storeCpnj: null,
    address: null,    
  };
  isSuccessful = false;
  isSignUpFailed = true;
  errorMessage = '';

  constructor(private registeService: RegisterService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { name, email, password, storeName, storeCpnj, address } = this.form;
    const userStore: Store = {
      name: storeName,
      address: address,
      cnpj: storeCpnj,
      email: email,
    }
    const userRegister: Users = {
      name: name,
      email: email,
      password: password,
      store: userStore
    }
    this.registeService.save(userRegister).subscribe(
      data => {
        this.router.navigate(['/login']);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
