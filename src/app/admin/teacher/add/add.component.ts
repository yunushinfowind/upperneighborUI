import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TeacherService } from '../teacher.service';
import * as $ from 'jquery';
import { EmojiScriptServiceService } from '../emoji-script-service.service';
import { emojiarea } from "../../../../assets/packs/jquery.emojiarea.js";



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public model = {
    fullname: '',
    profile: '',
    profession: '',
    history: '',
    career_highlight: '',
    key_point: '',
    performance: '',
    address: '',
    emojis:[]
  }
  imageSrc: any;
  showLoader: boolean = false;
  addscript: boolean = false;
  emojiList:any;

  public Editor = ClassicEditor;
  constructor(private emojiScript: EmojiScriptServiceService, private toastr: ToastrService, private teacherService: TeacherService, private router: Router) { }


  ngAfterViewInit(): void {


  }

  ngOnInit(): void {
    this.addScript();
    // (function ($) {
    //   $(document).ready(function () {
    //     $('.emojis-plain').emojiarea({ wysiwyg: false });
    //     var $wysiwyg = $('.emojis-wysiwyg').emojiarea({ wysiwyg: true });
    //     var $wysiwyg_value = $('#emojis-wysiwyg-value');

    //     $wysiwyg.on('change', function () {
    //       $wysiwyg_value.text($(this).val());
    //     });
    //     console.log("Hello from jQuery!");
    //   });
    // });
    this.getEmojiList();
  }

  openEmoji() {
    console.log('inn')
    if( $('.select_group').css('display') == 'block' ) {
      $('.select_group').css({'display':'none'})
   } else {
    $('.select_group').css({'display':'block'})
   }
   
  }
  getEmojiUrl(id:any){
    $('#emoji_'+id).attr('href');
    console.log($('#emoji_'+id + '> img').attr('src'));
    var emoji = $('#emoji_'+id + '> img').attr('src');
    console.log("src:"+emoji)
    this.model.emojis.push(emoji);
    // emoji = "<img width='25px' _ alt=':bowtie:' src='"+emoji+"'><span _ class='label'>:bowtie:</span></a>";
    var textarea = $('.emoji-area');
    var image = new Image();
    image.width = 25;
    image.src = emoji,
    
    document.getElementById('emoji-area').appendChild(image);
    
  }
  
  loadScripts() {

    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.emojiScript.load('emojiarea', 'emojis').then(data => {
      console.log(data)
      console.log('Script Loaded Successfully')
      // var $wysiwyg = $('.emojis-wysiwyg').emojiarea({wysiwyg: true});
      var $wysiwyg_value = $('#emojis-wysiwyg-value');
    }).catch(error => console.log(error));
  }

  addScript() {
    this.addscript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = '../../../../assets/packs/jquery.emojiarea.js';
      scripttagElement.src = 'https://twemoji.maxcdn.com/2/twemoji.min.js?11.0';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
      // twemoji.parse(document.body);
    })
  }

  getEmojiList(){
    this.teacherService.getEmojiList(1).subscribe(result => {
      if (result.success) {
        this.emojiList = result.data;
        console.log(result.data)
        
      } else {
        this.toastr.error(result.message)
      }
    },
      error => {

      }
    )
  }

  teacherSubmit(f: NgForm) {

   
    console.log(this.model.emojis);
    if (f.valid && this.model.profile) {
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

      // this.teacherService.addTeacher(formData).subscribe(result => {
      //   if (result.success) {
      //     this.showLoader = false;
      //     this.toastr.success(result.message);
      //     // this.router.navigateByUrl('/admin/artist/list')
      //   } else {
      //     this.toastr.error(result.message)
      //   }
      // },
      //   error => {

      //   }
      // )
    }

  }

  handleClick(e) {
    console.log(e)
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
