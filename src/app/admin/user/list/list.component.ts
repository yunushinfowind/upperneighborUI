import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { UserServiceService } from '../user-service.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  items = [];
  List: any;
  total: any;
  per_page: any;
  currentPage: any;
  // dtOptions: DataTables.Settings = {};
  showLoader: boolean = true;
  checkedStatus : boolean = false;
  pageOfItems: Array<any>;
  constructor(private userService: UserServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.teacherList(1);
    $('.page-link').on('click',function(){
      console.log(this)
    })
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   processing: true
    // }

  }

  teacherList(page) {
    let search = ($('.table_search').val()) ? ($('.table_search').val()) : '';
    this.userService.userList(page, search).subscribe(
      result => {
        if (result.success == true) {
          this.showLoader = false;
          this.items = result.data.rows
          this.total = result.data.count;
          this.currentPage = result.data.currentPage;
        }
      },
      error => {

      }
    )
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

  deleteTeacher(id: any) {
    if (confirm("Are you sure to delete ?")) {
      this.userService.deleteTeacher(id).subscribe(
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

  changeStatus(id: any , status:any) {
    if (confirm("Are you sure to change status ?")) {
      let postData = {
        user_id:id,
      }
      this.userService.updateStatus(postData).subscribe(
        result => {
          if (result.success == true) {
            this.toastr.success(result.message);
            if(result.data.status=='active'){
              $('.status_'+id).prop('checked',true);
            }else{
              $('.status_'+id).prop('checked',false);
            }
          }
        }
      )
    }else{
      if(status){
        $('.status_'+id).prop('checked',true);
      }else{
        $('.status_'+id).prop('checked',false);
      }
    }
  }
  resetSearch(){
    $('.table_search').val('');
    this.teacherList(1);
  }
}
