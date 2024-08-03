/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { BookingService } from '../../../../Core/services';
import { getBookingAction } from './booking.actions';

export interface BookingStateModel {
  id: number;
  client: {
    id: string;
    nom: string;
    prenom: string;
    telephone: string;
    adresse: string;
    email: string;
    sodle_dette: string;
    photo: string;
  };
  chambre: {
    id: number;
    numero: number;
    type: string;
    prix: number;
    disponibilite: boolean;
    is_active: boolean;
  };
  date_arrivee: string;
  date_depart: string;
  nombre_nuits: string;
  prix_total: string;
  status: string;
}

export interface ListModel {
  count: number;
  next: unknown;
  previous: unknown;
  results: BookingStateModel[];
}

@State<ListModel>({
  name: 'bookingList',
  defaults: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
})
@Injectable()
export class BookingState {
  constructor(private bookingService: BookingService) {}
  @Selector()
  static getBooking(state: any): any {
    return state;
  }

  @Action(getBookingAction)
  getBooking(ctx: StateContext<ListModel>) {
    return this.bookingService.getBookings().pipe(
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
