import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/Task';
import { TaskListItemComponent } from '../task-list-item/task-list-item.component';
import { StatBoxComponent } from './stat-box/stat-box.component';
import { TaskService } from '../../services/task.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { FiltersComponent } from '../../../shared/components/filters/filters.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TaskListItemComponent, StatBoxComponent, RouterLink, FiltersComponent],
  providers: [DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  currDate: Date = new Date();
  formattedDate: string = '';
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  completedPercent: string = '';
  activePercent: string = '';
  dataSubscription!: Subscription;
  selectedTask: Task | null = null;
  selectedDueDate: string = '';
  selectedPriorities: string[] = [];

  constructor(private datePipe: DatePipe, private taskService: TaskService) {}

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
        this.tasks = tasks.filter(task => this.isToday(this.parseDate(task.createdOn!)))
                          .sort((a, b) => {
                            const dueDateA = this.parseDate(a.dueDate);
                            const dueDateB = this.parseDate(b.dueDate);                        
                            const diffA = Math.abs(dueDateA.getTime() - new Date().getTime());
                            const diffB = Math.abs(dueDateB.getTime() - new Date().getTime());
                            return diffA - diffB;
                          })
                          .sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
        this.filteredTasks = [...this.tasks];
        this.calculatePercentages();
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

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  parseDate(dateString: string): Date {
    return new Date(dateString);
  }

  deleteAll() {
    this.tasks.forEach(task => {
      this.taskService.delete(task.id!).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== task.id);
        },
        error: (error) => {
          console.error(`Error deleting task with ID ${task.id}:`, error);
        }
      });
    });
  }

  calculatePercentages(): void {
    if (this.filteredTasks.length === 0) {
      this.completedPercent = '0%';
      this.activePercent = '0%';
      return;
    }

    const completedTasks = this.filteredTasks.filter(task => task.isCompleted);
    const activeTasks = this.filteredTasks.filter(task => !task.isCompleted);

    const completedPercentage = (completedTasks.length / this.filteredTasks.length) * 100;
    const activePercentage = (activeTasks.length / this.filteredTasks.length) * 100;

    this.completedPercent = Math.ceil(completedPercentage) + '%';
    this.activePercent = Math.floor(activePercentage) + '%';
  }

  delete(taskId: string) {
    this.taskService.delete(taskId).subscribe({
      next: () => {
        console.log('Task Deleted');
        this.fetchTasks();
      },
      error: (error) => {
        console.error('Error in deletion', error);
      }
    });
  }

  onFiltersChanged(event: any) {
    if (event.dueDate !== undefined) {
      this.selectedDueDate = event.dueDate;
    }
    if (event.priorities !== undefined) {
      this.selectedPriorities = event.priorities;
    }
    this.applyFilter(this.selectedDueDate, this.selectedPriorities);
    
  }

  applyFilter(selectedDueDate: string, selectedPriorities: string[]) {
    this.filteredTasks = this.tasks.filter(task => {
      if (selectedDueDate && task.dueDate) {
        const taskDueDate = new Date(task.dueDate);
        const filterDueDate = new Date(selectedDueDate);
        
        if (taskDueDate > filterDueDate) {
          return false;
        }
      }
  
      if (selectedPriorities && selectedPriorities.length > 0) {
        if (!selectedPriorities.includes(task.priority)) {
          return false;
        }
      }
      return true;
    });    
  }

  reset() {
    this.filteredTasks = [...this.tasks];

  }
  
  
}
