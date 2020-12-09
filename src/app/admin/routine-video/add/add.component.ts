import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutineVideoService } from '../routine-video.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { RoutineService } from '../../routine/routine.service';



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
    video: ''

  }
  imageSrc: any;
  showLoader: boolean = false;
  artistList: any;
  user_id: any;
  routine_id: any;
  productForm: FormGroup;
  submitted = false;
  videos: any = [];
  sizeSum : any = 0;
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private routineService: RoutineVideoService, private router: Router, private routineSer: RoutineService) {
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
    console.log(this.user_id);
    this.getTeacherList()
    this.getRoutineDetail(this.routine_id);
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

  getTeacherList() {
    this.routineService.allArtistList().subscribe(result => {
      if (result.success) {
        this.artistList = result.data;
      } else {
        this.toastr.error(result.message)
      }
    },
      error => {

      }
    )
  }

  handleClick(e) {
    console.log(e)
  }

  getRoutineDetail(id) {
    this.routineSer.routineDetail(id).subscribe(result => {
      if (result.success) {
        this.model.routine_name = result.data.routine_name;
      }
    })
  }
  onFileChange(event, i) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      var size = event.target.files[0].size/1000/1000;
      size = Math.round(size * 10) / 10
      this.sizeSum = this.sizeSum + size;
      console.log('size:'+this.sizeSum)
      let data = {
        index: i,
        file: file
      }
      this.videos[i] = file;
      if(this.sizeSum > 200){
      this.toastr.error('Sorry , size of video has been exceeded from 200 MB.')
      }
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
    if (formLength > 0) {
      console.log(data[0])
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

      if (!this.productForm.invalid && (this.sizeSum < 200)) {
        $('#loader_submit').show();
        $('#submit_button').attr('disabled', 'true');
        this.routineService.addRoutineVideo(formData).subscribe(result => {
          if (result.success) {
            this.showLoader = false;
            this.toastr.success(result.message);
            $('#loader_submit').hide();
            $('#submit_button').attr('disabled', 'false');
            this.router.navigate(['/admin/routine-video/list', this.routine_id, this.user_id]);
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

