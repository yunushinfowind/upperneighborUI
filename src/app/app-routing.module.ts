import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

import { LoginComponent } from './auth/login/login.component';
import { Page404Component } from './auth/page404/page404.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuardService } from './auth/servic/auth-guard.service';
import { SoundSliceComponent } from './auth/sound-slice/sound-slice.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { BlogDetailComponent } from './shared/blog-detail/blog-detail.component';
import { GuestService } from './shared/service/auth/guard/guest.service';
import { LoginGuardService } from './shared/service/auth/guard/login-guard.service';

const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch: 'full'},
  {
    path:'login',component:LoginComponent,
    canActivate: [GuestService]
  },
  {
    path:'forgot-password',component:ForgotPasswordComponent,
    // canActivate: [GuestService]
  },
  {
    path:'sound-slice/:sliceId/:height/:width',component:SoundSliceComponent
    // canActivate: [GuestService]
  },
  {path:'blog/:blog_id' ,component:BlogDetailComponent},

  {path:'privacy-policy' ,component:PrivacyPolicyComponent},
  
  {path:'register',component:RegisterComponent},
  {
    path:'admin',loadChildren:() =>AdminModule,
    canActivate: [AuthGuardService]
  },
  {
    path:"**" , component:Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
