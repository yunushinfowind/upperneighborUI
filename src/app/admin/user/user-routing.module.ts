import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {path:'list' , component:ListComponent },
  {path:'view/:id' , component:ViewComponent},
  {path:'edit/:id' , component:EditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
