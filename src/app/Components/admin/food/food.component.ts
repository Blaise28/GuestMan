/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ProductState } from '../../../store/dashboard/states/product/product.state';
import { getFoodAction } from '../../../store/dashboard/states/product/product.actions';
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
import { TypeState } from '../../../store/dashboard/states/type/type.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './food.component.html',
  styleUrl: './food.component.scss',
})
export class FoodComponent implements OnInit {
  @ViewChild('closemodal') closemodal: any;
  private _store = inject(Store);
  private _productService = inject(ProductService);
  foodList$!: Observable<any>;
  foodList!: any;
  type$!: Observable<any>;
  type!: any;
  isSubmiting: boolean = false;
  foodForm!: FormGroup;
  productArticle!: any;
  productForm!: FormGroup;
  image!: any;
  protected onDestroy$: Subject<void> = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public router: Router,
  ) {
    this.foodList$ = this._store.select(ProductState.getFood);
    this.type$ = this._store.select(TypeState.getType);
    this.foodForm = this.fb.group({
      name: ['', Validators.required],
      type_repas: ['', Validators.required],
      prix_repas: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._store.dispatch(new getFoodAction());
    this.foodList$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.foodList = data.allFoods;
    });
    this.type$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.type = data;
    });
  }

  selectProduct(event: any) {
    this.productArticle = event;
  }

  newFood() {
    this.isSubmiting = true;
    const data = this.foodForm.value;
    data['photo'] = this.image;
    this._productService.newFood(data).subscribe({
      next: (res) => {
        if (res) {
          this.foodForm.reset();
          this.isSubmiting = false;
          this.toastr.success('Operation Done!', 'Success!');
          this.closemodal.nativeElement.click();
          this._store.dispatch(new getFoodAction());
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
          this._store.dispatch(new getFoodAction());
          this.productArticle = null;
        }
      },
      error: (error) => {
        this.toastr.error('Erreur:' + error, 'Error!');
      },
    });
  }
}
