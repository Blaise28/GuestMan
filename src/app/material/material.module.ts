import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule],
  exports: [MatFormFieldModule, MatInputModule, MatIconModule],
})
export class MaterialModule {
  constructor(private _snackBar: MatSnackBar) {}
}
