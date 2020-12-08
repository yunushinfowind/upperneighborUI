import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {path:'add/:user_id' , component:AddComponent},
  {path:'edit/:video_id' , component:EditComponent},
  {path:'view/:video_id' , component:ViewComponent},
  {path:'list/:user_id' , component:ListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistVideoRoutingModule { }
