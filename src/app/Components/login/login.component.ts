/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../Core/services';
import { Login } from '../../store/auth/auth.actions';
import { AuthState } from '../../store/auth/auth.state';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MaterialModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private _store = inject(Store);
  private _auth = inject(AuthService);
  isAuthenticated$!: Observable<boolean | undefined>;
  isAuthenticated!: boolean | undefined;

  isSubmitting = false;
  authForm!: FormGroup;
  protected onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.authForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.isAuthenticated$ = this._store.select(AuthState.isAuthenticated);
  }

  ngOnInit(): void {
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.router.navigate(['/l']);
      }
    });
  }

  connectSub() {
    this.isSubmitting = true;
    if (this.authForm.valid) {
      this._store
        .dispatch(new Login(this.authForm.value))
        .pipe(takeUntil(this.onDestroy$))
        .subscribe({
          next: (res) => {
            console.log(res);
            this.authForm.reset();
            this.isSubmitting = false;
            this.toastr.success('Login success!', 'Success!');
            this.router.navigate(['/l']);
          },
          error: (err) => {
            console.error('Error:', err);
            this.toastr.error('Incorrect Password or Username', 'Error');
            this.isSubmitting = false;
          },
        });
    }
  }
  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  showPass() {
    const x: any = document.getElementById('passInput');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }
}
