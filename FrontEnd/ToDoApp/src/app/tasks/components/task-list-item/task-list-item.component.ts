import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../models/Task';
import { CommonModule } from '@angular/common';
import { TaskDetailsComponent } from './task-details/task-details.component';

@Component({
  selector: 'app-task-list-item',
  standalone: true,
  imports: [CommonModule, TaskDetailsComponent],
  templateUrl: './task-list-item.component.html',
  styleUrl: './task-list-item.component.css'
})
export class TaskListItemComponent implements OnInit {
  @Input() task!: Task;
  @Output() taskUpdated: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() deleteThis: EventEmitter<string> = new EventEmitter<string>();
  @Output() togglePopup: EventEmitter<Task> = new EventEmitter<Task>();

  isCompleted: boolean = false;
  showPopup: boolean = false;

  ngOnInit(): void {
    this.isCompleted = this.task.isCompleted || false;    
  }

  toggleDetailsPopup() {
    this.togglePopup.emit(this.task);
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
        case 'high':
            return 'priority-high';
        case 'medium':
            return 'priority-medium';
        case 'low':
            return 'priority-low';
        default:
            return '';
    }
  }

  toggleStatus() {
    event?.stopPropagation();
    this.isCompleted = !this.isCompleted;
    this.task.isCompleted = this.isCompleted;
    this.taskUpdated.emit(this.task);
  }

  getStatus() {
    return this.isCompleted ? 'completed' : '';
  }

  getSrc() {
    return this.isCompleted ? '../../../../assets/images/dashboard/checked.svg' : '../../../../assets/images/dashboard/unchecked.svg';
  }

  handleDelete() {
    this.deleteThis.emit(this.task.id);
  }

  handleUpdatedTask(task: Task) {
    this.taskUpdated.emit(task);
  }
}