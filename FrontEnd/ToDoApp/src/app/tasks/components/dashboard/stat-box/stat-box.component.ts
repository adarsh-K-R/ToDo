import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-box.component.html',
  styleUrl: './stat-box.component.css'
})
export class StatBoxComponent {
  @Input() message: string = '';
  @Input() percentage: string = '';
  @Input() statType: "completed" | "active" = "completed";

  icon: string = '';

  private statIcon: { [key: string]: string } = {
    active: '../../../../assets/images/dashboard/active-icon.svg',
    completed: '../../../../assets/images/dashboard/completed-icon.svg'
  };

  getSrc() {
      return this.statIcon[this.statType];
  }

}
