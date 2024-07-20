import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../../tasks/services/task.service';
import { Task } from '../../../tasks/models/Task';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  minDate!: string;
  placeholderText: string = 'Select a date';

  constructor(private fb: FormBuilder, private taskService: TaskService) { }

  ngOnInit(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];
   }

  closeModal() {
    this.addTaskForm.reset();
    this.addTaskForm.get('priority')!.setValue('');
    this.close.emit();
  }

  addTaskForm = this.fb.group({
    title: ['', Validators.required],
    detail: ['', Validators.required],
    dueDate: ['', Validators.required],
    priority: ['', Validators.required]
  })

  onDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.value) {
      this.placeholderText = '';
    } else {
      this.placeholderText = 'Select a date';
    }
  }

  addTask() { 
    if (!this.addTaskForm.invalid) {
      let task: Task = {
        name : this.addTaskForm.value.title!,
        details : this.addTaskForm.value.detail!,
        dueDate : this.addTaskForm.value.dueDate!,
        priority : this.addTaskForm.value.priority!
      }
      
      this.taskService.add(task).subscribe({
        next: () => {
          console.log("Task added successfully!");
          this.addTaskForm.reset();
          this.addTaskForm.get('priority')!.setValue('');
          this.closeModal();
        },
        error: (error) => console.error("Error adding task", error)
      })
    } 
  }

}
