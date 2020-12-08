import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { TeacherService } from '../teacher.service';

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
  showLoader: boolean = true;
  constructor(private teacherService: TeacherService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.teacherList(1);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    }

  }

  teacherList(page) {
    let search = ($('.table_search').val()) ? ($('.table_search').val()) : '';
    this.teacherService.teacherList(page, search).subscribe(
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

  deleteTeacher(id: any) {
    if (confirm("Are you sure to delete ?")) {
      this.teacherService.deleteTeacher(id).subscribe(
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
    this.teacherList(1)
  }

}
