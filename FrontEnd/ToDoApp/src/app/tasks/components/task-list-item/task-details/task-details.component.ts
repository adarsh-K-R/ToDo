import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../../../models/Task';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent implements OnInit {
  @Input() task!: Task;
  @Output() deleteThis: EventEmitter<void> = new EventEmitter<void>();
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();
  @Output() newTask: EventEmitter<Task> = new EventEmitter<Task>();
  isCompleted: boolean = false;
  isEditClicked: boolean = false;
  updateTaskForm: any;
  addedAgo: string = '';
  dueTime: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isCompleted = this.task.isCompleted!;
    this.addedAgo = this.calculateDuration();
    this.dueTime = this.calculateDueLeft();

    this.updateTaskForm = this.fb.group({
      title: [this.task.name, Validators.required],
      detail: [this.task.details, Validators.required]
    })
  }

  cancel() {
    this.isEditClicked = false;
  }

  edit() {
    this.isEditClicked = true;
  }

  getChecboxSrc() {
    return this.isCompleted ? "../../../../assets/images/dashboard/checked.svg" : "../../../../assets/images/dashboard/unchecked.svg";
  }

  getDeleteSrc() {
    return this.isCompleted ? "../../../../assets/images/task-details/delete-dark.svg" : "../../../../assets/images/task-details/delete-icon.svg";
  }

  delete() {
    this.deleteThis.emit();
  }

  toggleStatus() {
    this.toggle.emit();
  }

  updateTask() {
    if (!this.updateTaskForm.invalid) {
      this.task.name = this.updateTaskForm.value.title!;
      this.task.details = this.updateTaskForm.value.detail!;
      this.newTask.emit(this.task);
    }
  }

  calculateDuration() {
    const taskDateUTC = new Date(this.task.createdOn!);
    const currentDate = new Date();
    
    const taskDate: Date = new Date(taskDateUTC.getTime() - taskDateUTC.getTimezoneOffset() * 60000);

    const msInMinute = 60000;
    const msInHour = 3600000;
    const msInDay = 86400000;
    const msInWeek = 604800000;
    const msInMonth = 2629800000;
    const msInYear = 31557600000;
    
    const durationMs = currentDate.getTime() - taskDate.getTime();

    if (durationMs < 5 * msInMinute) {
        return 'just now';
    } else if (durationMs < msInHour) {
        const minutes = Math.floor(durationMs / msInMinute);
        return `${minutes} minutes ago`;
    } else if (durationMs < msInDay) {
        const hours = Math.floor(durationMs / msInHour);
        return `${hours} hours ago`;
    } else if (durationMs < msInWeek) {
        const days = Math.floor(durationMs / msInDay);
        return `${days} days ago`;
    } else if (durationMs < msInMonth) {
        const weeks = Math.floor(durationMs / msInWeek);
        return `${weeks} weeks ago`;
    } else if (durationMs < msInYear) {
        const months = Math.floor(durationMs / msInMonth);
        return `${months} months ago`;
    } else {
        const years = Math.floor(durationMs / msInYear);
        return `${years} years ago`;
    }
  }

  calculateDueLeft(): string {
    const dueDate = new Date(this.task.dueDate);
    const now = new Date();
    const diff = dueDate.getTime() - now.getTime();
    const diffInSeconds = Math.floor(diff / 1000);

    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 24;
    const secondsInWeek = secondsInDay * 7;
    const secondsInMonth = secondsInDay * 30.44;
    const secondsInYear = secondsInDay * 365.25;

    if (diffInSeconds <= 0) {
      return 'Past due';
    }

    if (diffInSeconds < secondsInDay) {
      const hoursLeft = Math.floor(diffInSeconds / secondsInHour);
      return `${hoursLeft} hour${hoursLeft !== 1 ? 's' : ''} left`;
    }

    if (diffInSeconds < secondsInWeek) {
      const daysLeft = Math.floor(diffInSeconds / secondsInDay);
      return `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`;
    }

    if (diffInSeconds < secondsInMonth) {
      const weeksLeft = Math.floor(diffInSeconds / secondsInWeek);
      return `${weeksLeft} week${weeksLeft !== 1 ? 's' : ''} left`;
    }

    if (diffInSeconds < secondsInYear) {
      const monthsLeft = Math.floor(diffInSeconds / secondsInMonth);
      return `${monthsLeft} month${monthsLeft !== 1 ? 's' : ''} left`;
    }

    const yearsLeft = Math.floor(diffInSeconds / secondsInYear);
    return `${yearsLeft} year${yearsLeft !== 1 ? 's' : ''} left`;
  }

}