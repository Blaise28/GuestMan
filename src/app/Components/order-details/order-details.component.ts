/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../../Global/button/button.component';
import { ActivatedRoute } from '@angular/router';
import { BillService } from '../../Core/services';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent implements OnInit {
  montant: number = 0;
  cart: any[] = [];
  private _router = inject(ActivatedRoute);
  private toastr = inject(ToastrService);
  private _billService = inject(BillService);
  billCode!: number;
  bill!: any;

  ngOnInit(): void {
    this._router.params.subscribe((param) => {
      this.billCode = param['code'];
      if (this.billCode) {
        this._billService.getBill(this.billCode).subscribe((booking) => {
          this.bill = booking;
        });
      }
    });
  }

  confirmPayment() {
    //const data = this.montant;
    // Traitement du paiement
    this._billService.confirm(this.billCode).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
        this.ngOnInit();
      },
      error: () => {
        this.toastr.error('Error');
      },
    });
  }
  onButtonClicked(valeur: string) {
    if (valeur === 'C') {
      this.montant = 0;
    } else if (valeur === 'OK') {
      // Traitement du montant final
    } else if (valeur === 'X') {
      this.montant = Math.floor(this.montant / 10);
    } else {
      this.montant = this.montant * 10 + parseInt(valeur);
    }
  }
}
