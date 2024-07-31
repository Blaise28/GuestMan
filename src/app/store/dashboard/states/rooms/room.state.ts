/* eslint-disable @typescript-eslint/no-explicit-any */
import { RoomService } from './../../../../Core/services/room.service';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { getRoomAction } from './room.actions';
import { tap } from 'rxjs';

export interface RoomStateModel {
  id: number;
  numero: number;
  type: string;
  prix: number;
  disponibilite: boolean;
  is_active: boolean;
}

export interface RoomListModel {
  count: number;
  next: unknown;
  previous: unknown;
  results: RoomStateModel[];
}

@State<RoomListModel>({
  name: 'roomList',
  defaults: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
})
@Injectable()
export class RoomState {
  constructor(private roomService: RoomService) {}
  @Selector()
  static getPicture(state: RoomStateModel): RoomStateModel {
    return state;
  }

  @Action(getRoomAction)
  getRoom(ctx: StateContext<RoomListModel>) {
    console.log('getPictures dispatched');
    return this.roomService.getRooms().pipe(
      tap((result: any) => {
        ctx.patchState({
          count: result.count,
          next: result.next,
          previous: result.previous,
          results: result.results,
        });
        return result;
      }),
    );
  }
}
