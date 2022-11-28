import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'app/shared/models/company.model';
import { Users } from 'app/shared/models/users.model';
import notify from 'devextreme/ui/notify';
import { RegisterService } from '../register/services/register.service';
import { PasswordRecoveryService } from './services/password-recovery.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {
  form: any = {
    email: null,
  };
  isSuccessful = false;
  isSignUpFailed = true;
  errorMessage = '';

  constructor(private accountRecoveryService: PasswordRecoveryService, private router: Router) { }
  ngOnInit(): void {
  }

  onSubmit(): void {
    const {email } = this.form;

    const userRegister: Users = {
      email: email,
    }
    this.accountRecoveryService.accountRecovery(userRegister).subscribe(data => {
        notify({message: 'Senha enviada para o seu Email!', width: 400})
        this.errorMessage = ''
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      }
    );
  }
}
