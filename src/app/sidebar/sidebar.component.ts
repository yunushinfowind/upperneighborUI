import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/service/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  profile :any;
  status: boolean = false;
  blog_status: boolean = false;
  params:any;
  constructor(private authService:AuthService , private activatedRoute: ActivatedRoute , public router:Router,private toastr : ToastrService) { }

  ngOnInit(): void {
    this.profile = JSON.parse(localStorage.getItem('currentUser')).profile;
    this.activatedRoute.params.subscribe(params => {
      this.params = params;
      console.log("routes");
        console.log( this.router.url); // array of states
        // console.log(this.activatedRoute.snapshot.url[0].path);
    })

    $('.nav-item').on('click',function(){
      if($("body").hasClass("sidebar-open")){
        $("body").removeClass("sidebar-open")
        $("body").addClass("sidebar-closed sidebar-collapse")
      }
    });
  }

  clickEvent(){
      this.status = !this.status;  
   }

  BlogEvent(){
    this.blog_status = !this.blog_status;  
  }
   

}
