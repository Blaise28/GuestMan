/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ProductCardComponent } from '../../Global/product-card/product-card.component';
import { ButtonComponent } from '../../Global/button/button.component';
import { TimeComponent } from '../../Global/time/time.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BillService, ProductService } from '../../Core/services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductState } from '../../store/dashboard/states/product/product.state';
import { CategoryState } from '../../store/dashboard/states/category/category.state';
import { BookingState } from '../../store/dashboard/states/booking/booking.state';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [
    ProductCardComponent,
    ButtonComponent,
    TimeComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent implements OnInit {
  time: Date = new Date(Date.now());
  private _route = inject(ActivatedRoute);
  private _billService = inject(BillService);
  product!: any;
  cart: any[] = [];
  montant: number = 0;
  table: boolean = false;
  resident: boolean = false;
  residentValue: string = '';
  @ViewChild('closemodal') closemodal: any;
  private _store = inject(Store);
  private _productService = inject(ProductService);
  category$!: Observable<any>;
  category!: any;
  productList$!: Observable<any>;
  productList!: any;
  bookingList$!: Observable<any>;
  bookingList!: any;
  isSubmiting: boolean = false;
  billForm!: FormGroup;
  productArticle!: any;
  image!: any;
  validCart: any[] = [];
  showBar!: boolean | null;
  reservationId = new FormControl('');
  selectedCategory!: any;
  search = new FormControl('');
  protected onDestroy$: Subject<void> = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public router: Router,
  ) {
    this.productList$ = this._store.select(ProductState.getProduct);
    this.category$ = this._store.select(CategoryState.getCategory);
    this.bookingList$ = this._store.select(BookingState.getBooking);
    this.billForm = this.fb.group({
      reservation_id: ['', Validators.required],
      items: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    //
    this.bookingList$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.bookingList = data.results;
    });
    this.productList$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.productList = data.allProduct;
    });
    this.category$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.category = data.allCategory;
    });
  }
  setRefreshTime() {
    setInterval(() => {
      this.time = new Date(Date.now());
    }, 6000);
  }
  addToCart(product: any) {
    if (product && !this.cart.includes(product)) {
      product['quantity'] = 1;
      this.cart.push(product);
      const validProduct = {
        product: product.id,
      };
      this.validCart.push({ ...validProduct, quantity: product.quantity });
    } else {
      alert('Product already added to cart');
    }
  }
  augmenterQuantite(produitId: number) {
    const produit = this.cart.find((p) => p.id === produitId);
    if (produit.stock && produit.quantity <= produit.stock) {
      produit.quantity++;
    } else if (!produit.stock) {
      produit.quantity++;
    } else {
      alert('Quantité dépassée');
    }
  }
  dimunuerQuantite(produitId: number) {
    const produit = this.cart.find((p) => p.id === produitId);
    produit.quantity--;
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
  dropProduct(productId: any) {
    const produit = this.cart.findIndex((p) => p.id === productId);
    this.cart.splice(produit, 1);
  }

  selectCategory(event: any) {
    this.selectedCategory = event;
    this._productService.getProductByCategory(event).subscribe({
      next: (res: any) => {
        this.productList = res.results;
      },
    });
  }

  submitBill() {
    this.isSubmiting = true;
    const data = this.billForm.value;
    const clientId: string | null = this.reservationId.value;
    data['reservation_id'] = Number(clientId);
    data['items'] = this.validCart;
    this._billService.newBill(data).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
        this.cart = [];
        this.montant = 0;
        this.isSubmiting = false;
      },
      error: () => {
        this.toastr.error("Erreur lors de l'enregistrement");
        this.isSubmiting = false;
      },
    });
  }
  searchProduct() {
    if (this.search.value) {
      this._productService.search(this.search.value).subscribe({
        next: (res: any) => {
          this.productList = res.results;
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
