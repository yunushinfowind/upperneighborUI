import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutineRoutingModule } from './routine-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddComponent, ListComponent, EditComponent, ViewComponent],
  imports: [
    CommonModule,
    RoutineRoutingModule ,FormsModule
  ]
})
export class RoutineModule { }
