/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit, ViewChild } from '@angular/core';

import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ClientState } from '../../store/dashboard/states/client/client.state';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClientService } from '../../Core/services';
import { ToastrService } from 'ngx-toastr';
import { getClientAction } from '../../store/dashboard/states/client/client.actions';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
  animations: [
    trigger('list-transactions', [
      state(
        'default',
        style({
          transform: 'scale(1)',
          'background-color': 'white',
          'z-idex': 1,
        }),
      ),
      state(
        'active',
        style({
          transform: 'scale(1.05)',
          'background-color': 'rgb(201,157,242)',
          'z-index': 2,
        }),
      ),
      transition('void => *', [
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
          'background-color': 'rgb(201,157,242)',
        }),
        animate(
          '0.5s ease-in',
          style({
            transform: 'translateX(0)',
            opacity: 1,
            'background-color': 'white',
          }),
        ),
      ]),
      //transition('* => default', [animate('0.5s ease-out')]),
    ]),
  ],
})
export class ClientComponent implements OnInit {
  animationStates: { [key: number]: 'default' | 'active' } = {};
  @ViewChild('closemodal') closemodal: any;
  private refreshSubject = new Subject<void>();
  private _store = inject(Store);
  private _clientService = inject(ClientService);
  protected onDestroy$: Subject<void> = new Subject<void>();
  isSubmiting: boolean = false;
  clientForm!: FormGroup;
  image!: any;
  client$!: Observable<any>;
  client!: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public router: Router,
  ) {
    this.client$ = this._store.select(ClientState.getClient);
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.client$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.client = data;
    });
  }

  newClient() {
    this.isSubmiting = true;
    const data = this.clientForm.value;
    this._clientService.newClient(data).subscribe({
      next: (res) => {
        if (res) {
          this.clientForm.reset();
          this.isSubmiting = false;
          this.toastr.success('Operation Done!', 'Success!');
          this.closemodal.nativeElement.click();
          this._store.dispatch(new getClientAction());
        }
      },
      error: (error) => {
        this.toastr.error('Erreur:' + error, 'Error!');
        this.isSubmiting = false;
      },
    });
  }
}
