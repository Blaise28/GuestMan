import { Component } from '@angular/core';
import { RoomCardComponent } from '../../Global/room-card/room-card.component';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [RoomCardComponent],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss',
})
export class RoomListComponent {
  constructor() {}

  ngOnInit(): void {}
}
