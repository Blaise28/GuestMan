import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forbiden',
  standalone: true,
  imports: [],
  templateUrl: './forbiden.component.html',
  styleUrl: './forbiden.component.scss',
})
export class ForbidenComponent {
  constructor(private _location: Location) {}
  backClicked() {
    this._location.back();
  }
}
