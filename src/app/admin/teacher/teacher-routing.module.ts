import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';


const routes: Routes = [
  {path:'list',component:ListComponent},
  {path:'add' , component:AddComponent},
  {path:'edit/:id' , component:UpdateComponent},
  {path:'view/:id' , component:DetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
