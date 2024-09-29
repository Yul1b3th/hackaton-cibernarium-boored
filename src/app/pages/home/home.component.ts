import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { ActivityFiltersComponent } from '@components/activity-filters/activity-filters.component';
import ActivityCardComponent from '@components/activity-card/activity-card.component';
import { ActivityService } from '@services/activity.service';
import { ActivityFiltersService } from '@services/activity-filters.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ActivityFiltersComponent, ActivityCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent implements OnInit {
  private readonly activityService = inject(ActivityService);
  private readonly activityFiltersService = inject(ActivityFiltersService);
  private platform = inject(PLATFORM_ID);
  private title = inject(Title);
  private meta = inject(Meta);

  public activity = signal('');
  public error = signal('');

  ngOnInit() {
    this.title.setTitle('Troba Activitats | Aplicació de Suggeriments');
    this.meta.updateTag({
      name: 'description',
      content: 'Descobreix activitats aleatòries per gaudir i relaxar-te.',
    });
    this.meta.updateTag({ name: 'og:title', content: 'About Page' });
    this.meta.updateTag({
      name: 'keywords',
      content: 'activitats, suggeriments, coses a fer, aleatori, diversió',
    });
    this.meta.updateTag({
      property: 'og:title',
      content: 'Troba Activitats | Aplicació de Suggeriments',
    });
    this.meta.updateTag({
      property: 'og:description',
      content: 'Explora activitats i troba noves idees per passar el temps.',
    });
    this.meta.updateTag({
      name: 'og:image',
      content: `assets/img/img.jpg`,
    });

    if (isPlatformBrowser(this.platform)) {
      this.activityService.getRandomActivity().subscribe({
        next: (activity) => {
          console.log('Activity from API:', activity);
          this.activity.set(activity.activity);
        },
        error: (err) => {
          console.error('Error fetching activity:', err);
          this.error.set(err.message);
        },
      });
    }
  }

  generateActivity() {
    const activityType = this.activityFiltersService.selectedActivity();

    if (isPlatformBrowser(this.platform)) {
      if (activityType) {
        this.activityService.filterActivities(activityType).subscribe({
          next: (activities) => {
            console.log('Filtered activities:', activities);
            if (activities.length > 0) {
              const randomIndex = Math.floor(Math.random() * activities.length);
              const randomActivity = activities[randomIndex];
              this.activity.set(randomActivity.activity);
            }
          },
          error: (err) => {
            console.error('Error fetching filtered activities:', err);
          },
        });
      } else {
        this.activityService.getRandomActivity().subscribe({
          next: (activity) => {
            console.log('Random activity:', activity);
            this.activity.set(activity.activity);
          },
          error: (err) => {
            console.error('Error fetching random activity:', err);
          },
        });
      }
    } else {
      console.log('SSR: No se realizan solicitudes a la API en el servidor');
    }
  }
}
