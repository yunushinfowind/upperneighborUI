import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistVideoService } from '../artist-video.service';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

 
  public model = {
    video_title: '',
    video_description: '',
    routine_level: '',
    user_id: '',
    video: ''
  }
  imageSrc: any;
  showLoader: boolean = false;
  artistList: any;
  video_id: any;
  user_id:any;
  routine_id:any;

  constructor(private activatedRoute: ActivatedRoute, private toastr: ToastrService, private artistVideoService: ArtistVideoService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.video_id = params['video_id'];
      
    })
    this.getRoutineDetail(this.video_id);
  }

  getRoutineDetail(id) {
    this.artistVideoService.artistVideoDetail(id).subscribe(result => {
      if (result.success) {
        this.model.video_title = result.data.video_title;
        this.model.video_description = result.data.video_description;
        this.user_id = result.data.user_id;
        this.imageSrc = result.data.video_thumb;
      }
    })
  }

 

  routineSubmit(f: NgForm) {

    if (f.valid) {
      this.showLoader = true;
      const formData = new FormData();
      formData.append('video_title', this.model.video_title);
      formData.append('video_description', this.model.video_description);
      formData.append('video', this.model.video);
      formData.append('id', this.video_id);
      this.artistVideoService.editArtistVideo(formData).subscribe(result => {
        if (result.success) {
          this.showLoader = false;
          this.toastr.success(result.message);
          // this.router.navigate(['/admin/routine-video/list',this.routine_id , this.user_id])
        } else {
          this.toastr.error(result.message)
        }
      },
        error => {

        }
      )
    }

  }

  handleClick(e) {
    console.log(e)
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.model.video = file;
    }
  }

  onGetUserId(userId) {
    this.model.user_id = userId;
  }

}
