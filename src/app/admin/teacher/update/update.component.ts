import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {


  public model = {
    fullname: '',
    profile: '',
    profession: '',
    history: '',
    career_highlight: '',
    key_point: '',
    performance: '',
    address: ''
  }
  imageSrc: any;
  Id: any;
  teacherDetail: any;
  showLoader:boolean=false;


  public Editor = ClassicEditor;
  constructor(private toastr: ToastrService, private teacherService: TeacherService, private activatedRoute: ActivatedRoute, private router: Router) { }

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
        this.model.profession = result.data.teacherProfile.profession;
        this.model.history = result.data.teacherProfile.history;
        this.model.career_highlight = result.data.teacherProfile.career_highlight;
        this.model.key_point = result.data.teacherProfile.key_point;
        this.model.performance = result.data.teacherProfile.performance;
        this.model.address = result.data.teacherProfile.address;
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
      formData.append('profession', this.model.profession);
      formData.append('history', this.model.history);
      formData.append('career_highlight', this.model.career_highlight);
      formData.append('key_point', this.model.key_point);
      formData.append('performance', this.model.performance);
      formData.append('address', this.model.address);
      formData.append('id', this.teacherDetail.id);

      this.teacherService.editTeacher(formData).subscribe(result => {
        if (result.success) {
          this.showLoader = false;
          this.toastr.success(result.message);
          this.router.navigateByUrl('/admin/artist/list')
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

