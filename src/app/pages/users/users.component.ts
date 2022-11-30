import { Component, OnInit } from '@angular/core';
import { Users } from 'app/shared/models/users.model';
import notify from 'devextreme/ui/notify';
import { LoginService } from '../login/services/login.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Users[] = [];
  userRoles = [
    {
      id: 1,
      name: 'ADMIN'
    },
    {
      id: 2,
      name: 'MANAGER'
    }
  ]
  readonly allowedPageSizes = [5, 10, 'all'];
  constructor(private userService: UsersService, private tokenStorageService: LoginService) { }

  ngOnInit(): void {
    this.userService.findAll().subscribe(users => {
      this.users = users;
    })
  }

  onSavedUser(data: any) {
    if(data.changes[0] && data.changes[0].type == "update") {
      this.userService.update(data.changes[0].data).subscribe(pay => {
        notify({message: 'Usuário atualizado!', width: 400})
      })
    }
    
    if(data.changes[0] && data.changes[0].type == "insert") {
      const usr = this.tokenStorageService.getUser();
      let user: Users = {
        id: data.changes[0].data.id,
        name: data.changes[0].data.name,
        email: data.changes[0].data.email,
        role: data.changes[0].data.role,
        store: usr.store
      }
      this.userService.save(user).subscribe(users => {
        notify({message: 'Usuário cadastrado!', width: 400})
      })
    }
  }

  onRemovedUser(data: any) {
    this.userService.delete(data.data).subscribe(paymentMethods => {
      console.log("Client deleted successfully ",paymentMethods);
      notify({message: 'Usuário excluído!', width: 400})
    })
  }
}
