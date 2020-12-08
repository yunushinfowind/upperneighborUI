import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutineVideoRoutingModule } from './routine-video-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [ListComponent, AddComponent, ViewComponent, EditComponent],
  imports: [
    CommonModule,
    RoutineVideoRoutingModule , FormsModule , ReactiveFormsModule
  ]
})
export class RoutineVideoModule { }
