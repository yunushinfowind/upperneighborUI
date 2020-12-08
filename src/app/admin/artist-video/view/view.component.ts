import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ArtistVideoService } from '../artist-video.service';

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

  constructor(private dom:DomSanitizer , private artistVideoService: ArtistVideoService, private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.params.subscribe(params => {
      this.Id = params['video_id'];
      this.getDetail(this.Id);
    })
    console.log(this.video_link);
  }

  ngOnInit(): void {
      
  }

  getDetail(id) {
    this.artistVideoService.artistVideoDetail(id).subscribe(result => {
      if (result.success) {
        this.routineVideoDetail = result.data;
        this.model.video_thumb = result.data.video_thumb;
        this.video_link = result.data.video_link;
        this.video_link = this.dom.bypassSecurityTrustResourceUrl(this.video_link);
        
        console.log(this.video_link)
        console.log(this.routineVideoDetail.user)
        // console.log(this.routineVideoDetail.routine)
      }
    })
  }

}

