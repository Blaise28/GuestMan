/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UserState } from '../../store/dashboard/states/user/user.state';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BookingService, ClientService } from '../../Core/services';
import { RoomState } from '../../store/dashboard/states/rooms/room.state';
import { ToastrService } from 'ngx-toastr';
import { getBookingAction } from '../../store/dashboard/states/booking/booking.actions';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../Global/dialog/dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  isSubmiting: boolean = false;
  @ViewChild('closemodal') closemodal: any;
  private _store = inject(Store);
  search = new FormControl('');
  private _client = inject(ClientService);
  private _book = inject(BookingService);
  private _router = inject(ActivatedRoute);
  user$!: Observable<any>;
  room$!: Observable<any>;
  rooms!: any;
  protected onDestroy$: Subject<void> = new Subject<void>();
  user!: any;
  showMenu!: boolean;
  items!: any;
  selectedItems!: any;
  minDate!: string;
  minDate2: string;
  bookingForm!: FormGroup;
  next: boolean = false;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.user$ = this._store.select(UserState.getUser);
    this.room$ = this._store.select(RoomState.getRooms);
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const year = today.getFullYear();
    this.minDate = `${year}-${month}-${day}`;
    this.minDate2 = this.minDate + '-' + year;
    this.bookingForm = this.fb.group({
      client: ['', [Validators.required]],
      chambre: new FormControl(0),
      date_arrivee: ['', [Validators.required]],
      date_depart: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.user$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.user = data;
    });
    this.room$
      .pipe(
        takeUntil(this.onDestroy$),
        map((data: any) => {
          return data.results.filter((result) => result.disponibilite === true);
        }),
      )
      .subscribe((data) => {
        this.rooms = data;
      });
  }

  searchClients() {
    if (this.search.value) {
      this._client.autocomplete(this.search.value).subscribe({
        next: (res) => {
          this.items = res;
        },
        error: () => {
          //
        },
      });
    }
  }

  bookRoom() {
    this.isSubmiting = true;
    const data = this.bookingForm.value;
    data['client'] = this.selectedItems.id;
    this._book
      .newBooking(data)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            this.toastr.success(res.message, 'Success!!');
          } else {
            this.toastr.error(res.message, 'Error!!');
          }
          this.isSubmiting = false;
          this._store.dispatch(new getBookingAction());
          this.closemodal.nativeElement.click();
          this.bookingForm.reset();
          this.selectedItems = null;
        },
        error: () => {
          this.isSubmiting = false;
          this.toastr.error('Operation Failed', 'Error!!');
        },
      });
  }

  selectClient(event: any) {
    this.selectedItems = event;
    this.items = null;
  }
  unselectClient() {
    this.selectedItems = null;
  }

  logout() {
    this.dialog.open(DialogComponent);
  }

  SendDataonChange(event: any) {
    this.next = true;
    this.minDate2 = event.target.value;
  }
}
