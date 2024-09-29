import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ActivityFiltersService } from '@services/activity-filters.service';

@Component({
  selector: 'activity-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-filters.component.html',
  styleUrls: ['./activity-filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityFiltersComponent {
  private readonly activityFiltersService = inject(ActivityFiltersService);

  activeButton: HTMLElement | null = null;

  handleClick(event: Event) {
    const button = (event.target as HTMLElement).closest('button');

    if (this.activeButton) {
      this.activeButton.classList.remove('active');
    }

    if (button) {
      button.classList.add('active');
      this.activeButton = button;

      const activityMap: { [key: string]: string } = {
        Social: 'social',
        Educació: 'education',
        Caritat: 'charity',
        Cuinar: 'cooking',
        Relaxació: 'relaxation',
        'Treball Intents': 'busywork',
      };

      const activityName = button.textContent?.trim() || '';
      const activityKey = activityMap[activityName] || '';

      this.activityFiltersService.selectedActivity.set(activityKey);
      console.log(activityKey);
    }
  }
}
