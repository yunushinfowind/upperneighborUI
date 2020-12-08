import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';
import { SoundSliceComponent } from './sound-slice/sound-slice.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormsModule } from '@angular/forms';
import { SafePipe } from '../pipesafe/pipesafe.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, Page404Component, SoundSliceComponent, ForgotPasswordComponent,SafePipe],
  imports: [
    CommonModule ,FormsModule
  ]
})
export class AuthModule { }
