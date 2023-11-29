import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck{
  title = 'burger-queen';
  isMenuRequired = false;

  constructor(private router: Router){
    
  }

  ngDoCheck(): void {
    const currentUrl = this.router.url;
    console.log(currentUrl);
    if(currentUrl === '/login' || currentUrl === '/register'){
      this.isMenuRequired = false;
    } else {
      this.isMenuRequired = true;
    }
    // throw new Error('Method not implemented');
  }
}
