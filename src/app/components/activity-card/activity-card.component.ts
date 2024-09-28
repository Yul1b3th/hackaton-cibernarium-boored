import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-activity-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-card.component.html',
  styleUrl: './activity-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ActivityCardComponent {}
