import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddComponent, EditComponent, ListComponent, DetailComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,CKEditorModule , FormsModule
  ]
})
export class BlogModule { }
