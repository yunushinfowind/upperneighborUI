import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from '../teacher.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  Id: any;
  teacherDetail: any;

  constructor(private teacherService: TeacherService, private activatedRoute: ActivatedRoute) { }

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
