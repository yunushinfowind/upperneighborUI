import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from '../blog.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  List: any;
  total: any;
  per_page: any;
  currentPage: any;
  dtOptions: DataTables.Settings = {};
  showLoader:boolean=false;

  constructor(private blogService: BlogService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.blogList(1);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    }

  }

  blogList(page) {
    this.showLoader = true;
    let search = ($('.table_search').val())?($('.table_search').val()):'';
    this.blogService.blogList(page,search).subscribe(
      result => {
        this.List = result.data;
        if (result.success == true) {
          this.showLoader = false;
          this.List = result.data.rows;
          this.total = result.data.count;
          this.currentPage = result.data.currentPage;
        }
      },
      error => {

      }
    )
  }

  deleteBlog(id: any) {
    if (confirm("Are you sure to delete ?")) {
      this.blogService.deleteBlog(id).subscribe(
        result => {
          if (result.success == true) {
            this.toastr.success(result.message);
            $('#row_' + id).remove();
          }
        },
        error => {

        }
      )
    }
  }

  resetSearch(){
    $('.table_search').val('');
    this.blogList(1);
  }

}
