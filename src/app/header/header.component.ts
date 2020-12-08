import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/service/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService , private router:Router,private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  Logout(){
    this.authService.logout().subscribe(
      result =>{
        if(result.success){
          // this.router.navigateByUrl('/login')
        }
      }
    )
  }

}
