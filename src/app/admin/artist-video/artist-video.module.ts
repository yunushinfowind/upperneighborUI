import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistVideoRoutingModule } from './artist-video-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListComponent, AddComponent, EditComponent, ViewComponent],
  imports: [
    CommonModule,
    ArtistVideoRoutingModule ,  FormsModule , ReactiveFormsModule
  ]
})
export class ArtistVideoModule { }
