/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { OperatorState } from '../../store/dashboard/states/operator/operator.state';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-operator',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './operator.component.html',
  styleUrl: './operator.component.scss',
})
export class OperatorComponent {
  private _store = inject(Store);
  protected onDestroy$: Subject<void> = new Subject<void>();
  operator$!: Observable<any>;
  operator!: any;
  constructor() {
    this.operator$ = this._store.select(OperatorState.getOperator);
  }

  ngOnInit(): void {
    this.operator$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.operator = data;
    });
  }
}
