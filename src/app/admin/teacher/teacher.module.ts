import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';



@NgModule({
  declarations: [AddComponent, UpdateComponent,  ListComponent, DetailComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule , FormsModule
  ]
})
export class TeacherModule { }
