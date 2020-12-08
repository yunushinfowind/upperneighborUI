import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public model = {
    title: '',
    editorData: '',
    image: '',
    url:''
  }
  imageSrc:any;
  showLoader:boolean=false;

  public Editor = ClassicEditor;
  constructor(private toastr: ToastrService, private blogService:BlogService ,private router : Router) { }

  ngOnInit(): void {
  }

  blogSubmit(f: NgForm) {

    if (f.valid && this.model.image && this.model.editorData) {
      this.showLoader = true;
      const formData = new FormData();
      formData.append('image', this.model.image);
      formData.append('description', this.model.editorData);
      formData.append('title', this.model.title);
      formData.append('url', this.model.url);
      console.log(this.model.image)
      this.blogService.addBlog(formData).subscribe(result=>{
        if (result.success) {
          this.toastr.success(result.message);
          this.showLoader = false;
          this.router.navigateByUrl('/admin/blog/list')
        } else {
          this.toastr.error(result.message)
        }
      },
      error=>{

      }
      )
    }

  }

  onFileChange(event) {

    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.model.image = file;
    }
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
   
    }
  }

}
