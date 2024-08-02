import { Component, Input } from '@angular/core';
import * as models from '../../Core/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss',
})
export class RoomCardComponent {
  @Input() room!: models.room;
}
