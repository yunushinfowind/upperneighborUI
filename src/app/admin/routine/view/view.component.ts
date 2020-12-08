import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutineService } from '../routine.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  Id: any;
  routineDetail: any;

  constructor(private routineService: RoutineService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.Id = params['id'];
    })
    this.getRoutineDetail(this.Id);
  }
  getRoutineDetail(id) {
    this.routineService.routineDetail(id).subscribe(result => {
      if (result.success) {
        this.routineDetail = result.data;
        console.log(this.routineDetail)
      }
    })
  }

}
