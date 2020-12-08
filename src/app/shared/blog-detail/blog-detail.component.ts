import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blogId: any;
  blogeDetail: any;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.blogId = params['blog_id'];
    })
    this.getBlogDetail(this.blogId);
  }
  
  getBlogDetail(id) {
    this.authService.blogDetail(id).subscribe(result => {
      if (result.success) {
        this.blogeDetail = result.data;
        console.log(this.blogeDetail)
      }
    })
  }
}
