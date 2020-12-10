import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RoutineVideoService } from '../routine-video.service';



@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})


export class ViewComponent implements OnInit {

  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  Id: any;
  routineVideoDetail: any;
  model = {
    video_thumb: '',
    routine_name: '',
    video_url: ''
  }
  video_link: any
  video_link_url: any;

  constructor(private dom: DomSanitizer, private routineService: RoutineVideoService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.Id = params['video_id'];
      this.getRoutineDetail(this.Id);
    })

    this.video_link_url =
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
        this.model.video_url = result.data.video_link;
        this.model.routine_name = result.data.routine.routine_name
      }
    })
  }

  toggleVideo() {
    this.videoplayer.nativeElement.play();
  }

}
