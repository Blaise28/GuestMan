/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  effect,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
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
import { UserState } from '../../store/dashboard/states/user/user.state';
import { TableState } from '../../store/dashboard/states/table/table.state';
import { WalletState } from '../../store/dashboard/states/wallets/wallet.state';

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
  cart = signal<any[]>([]);
  montant: number = 0;
  table: boolean = true;
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
  tableNum = new FormControl('');
  selectedCategory!: any;
  search = new FormControl('');
  operatorId$!: Observable<any>;
  operatorId!: any;
  tableNumber$!: Observable<any>;
  tableNumber!: any;
  wallets$!: Observable<any>;
  wallets!: any;
  total = 0;
  protected onDestroy$: Subject<void> = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public router: Router,
  ) {
    this.productList$ = this._store.select(ProductState.getProduct);
    this.category$ = this._store.select(CategoryState.getCategory);
    this.bookingList$ = this._store.select(BookingState.getBooking);
    this.operatorId$ = this._store.select(UserState.getUserId);
    this.tableNumber$ = this._store.select(TableState.getTable);
    this.wallets$ = this._store.select(WalletState.getWallet);
    this.billForm = this.fb.group({
      reservation_id: ['', Validators.required],
      items: ['', Validators.required],
    });
    effect(
      () => {
        this.refreshCart();
      },
      { allowSignalWrites: true },
    );
  }
  ngOnInit(): void {
    //
    this.tableNumber$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.tableNumber = data.results;
    });
    this.bookingList$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.bookingList = data.results;
    });
    this.productList$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.productList = data.allProduct;
    });
    this.category$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.category = data.allCategory;
    });
    this.operatorId$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.operatorId = data;
    });
    this.wallets$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.wallets = data.results[0];
    });
  }
  setRefreshTime() {
    setInterval(() => {
      this.time = new Date(Date.now());
    }, 6000);
  }
  addToCart(product: any) {
    if (product && !this.cart().includes(product)) {
      product['quantity'] = 1;
      this.cart.update((products) => [...products, product]);
      const validProduct = {
        product: product.id,
      };
      this.validCart.push({ ...validProduct, quantity: product.quantity });
    } else {
      alert('Product already added to cart');
    }
  }
  augmenterQuantite(produitId: number) {
    const produit = this.cart().find((p) => p.id === produitId);
    if (produit.stock && produit.quantity <= produit.stock) {
      produit.quantity++;
      this.validCart.find((p) => p.product === produitId).quantity++;
      this.refreshCart();
    } else if (!produit.stock) {
      produit.quantity++;
      this.validCart.find((p) => p.product === produitId).quantity++;
      this.refreshCart();
    } else {
      alert('Quantité dépassée');
    }
  }
  dimunuerQuantite(produitId: number) {
    const produit = this.cart().find((p) => p.id === produitId);
    this.validCart.find((p) => p.product === produitId).quantity--;
    produit.quantity--;
    this.refreshCart();
    console.log(this.cart());
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
    this.reservationId.reset();
  }
  dropProduct(productId: any) {
    const produitCard = this.cart().findIndex((p) => p.id === productId);
    this.cart().splice(produitCard, 1);
    const produit = this.validCart.findIndex((p) => p.id === productId);
    this.validCart.splice(produit, 1);
    this.refreshCart();
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
    console.log(this.cart);
    this.isSubmiting = true;
    const data = this.billForm.value;
    let clientId: null | number = null;
    if (this.reservationId.value) {
      clientId = Number(this.reservationId.value);
    }
    data['reservation_id'] = clientId;
    data['items'] = this.validCart;
    data['done_by'] = this.operatorId;
    data['table'] = Number(this.tableNum.value);
    data['caisse'] = this.wallets.account_code;
    this._billService.newBill(data).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
        this.cart.set([]);
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

  refreshCart() {
    if (this.cart().length > 0) {
      this.total = 0;
      for (const item of this.cart()) {
        console.log(item);
        this.total = this.total + item.prix_unitaire * item.quantity;
      }
    } else if (this.cart().length <= 0) {
      this.total = 0;
    }
  }
}
