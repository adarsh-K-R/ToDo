import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  @Output() filtersChanged: EventEmitter<any> = new EventEmitter();
  @Output() resetFilters: EventEmitter<any> = new EventEmitter();
  dropdownLabel: string[] = [];
  selectedProperties: string[] = [];

  options: string[] = ["low", "medium", "high"];

  selectedDueDate: string = '';
  selectedPriorities: string[] = [];

  onDueDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedDueDate = target.value;
  }

  onPriorityChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    let selectedPriorities = [];
    for (let i = 0; i < target.options.length; i++) {
      if (target.options[i].selected) {
        selectedPriorities.push(target.options[i].value);
      }
    }
    this.selectedPriorities = selectedPriorities;
  }

  handle() {
    
    this.filtersChanged.emit({
      dueDate: this.selectedDueDate,
      priorities: this.selectedPriorities
    })
  }

  handleReset() {
    this.resetFilters.emit();
  }


  toggleDropdown(event: Event): void {
    (event.currentTarget as HTMLDivElement).children[1].classList.toggle("show");
  }

  updateSelectedOptions(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const selectedPropertyOption = inputElement.value;

    if (inputElement.checked) 
    {
      this.selectedProperties.push(selectedPropertyOption);
    } else 
    {
      const index = this.selectedProperties.indexOf(selectedPropertyOption);
      if (index !== -1) {
          this.selectedProperties.splice(index, 1);
      }
    }
    this.selectedPriorities = [...this.selectedProperties];
  }

}
