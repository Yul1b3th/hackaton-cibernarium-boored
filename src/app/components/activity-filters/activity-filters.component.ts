import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'activity-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-filters.component.html',
  styleUrl: './activity-filters.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityFiltersComponent {
  activeButton: HTMLElement | null = null;

  handleClick(event: Event) {
    const button = (event.target as HTMLElement).closest('button');

    if (this.activeButton) {
      this.activeButton.classList.remove('active');
    }

    if (button) {
      button.classList.add('active');
      this.activeButton = button;
    }
  }
}
