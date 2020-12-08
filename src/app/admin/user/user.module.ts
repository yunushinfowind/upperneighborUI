import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';


@NgModule({
  declarations: [ListComponent, EditComponent, ViewComponent],
  imports: [
    CommonModule,
    UserRoutingModule , FormsModule , JwPaginationModule
  ]
})
export class UserModule { }
