/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UserState } from '../../store/dashboard/states/user/user.state';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private _store = inject(Store);
  private _router = inject(ActivatedRoute);
  user$!: Observable<any>;
  protected onDestroy$: Subject<void> = new Subject<void>();
  user!: any;
  showMenu!: boolean;
  constructor() {
    this.user$ = this._store.select(UserState.getUser);
  }

  ngOnInit(): void {
    this.user$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.user = data;
    });
  }
}
