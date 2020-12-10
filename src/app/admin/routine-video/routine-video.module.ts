import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutineVideoRoutingModule } from './routine-video-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { SafePipe } from '../../pipesafe/pipesafe.component';


@NgModule({
  declarations: [ListComponent, AddComponent, ViewComponent, EditComponent , SafePipe],
  imports: [
    CommonModule,
    RoutineVideoRoutingModule , FormsModule , ReactiveFormsModule
  ]
})
export class RoutineVideoModule { }
