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

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [RoomCardComponent, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss',
})
export class RoomListComponent {
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
