import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { ArtistVideoService } from '../artist-video.service';



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
  constructor(private activatedRoute :ActivatedRoute, private artistVideoService: ArtistVideoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.user_id = params['user_id'];
      this.routine_id = params['routine_id'];
      console.log(params)
    })
    this.artistVideoList(1);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    }
  }

  artistVideoList(page) {
    let search = ($('.table_search').val())?($('.table_search').val()):'';
    this.artistVideoService.artistVideoList(page,this.user_id,search).subscribe(
      result => {
        this.List = result.data;
        if (result.success == true) {
          this.showLoader = false;
          this.List = result.data.rows;
          this.total = result.data.count;
          this.currentPage = result.data.currentPage;
          console.log(this.List)
        }
      },
      error => {

      }
    )
  }

  deleteArtistVideo(id: any) {
    if (confirm("Are you sure to delete ?")) {
      this.artistVideoService.deleteArtistVideo(id).subscribe(
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
    this.artistVideoList(1);
  }

}
