import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivityFiltersComponent } from '@components/activity-filters/activity-filters.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ActivityFiltersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {}
