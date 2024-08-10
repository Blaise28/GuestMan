import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TicketComponent } from '../../Global/ticket/ticket.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    TicketComponent,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {
  ticketInfo = {
    orderNumber: 'D234123',
    orderTime: new Date('2024-04-27 20:00'),
    amount: 50.99,
    payment: 'cash',
    table: 'T-5',
  };

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
}
