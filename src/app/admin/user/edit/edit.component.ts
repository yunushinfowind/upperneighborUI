import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {


  public model = {
    fullname: '',
    email: '',
    profile: ''
   
  }
  imageSrc: any;
  Id: any;
  teacherDetail: any;
  showLoader:boolean=false;


  public Editor = ClassicEditor;
  constructor(private toastr: ToastrService, private teacherService: UserServiceService, private activatedRoute: ActivatedRoute, private router: Router) { }

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
        this.model.fullname = result.data.fullname;
        this.model.email = result.data.email;
        this.imageSrc = result.data.profile
        console.log(this.teacherDetail)
      }

    })
  }


  teacherSubmit(f: NgForm) {

    if (f.valid) {
      this.showLoader = true;
      const formData = new FormData();
      formData.append('profile', this.model.profile);
      formData.append('fullname', this.model.fullname);
      formData.append('email', this.model.email);
      formData.append('id', this.teacherDetail.id);

      this.teacherService.editTeacher(formData).subscribe(result => {
        if (result.success) {
          this.showLoader = false;
          this.toastr.success(result.message);
          this.router.navigateByUrl('/admin/user/list')
        } else {
          this.toastr.error(result.message)
        }
      },
        error => {

        }
      )
    }

  }

  onFileChange(event) {

    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.model.profile = file;
    }
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };

    }
  }

}

