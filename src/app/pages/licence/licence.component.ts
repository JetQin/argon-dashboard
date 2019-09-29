import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LicenseService } from '../../service/license.service';
import {License} from '../../model/license';

@Component({
  selector: 'app-licence',
  templateUrl: './licence.component.html',
  styleUrls: ['./licence.component.scss']
})
export class LicenceComponent implements OnInit {

  license = [];

  current: License;

  isVisible = false;

  total = 0;

  pageIndex = 0;

  pageSize = 10;

  validateForm: FormGroup;

  constructor(private licenseService: LicenseService,
              private fb: FormBuilder) {}

  submitForm(): void {
    // this.validateForm.get()
    console.log(this.validateForm.value);
    this.licenseService.create(this.validateForm.value)
      .subscribe(resp => {
        console.log(resp);
      }
    );
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  handleEdit(): void {
    console.log('handle edit');
  }

  handleDelete(licenseId: string): void {
    console.log(licenseId);
    this.licenseService.delete(licenseId)
      .subscribe( resp => {
        console.log(resp);
      });

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      licenseName: [null],
      licenseDescription: [null],
      expiredTime: [null],
    });
    this.listAllLicense();
  }

  listAllLicense() {
    this.licenseService.list().subscribe(resp => {
      this.total = resp.totalElements;
      this.license = resp.content;
      this.pageIndex = resp.page;
      this.pageSize = resp.size;
      console.log(this.license);
    });
  }

}
