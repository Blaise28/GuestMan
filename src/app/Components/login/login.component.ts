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
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../Core/services';
import { HttpClient } from '@angular/common/http';
import { setToken } from '../../store/auth/auth.actions';

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

  isSubmitting = false;
  authForm!: FormGroup;
  protected onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient,
  ) {
    this.authForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  connectSub() {
    this.isSubmitting = true;
    if (this.authForm.valid) {
      this._auth.login(this.authForm.value).subscribe({
        next: (data: any) => {
          console.log(data);
          localStorage.setItem('accessToken', data.access);
          localStorage.setItem('refreshToken', data.refresh);
          this._snackBar.open('Logged In Successfully!', 'Dismiss', {
            duration: 2000,
          });
          this._store.dispatch(new setToken());
          this.authForm.reset();
          this.router.navigate(['/layout']);
        },
        error: (error) => {
          alert('Error: ' + error);
        },
      });
    }
  }
  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
