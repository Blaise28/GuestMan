/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { OperatorState } from '../../store/dashboard/states/operator/operator.state';
import { RouterModule } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { getOperatorAction } from '../../store/dashboard/states/operator/operator.actions';

@Component({
  selector: 'app-operator',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './operator.component.html',
  styleUrl: './operator.component.scss',
  animations: [
    trigger('list-transactions', [
      state(
        'default',
        style({
          transform: 'scale(1)',
          'background-color': 'white',
          'z-idex': 1,
        }),
      ),
      state(
        'active',
        style({
          transform: 'scale(1.05)',
          'background-color': 'rgb(201,157,242)',
          'z-index': 2,
        }),
      ),
      transition('void => *', [
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
          'background-color': 'rgb(201,157,242)',
        }),
        animate(
          '0.5s ease-in',
          style({
            transform: 'translateX(0)',
            opacity: 1,
            'background-color': 'white',
          }),
        ),
      ]),
      //transition('* => default', [animate('0.5s ease-out')]),
    ]),
  ],
})
export class OperatorComponent {
  animationStates: { [key: number]: 'default' | 'active' } = {};
  private _store = inject(Store);
  protected onDestroy$: Subject<void> = new Subject<void>();
  operator$!: Observable<any>;
  operator!: any;
  constructor() {
    this.operator$ = this._store.select(OperatorState.getOperator);
  }

  ngOnInit(): void {
    this._store.dispatch(new getOperatorAction());
    this.operator$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.operator = data;
    });
  }
}
