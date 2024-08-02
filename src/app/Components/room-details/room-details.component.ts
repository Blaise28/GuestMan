/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PictureService, RoomService } from '../../Core/services';
import { ActivatedRoute } from '@angular/router';
import { DemoDirective } from '../../Core/directives/demo.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [DemoDirective, CommonModule],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.scss',
})
export class RoomDetailsComponent implements OnInit {
  private onDestroy$: Subject<void> = new Subject<void>();
  private _router = inject(ActivatedRoute);
  private _roomService = inject(RoomService);
  private _pictureService = inject(PictureService);
  roomId!: number;
  room!: any;
  pictures!: any;

  constructor() {}

  ngOnInit(): void {
    // Subscribe to room details on init
    this._router.params.subscribe((param) => {
      this.roomId = param['code'];
      if (this.roomId) {
        this._roomService.getRoom(this.roomId).subscribe((room) => {
          this.room = room;
        });
        this.getPicture(this.roomId);
      }
    });
  }
  getPicture(roomId: number) {
    if (roomId) {
      this._pictureService
        .getPictureByRoom(roomId)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((data) => {
          this.pictures = data;
          console.log('Pictures:', this.pictures);
        });
    }
  }
  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
