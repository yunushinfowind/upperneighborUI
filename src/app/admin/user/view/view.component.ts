import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../user-service.service';



@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})

export class ViewComponent implements OnInit {

  Id: any;
  teacherDetail: any;

  constructor(private teacherService: UserServiceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.Id = params['id'];
    })
    this.getTeacherDetail(this.Id);
  }
  getTeacherDetail(id) {
    this.teacherService.teacherDetail(id).subscribe(result => {
      if (result.success) {
        this.teacherDetail = result.data;
        console.log(this.teacherDetail)
      }
    })
  }

}

