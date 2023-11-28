import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  hide = true;
  registerForm!: FormGroup;

  constructor(private builder: FormBuilder, private toastr: ToastrService, private router: Router) {

  }

  ngOnInit():void{
    this.createForm();
  }

  createForm():void {
    this.registerForm = this.builder.group({
      // id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
      name: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      role: [''],
      isactive: [false]
    })
  } 

  proceedRegistration(){
    if(this.registerForm.valid){
      const data = { 
        ...this.registerForm.value, 
        role: '', 
        isactive: false
      }
      console.log(data);
    //   this.auth.proceedRegisterUser(this.registerForm.value).subscribe(res => {
    //     console.log('Respuesta de la solicitud POST:', res);
    //     this.toastr.success('Please contact admin for enable access', 'Registered Succesfully');
    //     this.router.navigate(['login']);
    //   });
    } else {
      this.toastr.warning('Please enter valid data');
    }
  }

}
