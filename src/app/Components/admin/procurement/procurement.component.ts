/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { getProcurementAction } from '../../../store/dashboard/states/procurement/procurement.actions';
import { ListComponent } from '../../../Global/list/list.component';
import { ProcurementState } from '../../../store/dashboard/states/procurement/procurement.state';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OperationService } from '../../../Core/services';
import { ToastrService } from 'ngx-toastr';
import { UserState } from '../../../store/dashboard/states/user/user.state';
import { WalletState } from '../../../store/dashboard/states/wallets/wallet.state';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-procurement',
  standalone: true,
  imports: [ListComponent, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './procurement.component.html',
  styleUrl: './procurement.component.scss',
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
export class ProcurementComponent implements OnInit {
  animationStates: { [key: number]: 'default' | 'active' } = {};
  @ViewChild('closemodal') closemodal: any;
  selectedFile: File | null = null;
  description: string = '';
  amount: number | null = null;
  private _store = inject(Store);
  private _operationService = inject(OperationService);
  procurement$!: Observable<any>;
  procurement!: any;
  operatorId$!: Observable<any>;
  operatorId!: any;
  procurementForm!: FormGroup;
  wallets$!: Observable<any>;
  wallets!: any;
  protected onDestroy$: Subject<void> = new Subject<void>();
  header = ['Amount', 'Description', 'Operator', 'Date'];
  isSubmiting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.procurement$ = this._store.select(ProcurementState.getProcurement);
    this.operatorId$ = this._store.select(UserState.getUserId);
    this.procurementForm = this.fb.group({
      amount: ['', Validators.required],
      description: ['', Validators.required],
      caisse: ['', Validators.required],
    });
    this.wallets$ = this._store.select(WalletState.getWallet);
  }

  ngOnInit(): void {
    this._store.dispatch(new getProcurementAction());
    this.procurement$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.procurement = data;
    });
    this.operatorId$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.operatorId = data;
    });
    this.wallets$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.wallets = data;
    });
  }

  submitProc() {
    this.isSubmiting = true;
    if (this.procurementForm.valid && this.selectedFile) {
      const data = this.procurementForm.value;
      data['Operator'] = this.operatorId;
      const validData = new FormData();
      validData.append('file', this.selectedFile);
      validData.append('amount', data.amount.toString());
      validData.append('description', data.description);
      validData.append('Operator', data.operator);
      validData.append('caisse', data.caisse);
      this._operationService.newProcurement(data).subscribe({
        next: () => {
          this.toastr.success('Procurement created successfully', 'Success!!');
          this.isSubmiting = false;
          this.closemodal.nativeElement.click();
          this.procurementForm.reset();
          this._store.dispatch(new getProcurementAction());
        },
        error: () => {
          this.toastr.error('Failed to create Procurement', 'Error!!');
          this.isSubmiting = false;
        },
      });
      this.procurementForm.reset();
    }
    this.isSubmiting = false;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
