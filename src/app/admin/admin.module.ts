import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [DashboardComponent, AdminComponent, ChangepasswordComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,SharedModule, FormsModule
  ]
})
export class AdminModule { }
