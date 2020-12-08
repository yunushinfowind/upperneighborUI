import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SettingService } from '../setting.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public model = {
    routine_name: '',
    routine_description: '',
    routine_level: '',
    user_id: '',
    video: ''

  }
  List : any;
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private activatedRoute:ActivatedRoute, private toastr: ToastrService, private settingService: SettingService, private router: Router) { 
    this.productForm = this.fb.group({
      name: '',
      quantities: this.fb.array([]),
    });

  }

  ngOnInit(): void {
    this.settingList();
  }

  quantities(): FormArray {
    return this.List
  }


  newQuantity(): FormGroup {
    return this.fb.group({
      key_value: ['', Validators.required],
      value: ['', [Validators.required]]
    })
  }

  addQuantity() {
    this.quantities().push(this.newQuantity());
  }

  removeQuantity(i: number) {
    this.quantities().removeAt(i);
  }

  onSubmit(f:any) {
    
    var data = this.productForm.value.quantities;
    console.log(this.productForm);
    // var formLength = this.productForm.value.quantities.length;
    // // if(!formLength){
    // //   this.toastr.error('Please '); 
    // // }
    // if (formLength > 0) {
    //   console.log(data[0])
    //   var allFormData = [];
    //   let total_form: FormData[] = [];
    //   var formData = new FormData();
    //   for (let i = 0; i < formLength; i++) {
    //     // let postData = {
    //     //   "video_title": data[i].video_title,
    //     //   "video_description": data[i].video_description,
    //     //   "user_id": this.user_id,
    //     //   "routine_id": this.routine_id
    //     // }
    //     formData.append('data[]', JSON.stringify(postData));
    //   }

    //   if (!this.productForm.invalid) {
    //     $('#loader_submit').show();
    //     $('#submit_button').attr('disabled', 'true');
    //     this.settingService.updateSetting(formData).subscribe(result => {
    //       if (result.success) {
    //         this.toastr.success(result.message);
    //       } else {
    //         this.toastr.error(result.message)
    //       }
    //     }
    //     )
    //   }
    // } else {
    //   this.toastr.error('Please add form')
    // }
    // console.log(allFormData);
  }

  settingList() {
   
    this.settingService.getSettings().subscribe(
      result => {
        if (result.success == true) {
          this.List = result.data;
          console.log('this.List')
          console.log(this.List)
        }
      },
      error => {

      }
    )
  }
}
