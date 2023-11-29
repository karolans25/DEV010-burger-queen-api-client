import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck{
  title = 'burger-queen';
  isMenuRequired = false;
  isAdminUser = false;

  constructor(private router: Router, private auth: AuthService){
    
  }

  ngDoCheck(): void {
    const currentUrl = this.router.url;
    if(currentUrl === '/login' || currentUrl === '/register'){
      this.isMenuRequired = false;
    } else {
      this.isMenuRequired = true;
    }
    if(this.auth.getUserRole()==='admin') {
      this.isAdminUser = true;
    } else {
      this.isAdminUser = false;
    }
    // throw new Error('Method not implemented');
  }
}
