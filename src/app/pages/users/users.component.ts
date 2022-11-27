import { Component, OnInit } from '@angular/core';
import { Users } from 'app/shared/models/users.model';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Users[] = [];
  readonly allowedPageSizes = [5, 10, 'all'];
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.findAll().subscribe(users => {
      this.users = users;
    })
  }

  onSavedUser(data: any) {
    if(data.changes[0] && data.changes[0].type == "update") {
      this.userService.update(data.changes[0].data).subscribe(pay => {
        console.log("users updated successfully");
      })
    }
    
    if(data.changes[0] && data.changes[0].type == "insert") {
      this.userService.save(data.changes[0].data).subscribe(users => {
        console.log("users saved successfully ",users);
      })
    }
  }

  onRemovedUser(data: any) {
    this.userService.delete(data.data).subscribe(paymentMethods => {
      console.log("Client deleted successfully ",paymentMethods);
    })
  }
}
