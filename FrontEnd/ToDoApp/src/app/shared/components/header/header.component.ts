import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AddTaskComponent, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  @Input() selectedComponent: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.setUsedLinkByPath((this.router.url).substring(1));
  }

  private setUsedLinkByPath(path: string) {
    this.usedLink = this.options.find(option => option.link === path) || this.options[0];
  }

  isDropdownOpen = false;
  usedLink: any;
  options = [
    { optionName: 'Dashboard', link: '' },
    { optionName: 'Active', link: 'active' },
    { optionName: 'Completed', link: 'completed' },  
  ];

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  selectOption(option: any) {
    this.usedLink = option;
    this.isDropdownOpen = false;
  }

  get unUsedLink() {
    return this.options.filter(opt => opt.optionName !== this.usedLink.optionName);
  }


  isModalOpen = false;

  closeModal() {
    this.isModalOpen = false;
  }

  openModal() {
    this.isModalOpen = true;
  }

  signout() {
    this.authService.logout();
  }
}
