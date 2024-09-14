/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { getPictureAction } from './picture.actions';
import { PictureService } from '../../../../Core/services';
import { tap } from 'rxjs';

export interface PictureStateModel {
  image: string;
  caption: string;
  uploader: number;
  date_created: Date;
  room: {
    id: number;
    numero: number;
    type: string;
    prix: number;
    disponibilite: boolean;
    is_active: boolean;
  };
}

export interface PictureListModel {
  count: number;
  next: unknown;
  previous: unknown;
  results: PictureStateModel[];
}

@State<PictureListModel>({
  name: 'picturelist',
  defaults: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
})
@Injectable()
export class PictureState {
  constructor(private pictureService: PictureService) {}
  @Selector()
  static getPicture(state: PictureStateModel): PictureStateModel {
    return state;
  }

  @Action(getPictureAction)
  getPictures(ctx: StateContext<PictureListModel>) {
    return this.pictureService.getPictures().pipe(
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
