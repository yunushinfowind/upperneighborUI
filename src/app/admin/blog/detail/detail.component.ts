import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  Id: any;
  blogDetail: any;
  imageSrc: any;

  constructor(private blogService: BlogService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.Id = params['id'];
    })
    this.getBlogDetail(this.Id);
  }
  getBlogDetail(id) {
    this.blogService.blogDetail(id).subscribe(result => {
      if (result.success) {
        this.blogDetail = result.data;
        this.imageSrc = result.data.image
      }
    })
  }

}
