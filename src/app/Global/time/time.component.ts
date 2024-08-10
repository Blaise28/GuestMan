import { Component, DestroyRef, inject } from '@angular/core';
import { DateTime, Duration } from 'luxon';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss',
})
export class TimeComponent {
  protected onDestroy$: Subject<void> = new Subject<void>();
  /** Heure actuelle */
  time = '';

  /** Détruire la référence */
  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.setupTimeRefresh();
  }

  /**
   * Configurer le rafraîchissement de l'heure à chaque minute
   */
  private setupTimeRefresh() {
    this.setCurrentTime();
    const aMinute = Duration.fromDurationLike({ minutes: 1 });
    const nextMinute = DateTime.now().plus(aMinute).startOf('minute');
    const toNextMinute = nextMinute.diffNow();
    timer(toNextMinute.milliseconds, aMinute.milliseconds)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.setCurrentTime();
      });
  }

  /**
   * Définir l'heure actuelle
   */
  private setCurrentTime() {
    this.time = DateTime.now().toFormat('HH:mm');
  }
}
