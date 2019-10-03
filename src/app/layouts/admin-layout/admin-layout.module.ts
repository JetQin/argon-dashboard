import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {LicenceComponent} from '../../pages/licence/licence.component';
import {ContractComponent} from '../../pages/contract/contract.component';
import {NgZorroAntdModule, NzTableModule} from 'ng-zorro-antd';
import {PdfViewerModule} from 'ng2-pdf-viewer';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    NzTableModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    PdfViewerModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    LicenceComponent,
    ContractComponent
  ]
})

export class AdminLayoutModule {}
