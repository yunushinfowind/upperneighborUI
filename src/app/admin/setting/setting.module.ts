import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    SettingRoutingModule
  ]
})
export class SettingModule { }
