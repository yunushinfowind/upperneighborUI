import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistVideoModule } from './artist-video/artist-video.module';
import { BlogModule } from './blog/blog.module';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoutineVideoModule } from './routine-video/routine-video.module';
import { RoutineModule } from './routine/routine.module';
import { SettingModule } from './setting/setting.module';
import { ListComponent } from './teacher/list/list.component';
import { TeacherModule } from './teacher/teacher.module';
import { UserModule } from './user/user.module';


const routes: Routes = [
  {path:'dashboard',component:DashboardComponent},
  {
    path:'artist',loadChildren:() =>TeacherModule
  },
  {path:'change-password',component:ChangepasswordComponent},
  {
    path:'blog',loadChildren:() =>BlogModule
  },
  {
    path:'routine',loadChildren:() =>RoutineModule
  },
  {
    path:'routine-video',loadChildren:() =>RoutineVideoModule
  },
  {
    path:'artist-video',loadChildren:() =>ArtistVideoModule
  },
  {
    path:'user',loadChildren:() =>UserModule
  },
  {
    path:'setting',loadChildren:() =>SettingModule
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
