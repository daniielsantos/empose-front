import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/shared/models/users.model';
import { RegisterService } from './services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = true;
  errorMessage = '';

  constructor(private registeService: RegisterService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { name, email, password } = this.form;
    const user: Users = this.form
    console.log(user)
    this.registeService.save(user).subscribe(
      data => {
        console.log(data);
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
