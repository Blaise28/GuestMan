/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject } from '@angular/core';
import { RoomCardComponent } from '../../Global/room-card/room-card.component';
import { Observable, Subject, takeUntil } from 'rxjs';
import { RoomState } from '../../store/dashboard/states/rooms/room.state';
import { Store } from '@ngxs/store';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [RoomCardComponent, RouterModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss',
})
export class RoomListComponent {
  private _store = inject(Store);
  roomList$!: Observable<any>;
  roomList!: any;
  protected onDestroy$: Subject<void> = new Subject<void>();
  constructor() {
    this.roomList$ = this._store.select(RoomState.getRooms);
  }

  ngOnInit(): void {
    this.roomList$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.roomList = data;
      console.log('Room list:', this.roomList.results);
    });
  }
}
