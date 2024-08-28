/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../Global/product-card/product-card.component';
import { product } from './data';
import { ButtonComponent } from '../../Global/button/button.component';
import { TimeComponent } from '../../Global/time/time.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [
    ProductCardComponent,
    ButtonComponent,
    TimeComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent implements OnInit {
  time: Date = new Date(Date.now());
  product!: any;
  cart: any[] = [];
  montant: number = 0;
  table: boolean = false;
  resident: boolean = false;
  residentValue: string = '';
  constructor() {}
  ngOnInit(): void {
    this.product = product;
    console.log(this.cart);
  }
  setRefreshTime() {
    setInterval(() => {
      this.time = new Date(Date.now());
    }, 6000);
  }
  addToCart(product: any) {
    if (product && !this.cart.includes(product)) {
      product['qty'] = 1;
      this.cart.push(product);
    } else {
      alert('Product already added to cart');
    }
  }
  augmenterQuantite(produitId: string) {
    const produit = this.cart.find((p) => p.name === produitId);
    produit.qty++;
  }
  dimunuerQuantite(produitId: string) {
    const produit = this.cart.find((p) => p.name === produitId);
    if (produit) {
      if (produit.qty < 1) {
        this.cart.splice(produit, 1);
      } else {
        produit.qty--;
      }
    }
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
  takeTable() {
    this.table = !this.table;
  }
}
