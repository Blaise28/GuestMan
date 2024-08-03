/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UserState } from '../../store/dashboard/states/user/user.state';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
})
export class AsideComponent implements OnInit {
  private _store = inject(Store);
  user$!: Observable<any>;
  protected onDestroy$: Subject<void> = new Subject<void>();
  user!: any;
  constructor() {
    this.user$ = this._store.select(UserState.getUser);
  }

  ngOnInit(): void {
    this.user$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.user = data;
    });
  }
}
