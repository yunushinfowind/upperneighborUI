import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: 'add', component: AddComponent },
  { path: 'view/:id', component: DetailComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'list', component: ListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
