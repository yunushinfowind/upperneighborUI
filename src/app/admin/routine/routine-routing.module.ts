import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {path:'add/:id' ,  component:AddComponent},
  {path:'view/:id' , component:ViewComponent },
  {path:'edit/:id/:user_id' , component:EditComponent},
  {path:'list/:id' , component:ListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutineRoutingModule { }
