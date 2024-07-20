import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../../../tasks/components/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink, 
    RouterOutlet, 
    DashboardComponent, 
    CommonModule,
    SideNavComponent,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects === '/active') {
          this.selectedComponent = 'active';
        } else if (event.urlAfterRedirects === '/completed') {
          this.selectedComponent = 'completed';
        } else {
          this.selectedComponent = 'dashboard';
        }
      }
    });
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  selectedComponent: string = 'dashboard';

  onComponentSelected(component: string): void {
    this.selectedComponent = component;
  }

}
