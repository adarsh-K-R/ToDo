import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive, AddTaskComponent],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  @Output() componentSelected = new EventEmitter<string>();

  isModalOpen = false;

  closeModal() {
    this.isModalOpen = false;
  }

  openModal() {
    this.isModalOpen = true;
  }

  selectComponent(component: string): void {
    this.componentSelected.emit(component);
  }

}