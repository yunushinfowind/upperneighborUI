import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { RoutineService } from '../routine.service';
import { ActivatedRoute } from '@angular/router';


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
  showLoader : boolean = true;
  user_id:any;
  routine_id:any;
  constructor(private activatedRoute :ActivatedRoute, private routineService: RoutineService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.user_id = params['id'];
      // this.routine_id = params['routine_id'];
      console.log(params)
    })
    this.routneList(1);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    }
  }

  routneList(page) {
    let search = ($('.table_search').val())?($('.table_search').val()):'';
    this.routineService.routineList(page,this.user_id,search).subscribe(
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

  deleteRoutine(id: any) {
    if (confirm("Are you sure to delete ?")) {
      this.routineService.deleteRoutine(id).subscribe(
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
    this.routneList(1);
  }

}
