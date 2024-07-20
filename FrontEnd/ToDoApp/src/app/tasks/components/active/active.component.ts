import { Component } from '@angular/core';
import { Task } from '../../models/Task';
import { CommonModule, DatePipe } from '@angular/common';
import { TaskListItemComponent } from '../task-list-item/task-list-item.component';
import { TaskService } from '../../services/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-active',
  standalone: true,
  imports: [CommonModule, TaskListItemComponent],
  providers: [DatePipe],
  templateUrl: './active.component.html',
  styleUrl: './active.component.css'
})
export class ActiveComponent {
  tasks: Task[] = [];
  currDate: Date = new Date();
  formattedDate: string = '';
  dataSubscription!: Subscription;
  selectedTask: Task | null = null;


  constructor(private taskService: TaskService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.formattedDate = this.datePipe.transform(this.currDate, 'EEEE, dd MMMM yyyy') ?? '';
    this.fetchTasks();
    this.dataSubscription = this.taskService.dataChanged$.subscribe(() => {
      this.fetchTasks();
    });
  }

  fetchTasks(): void {
    this.taskService.getAll().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks.filter(task => !task.isCompleted );
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }

  togglePopup(task: Task) {
    if (this.selectedTask && this.selectedTask.id === task.id) {
      this.selectedTask = null;
    } else {
      this.selectedTask = task;
    }
  }

  handleTaskUpdated(updatedTask: Task) {
    this.taskService.update(updatedTask.id!, updatedTask).subscribe({
      next: () => {
        console.log('Update success');
        this.fetchTasks();
      },
      error: (error) => {
        console.error('Error in updation', error);
      }
    });
  }

  delete(id: string) {
    this.taskService.delete(id).subscribe({
      next: () => console.log("Task Deleted"),
      error: (error) => console.error("Error in deletion ", error)
    })
  }
}
