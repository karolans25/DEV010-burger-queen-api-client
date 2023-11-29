import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

interface roleList {
  id: number,
  name: string
}

@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrls: ['./update-popup.component.scss']
})
export class UpdatePopupComponent implements OnInit{
  registerForm!: FormGroup;
  rolelist!: roleList[];
  editData: any;

  constructor( private builder: FormBuilder, private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService,
    private dialog: MatDialogRef<UpdatePopupComponent> ) {
  }

  ngOnInit():void{
    this.createForm();
    this.auth.getAllUserRoles().subscribe(res => {
      this.rolelist = res as roleList[];
    });
    if(this.data.userid !== null && this.data.userid !== '') {
      this.auth.getUserById(this.data.userid).subscribe(res => {
        this.editData = res;
        this.registerForm.setValue({
          name: this.editData.name, 
          email: this.editData.email, 
          role: this.editData.role, 
          isactive: this.editData.isactive
        });
      });
    }
  }

  createForm():void {
    this.registerForm = this.builder.group({
      // id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
      name: [''],
      email: [''],
      role: ['', [Validators.required]],
      isactive: [false]
    })
  } 

  updateUser(){
    if(this.registerForm.valid){
      this.auth.updateUser(this.data.userid, this.registerForm.value).subscribe(res => {
        console.log(res);
        this.toastr.success('Updated successfully');
        this.dialog.close();
      });
    } else {
      this.toastr.warning('Please Select Role');
    }
  }
}
