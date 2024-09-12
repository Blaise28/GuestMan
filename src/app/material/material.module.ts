import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatListModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatListModule,
  ],
})
export class MaterialModule {
  constructor(private _snackBar: MatSnackBar) {}
}
