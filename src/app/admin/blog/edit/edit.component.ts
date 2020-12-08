import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from '../blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {


  public model = {
    title: '',
    editorData: '',
    image: '',
    url:''
  }
  Id: any;
  blogDetail: any;
  imageSrc: any;
  showLoader:boolean=false;

  public Editor = ClassicEditor;
  constructor(private toastr: ToastrService, private blogService: BlogService, private activatedRoute: ActivatedRoute,private router : Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.Id = params['id'];
    })
    this.getBlogDetail(this.Id);
  }

  getBlogDetail(id) {
    this.blogService.blogDetail(id).subscribe(result => {
      if (result.success) {
        this.blogDetail = result.data;
        this.model.title = result.data.title;
        this.model.url = result.data.url;
        this.model.editorData = result.data.description;
        this.imageSrc = result.data.image
      }
      console.log(this.blogDetail)
    })
  }


  blogSubmit(f: NgForm) {
    console.log(f.value)
    if (!this.model.editorData) {
      this.toastr.error('Description is required')
      return
    }

    if (f.valid && this.model.editorData) {
      const formData = new FormData();
      formData.append('image', (this.model.image?this.model.image:''));
      formData.append('description', this.model.editorData);
      formData.append('title', this.model.title);
      formData.append('url', this.model.url);
      formData.append('id', this.blogDetail.id);
      console.log(this.model.image)
      this.blogService.editBlog(formData).subscribe(result => {
        
        if (result.success) {
          this.toastr.success(result.message);
          this.router.navigateByUrl('/admin/blog/list')
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

}
