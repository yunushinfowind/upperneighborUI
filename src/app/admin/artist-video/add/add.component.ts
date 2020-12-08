import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { ArtistVideoService } from '../artist-video.service';
import { TeacherService } from '../../teacher/teacher.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  name = 'Angular';
  public model = {
    routine_name: '',
    routine_description: '',
    routine_level: '',
    user_id: '',
    video: '',
    artist_name: ''
  }
  imageSrc: any;
  showLoader: boolean = false;
  artistList: any;
  user_id: any;
  routine_id: any;
  productForm: FormGroup;
  submitted = false;
  videos: any = [];

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private artistVideoService: ArtistVideoService, private router: Router, private teacherService: TeacherService) {
    this.productForm = this.fb.group({
      name: '',
      quantities: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.user_id = params['user_id'];
      this.routine_id = params['routine_id'];
    })
    this.getTeacherDetail(this.user_id);
    console.log(this.user_id);

  }

  quantities(): FormArray {
    return this.productForm.get("quantities") as FormArray
  }


  newQuantity(): FormGroup {
    return this.fb.group({
      video_title: ['', Validators.required],
      video_description: ['', [Validators.required]],
      video: ['', [Validators.required]]
    })
  }

  addQuantity() {
    this.quantities().push(this.newQuantity());
  }

  removeQuantity(i: number) {
    this.quantities().removeAt(i);
  }



  handleClick(e) {
    console.log(e)
  }
  getTeacherDetail(id) {
    this.teacherService.teacherDetail(id).subscribe(result => {
      if (result.success) {
        this.model.artist_name = result.data.fullname;
      }
    })
  }
  onFileChange(event, i) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      let data = {
        index: i,
        file: file
      }
      this.videos[i] = file;
    }
  }

  onGetUserId(userId) {
    this.model.user_id = userId;
  }

  onSubmit() {
    this.submitted = true;
    var data = this.productForm.value.quantities;
    var formLength = this.productForm.value.quantities.length;
    // if(!formLength){
    //   this.toastr.error('Please '); 
    // }
    console.log(data[0])
    if (formLength > 0) {
      var allFormData = [];
      let total_form: FormData[] = [];
      var formData = new FormData();
      for (let i = 0; i < formLength; i++) {
        let postData = {
          "video_title": data[i].video_title,
          "video_description": data[i].video_description,
          "user_id": this.user_id,
          "routine_id": this.routine_id
        }
        formData.append('data[]', JSON.stringify(postData));
        formData.append('videos[]', this.videos[i]);
      }

      if (!this.productForm.invalid) {
        $('#loader_submit').show();
        this.artistVideoService.addArtistVideo(formData).subscribe(result => {
          if (result.success) {
            this.showLoader = false;
            this.toastr.success(result.message);
            $('#loader_submit').hide();
            $('#submit_button').attr('disabled', 'false');
            this.router.navigate(['/admin/artist-video/list/'+this.user_id]);
          } else {
            this.toastr.error(result.message)
          }
        }
        )
      }
    } else {
      this.toastr.error('Please add form')
    }
    console.log(allFormData);
  }



}

