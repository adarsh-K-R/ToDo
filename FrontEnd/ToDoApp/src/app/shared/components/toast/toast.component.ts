import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements AfterViewChecked {
  @Input() message: string = '';
  @Input() toastType: string = 'info';
  @Input() duration: number = 50000;
  @Input() show: boolean = false;

  icon: string = '';

  private toastIcon: { [key: string]: string } = {
    success: '../../../../assets/images/authentication/thumb-up.png',
    failure: '../../../../assets/images/authentication/thumb-down.png',
    warning: '../../../../assets/images/authentication/warning.png'
  };

  constructor(private renderer: Renderer2, private el: ElementRef, private cdr: ChangeDetectorRef) {}

  ngAfterViewChecked(): void {
    if (this.show) {
      this.updateIcon();
    }
  }

  showToastMessage(message: string, type: string, duration: number): void {
    this.message = message;
    this.toastType = type;
    this.duration = duration;
    this.show = true;

    this.cdr.detectChanges();

    setTimeout(() => {
      this.updateIcon();
    });

    setTimeout(() => {
      this.show = false;
    }, duration);
  }

  private updateIcon(): void {
    const iconSrc = this.toastIcon[this.toastType];
    const iconContainer = this.el.nativeElement.querySelector('.toast-icon');

    if (iconContainer) {
      this.renderer.setProperty(iconContainer, 'innerHTML', '');

      const iconElement = this.renderer.createElement('img');
      this.renderer.setAttribute(iconElement, 'src', iconSrc);
      this.renderer.setAttribute(iconElement, 'alt', `${this.toastType} Icon`);
      this.renderer.setStyle(iconElement, 'height', '2.1875em');

      this.renderer.appendChild(iconContainer, iconElement);
    }
  }
}
