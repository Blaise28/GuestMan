/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ProductState } from '../../../store/dashboard/states/product/product.state';
import { getProductAction } from '../../../store/dashboard/states/product/product.actions';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProductService } from '../../../Core/services';
import { CategoryState } from '../../../store/dashboard/states/category/category.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.scss',
})
export class BarComponent implements OnInit {
  @ViewChild('closemodal') closemodal: any;
  private _productService = inject(ProductService);
  private _store = inject(Store);
  productList$!: Observable<any>;
  productList!: any;
  category$!: Observable<any>;
  category!: any;
  isSubmiting: boolean = false;
  productForm!: FormGroup;
  productArticle!: any;
  image!: any;
  protected onDestroy$: Subject<void> = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public router: Router,
  ) {
    this.productList$ = this._store.select(ProductState.getProduct);
    this.category$ = this._store.select(CategoryState.getCategory);
    this.productForm = this.fb.group({
      nom: ['', Validators.required],
      category: ['', Validators.required],
      prix_unitaire: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this._store.dispatch(new getProductAction());
    this.productList$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.productList = data.allProduct;
    });
    this.category$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.category = data;
    });
  }

  selectProduct(event: any) {
    this.productArticle = event;
  }

  newBeverage() {
    this.isSubmiting = true;
    const data = this.productForm.value;
    data['photo'] = this.image;
    this._productService.newBeverage(data).subscribe({
      next: (res) => {
        if (res) {
          this.productForm.reset();
          this.isSubmiting = false;
          this.toastr.success('Operation Done!', 'Success!');
          this.closemodal.nativeElement.click();
          this._store.dispatch(new getProductAction());
        }
      },
      error: (error) => {
        this.toastr.error('Erreur:' + error, 'Error!');
        this.isSubmiting = false;
      },
    });
  }
  uploadProfileImage(event: any) {
    const file = event.target.files.length;
    for (let i = 0; i < file; i++) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.image = event.target.result;
      };
      reader.readAsDataURL(event.target.files[i]);
    }
  }
  delete() {
    const id = this.productArticle.id;
    this._productService.delete(id).subscribe({
      next: (res) => {
        if (res) {
          this.toastr.success('Operation Done!', 'Success!');
          this._store.dispatch(new getProductAction());
          this.productArticle = null;
        }
      },
      error: (error) => {
        this.toastr.error('Erreur:' + error, 'Error!');
      },
    });
  }
}
