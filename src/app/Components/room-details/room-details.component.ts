/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PictureService, RoomService } from '../../Core/services';
import { ActivatedRoute } from '@angular/router';
import { DemoDirective } from '../../Core/directives/demo.directive';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { UserState } from '../../store/dashboard/states/user/user.state';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [DemoDirective, CommonModule, MaterialModule],
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
  user$!: Observable<any>;
  user!: any;

  selectedFiles?: FileList;
  selectedFileNames: any[] = [];
  progressInfos!: any;
  previews!: any;

  constructor(
    private store: Store,
    private toastr: ToastrService,
  ) {
    this.user$ = this.store.select(UserState.getUserId);
  }

  ngOnInit(): void {
    // Subscribe to room details on init
    this._router.params.subscribe((param) => {
      this.roomId = parseInt(param['code']);
      if (this.roomId) {
        this._roomService.getRoom(this.roomId).subscribe((room) => {
          this.room = room;
        });
        this.getPicture(this.roomId);
      }
    });
    this.user$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.user = data;
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
  selectFiles(event: any): void {
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }
  upload(idx: number, file: string): void {
    this.progressInfos[idx] = { value: 0 };

    if (file) {
      const data = {
        image: file,
        uploader: this.user,
        room: this.roomId,
      };

      this._pictureService.upload(data).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(
              (100 * event.loaded) / event.total,
            );
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ';
            this.toastr.success(msg);
            this.progressInfos = null;
            this.selectedFileNames = [null];
            this.previews = null;
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + err;
          this.toastr.error(msg);
        },
      );
    }
  }

  uploadFiles(): void {
    if (this.previews) {
      for (let i = 0; i < this.previews.length; i++) {
        this.upload(i, this.previews[i]);
      }
    }
  }

  deletePicture() {}
  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
