/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ClientState } from '../../store/dashboard/states/client/client.state';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
})
export class ClientComponent {
  private _store = inject(Store);
  protected onDestroy$: Subject<void> = new Subject<void>();
  client$!: Observable<any>;
  client!: any;
  constructor() {
    this.client$ = this._store.select(ClientState.getClient);
  }

  ngOnInit(): void {
    this.client$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.client = data;
    });
  }
}
