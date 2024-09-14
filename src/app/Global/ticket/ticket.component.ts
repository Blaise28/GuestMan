/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxPrintModule } from 'ngx-print';
import { BillService } from '../../Core/services';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, NgxPrintModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
})
export class TicketComponent {
  constructor(private billService: BillService) {}
  @Input() ticketData!: any;
  generatePdf(billId: number): void {
    this.billService.gen_pdg(billId).subscribe((response: any) => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bill_${billId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
}
