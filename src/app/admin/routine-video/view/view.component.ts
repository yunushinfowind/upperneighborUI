import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RoutineVideoService } from '../routine-video.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  Id: any;
  routineVideoDetail: any;
  model = {
    video_thumb:'',
    routine_name : ''
  }
  video_link : any

  constructor(private dom:DomSanitizer , private routineService: RoutineVideoService, private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.params.subscribe(params => {
      this.Id = params['video_id'];
      this.getRoutineDetail(this.Id);
    })
    
    console.log(this.video_link);
   
  }

  ngOnInit(): void {
   
      
  }

  getRoutineDetail(id) {
    this.routineService.routineVideoDetail(id).subscribe(result => {
      if (result.success) {
        this.routineVideoDetail = result.data;
        this.model.video_thumb = result.data.video_thumb;
        this.video_link = result.data.video_link;
        this.model.routine_name = result.data.routine.routine_name
        this.video_link = this.dom.bypassSecurityTrustResourceUrl(this.video_link);
        console.log("detail:")
        console.log(this.video_link)
        // console.log(this.routineVideoDetail.user)
        // console.log(this.routineVideoDetail.routine)
      }
    })
  }

}
