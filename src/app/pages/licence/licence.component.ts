import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { UploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LicenseService } from '../../service/license.service';
import { Response } from '../../model/common';
import {License} from '../../model/license';
import {HttpResponse} from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

@Component({
  selector: 'app-licence',
  templateUrl: './licence.component.html',
  styleUrls: ['./licence.component.scss']
})
export class LicenceComponent implements OnInit {

  license = [];

  today = new Date();

  current: License;

  isVisible = false;

  expiredTime = '';

  total = 0;

  pageIndex = 1;

  pageSize = 10;

  pageOptions: number[] = [10, 20, 50, 100];

  loading = false;

  uploading = false;

  pdfSrc = 'https://www.tutorialspoint.com/angular7/angular7_tutorial.pdf';

  files: UploadFile[] = [];

  validateForm: FormGroup;

  constructor(private licenseService: LicenseService,
              private fb: FormBuilder,
              private message: NzMessageService,
              private modalService: NzModalService) {
    this.listAllLicense();
  }

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) < 0;
  }

  convertDate(date: Date) {
    return formatDate(date, 'MM/dd/yyyy', 'en-US');
  }

  submitForm(): void {
    // this.validateForm.get()
    console.log(this.validateForm.value);
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }

    if (this.validateForm.status !== 'INVALID') {
      this.handleUpload();
      this.validateForm.value.expiredTime = this.convertDate(this.validateForm.value.expiredTime);
      this.licenseService.create(this.validateForm.value)
        .subscribe( (resp: Response)  => {
            this.message.create('success', resp.message);
            this.listAllLicense();
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
    this.validateForm.get('licensePath').setValue(file.name);
    return false;
  }

  handleUpload(): void {
    const file = this.files[0];
    this.licenseService.uploadLicense(file)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe( () => {
        // this.message.create('success', 'upload successfully');
      },
        () => {
          this.message.create('error', 'upload failed');
        }
      );
  }


  handlePreview(): void {
    console.log('handle edit');
  }

  handleDelete(licenseId: string): void {
    console.log(licenseId);
    this.licenseService.delete(licenseId)
      .subscribe( (resp: Response) => {
        this.message.create('success', resp.message);
        this.listAllLicense();
      });
  }

  handlePageChnage() {
   this.listAllLicense();
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleDownload(licenseId: string): void {
    this.licenseService.download(licenseId)
      .subscribe((data: any) => this.downloadFile(data),
        error => console.log(error)
        );
  }

  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      licenseName: ['', [Validators.required]],
      licenseDescription: [null],
      licensePath: [null],
      expiredTime: ['', [Validators.required]],
    });
    // this.listAllLicense();
  }

  listAllLicense() {
    this.loading = true;
    this.licenseService.list(this.pageIndex - 1).subscribe(resp => {
      this.total = resp.totalElements;
      this.license = resp.content;
      this.pageSize = resp.size;
      this.loading = false;
    });
  }

}
