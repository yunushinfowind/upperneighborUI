import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    SettingRoutingModule , FormsModule , ReactiveFormsModule
  ]
})
export class SettingModule { }
