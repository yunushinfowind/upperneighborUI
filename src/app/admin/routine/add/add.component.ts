import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutineService } from '../routine.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public model = {
    routine_name:'',
    routine_description: '',
    routine_level:'',
    user_id : '',
    image : ''
  }
  imageSrc: any;
  showLoader:boolean=false;
  artistList :any;
  user_id:any;

  constructor(private activatedRoute:ActivatedRoute, private toastr: ToastrService, private routineService: RoutineService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.user_id = params['id'];
    })
    console.log(this.user_id);
    this.getTeacherList()
  }

  getTeacherList(){
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

  routineSubmit(f: NgForm) {

    if (f.valid && this.model.image) {
      this.showLoader = true;
      const formData = new FormData();
      formData.append('routine_name', this.model.routine_name);
      formData.append('routine_description', this.model.routine_description);
      formData.append('routine_level', this.model.routine_level);
      formData.append('user_id', this.user_id);
      formData.append('image', this.model.image);
      this.routineService.addRoutine(formData).subscribe(result => {
        if (result.success) {
          this.showLoader = false;
          this.toastr.success(result.message);
          this.router.navigate(['/admin/routine/list',this.user_id]);
        } else {
          this.toastr.error(result.message)
        }
      },
        error => {

        }
      )
    }

  }

  handleClick(e){
    console.log(e)
  }
  onFileChange(event) {

    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.model.image = file;
    }

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }

  onGetUserId(userId){
    this.model.user_id = userId;
  }

}

