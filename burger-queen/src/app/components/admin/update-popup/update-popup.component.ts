import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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

  constructor( private builder: FormBuilder, private auth: AuthService, private dialog: MatDialog ) {
  }

  ngOnInit():void{
    this.createForm();
    this.auth.getAllUserRoles().subscribe(res => {
      this.rolelist = res as roleList[];
    });
  }

  createForm():void {
    this.registerForm = this.builder.group({
      // id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
      name: [''],
      password: [''],
      email: [''],
      role: ['', [Validators.required]],
      isactive: [false]
    })
  } 

  updateUser(){
    console.log('PopUser update');
  }
}
