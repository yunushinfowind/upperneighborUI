import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from './shared/service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  sliceUrl :boolean=false;
  forGotUrl : boolean = false;
  logintUrl : boolean = false;
  href : any;
  isLogin : boolean=false;
  constructor(private activatedRoute : ActivatedRoute , private router: Router, @Inject(DOCUMENT) private document: Document, r: Renderer2,private authSerice : AuthService) {
    console.log(JSON.parse(localStorage.getItem('currentUser')));
    if(JSON.parse(localStorage.getItem('currentUser'))){
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
  }

  ngOnInit() {
    console.log("currentUrl :"+this.router.url);
  }

  title = 'upperneighFront';
}
