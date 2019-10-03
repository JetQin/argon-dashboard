import { Component, OnInit } from '@angular/core';
import {License} from '../../model/license';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {Response} from '../../model/common';
import {filter} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';
import {ContractService} from '../../service/contract.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  license = [];

  expiredTime = '';

  total = 0;

  pageIndex = 1;

  pageSize = 10;

  pageOptions: number[] = [10, 20, 50, 100];

  loading = false;

  files: UploadFile[] = [];

  validateForm: FormGroup;

  constructor(private contractService: ContractService,
              private fb: FormBuilder,
              private message: NzMessageService) {
  }

  submitForm(): void {
    // this.validateForm.get()
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }

    if (this.validateForm.status !== 'INVALID') {
      this.handleUpload();
      // this.validateForm.value.expiredTime = this.convertDate(this.validateForm.value.expiredTime);
      this.contractService.create(this.validateForm.value)
        .subscribe( (resp: Response)  => {
            this.message.create('success', resp.message);
            this.listAllContract();
          },
          (resp) => {
            this.message.create('error', resp.message);
          }
        );
    }

  }

  beforeUpload = (file: UploadFile): boolean => {
    // this.files[] = file;
    this.files = this.files.concat(file);
    this.validateForm.get('path').setValue(file.name);
    return false;
  }


  handleUpload(): void {
    const file = this.files[0];
    this.contractService.uploadContract(file)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe( () => {
          // this.message.create('success', 'upload successfully');
        },
        () => {
          this.message.create('error', 'upload failed');
        }
      );
  }


  handleEdit(): void {
    console.log('handle edit');
  }

  handleDelete(contractId: string): void {
    this.contractService.delete(contractId)
      .subscribe( (resp: Response) => {
        this.message.create('success', resp.message);
        this.listAllContract();
      });
  }

  handlePageChange() {
    this.listAllContract();
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [null],
      path: [null],
      price: ['', [Validators.required]],
    });
    this.listAllContract();
  }

  listAllContract() {
    this.loading = true;
    this.contractService.list(this.pageIndex - 1).subscribe(resp => {
      this.total = resp.totalElements;
      this.license = resp.content;
      this.pageSize = resp.size;
      this.loading = false;
    });
  }
}
