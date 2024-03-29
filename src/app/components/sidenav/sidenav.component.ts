import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LoginService } from 'app/pages/login/services/login.service';

@UntilDestroy()
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  private roles: string = '';
  isLoggedIn = false;
  username?: string;
  userRole?: string;
  store?: string;
  user: any;
  showConfigPage: boolean = false
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
  constructor(private observer: BreakpointObserver, private router: Router, private tokenStorageService: LoginService) { 

  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(3), untilDestroyed(this))
      .subscribe(result => {
        if (result.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = "side";
          this.sidenav.open();
        }
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      untilDestroyed(this)
    ).subscribe(() => {
      if (this.sidenav.mode === 'over') {
        this.sidenav.close();
      }
    });
    
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      this.store = this.user.store.name
      this.roles = this.user.role;
      if(this.roles != '1')
        this.showConfigPage = true

      this.userRole = this.userRoles.find(e => e.id == this.user.role)?.name
      this.username = this.user.name;
    }
  }
  getUser() {
    
  }

  logout(): void {
    
    this.router.navigate(['/login']);
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
