import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { LoginComponent } from './auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';
import { GuestService } from './shared/service/auth/guard/guest.service';
import { LoginGuardService } from './shared/service/auth/guard/login-guard.service';
import { HttpInterCeptorService } from './auth/http-inter-ceptor.service';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { BasicAuthInterceptorService } from './auth/servic/basic-auth-interceptor.service';
import { ErrorInterceptorService } from './auth/servic/error-interceptor.service';
import {DataTablesModule} from 'angular-datatables';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { SafePipe } from './pipesafe/pipesafe.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent , LoginComponent, HeaderComponent, FooterComponent, SidebarComponent , ForgotPasswordComponent, PrivacyPolicyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    }),
    SharedModule,
    DataTablesModule,
    PickerModule,
    EmojiModule,
    JwPaginationModule,
    RouterModule
   
  ],
  providers: [GuestService,LoginGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
