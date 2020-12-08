import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-sound-slice',
  templateUrl: './sound-slice.component.html',
  styleUrls: ['./sound-slice.component.css']
})

export class SoundSliceComponent implements OnInit {

  sliceId:any;
  height:any;
  width:any;
  sliceUrl : any;
  url :any;
  style:any;

  constructor( private activatedRoute: ActivatedRoute , private dom:DomSanitizer) {
    this.activatedRoute.params.subscribe(params => {
      this.sliceId = params['sliceId'];
      this.height = params['height'];
      this.width = params['width'];
      this.style = {width:this.width+'px','height': this.height+'px'}
      console.log(this.height);
      console.log(this.width);
      this.sliceUrl = "https://www.soundslice.com/slices/"+this.sliceId+"/embed/";
      console.log(this.sliceUrl)
    })
    this.url=this.dom.bypassSecurityTrustResourceUrl(this.sliceUrl);
    console.log("url:"+this.url)
   }

  ngOnInit(): void {
    
  }

 

}
