/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, ViewChild } from '@angular/core';
import { RoomCardComponent } from '../../Global/room-card/room-card.component';
import { Observable, Subject, takeUntil } from 'rxjs';
import { RoomState } from '../../store/dashboard/states/rooms/room.state';
import { Store } from '@ngxs/store';
import { RouterModule } from '@angular/router';
import { getRoomAction } from '../../store/dashboard/states/rooms/room.actions';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RoomService } from '../../Core/services';
import { ToastrService } from 'ngx-toastr';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [RoomCardComponent, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss',
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
export class RoomListComponent {
  animationStates: { [key: number]: 'default' | 'active' } = {};
  @ViewChild('closemodal') closemodal: any;
  private _store = inject(Store);
  private _roomService = inject(RoomService);
  roomList$!: Observable<any>;
  roomList!: any;
  isSubmiting: boolean = false;
  roomForm!: FormGroup;
  types = ['GOLD', 'SILVER', 'RUBY', 'SAPPHIRE'];
  protected onDestroy$: Subject<void> = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.roomList$ = this._store.select(RoomState.getRooms);
    this.roomForm = this.fb.group({
      numero: ['', Validators.required],
      type: ['', Validators.required],
      prix: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._store.dispatch(new getRoomAction());
    this.roomList$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.roomList = data;
    });
  }
  newRoom() {
    this.isSubmiting = true;
    const data = this.roomForm.value;
    this._roomService.newRoom(data).subscribe({
      next: (res) => {
        if (res) {
          this.roomForm.reset();
          this.isSubmiting = false;
          this.toastr.success('Operation Done!', 'Success!');
          this.closemodal.nativeElement.click();
          this._store.dispatch(new getRoomAction());
        }
      },
      error: (error) => {
        this.toastr.error('Erreur:' + error, 'Error!');
        this.isSubmiting = false;
      },
    });
  }
}
