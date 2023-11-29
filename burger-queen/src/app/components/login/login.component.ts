import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private builder:FormBuilder, private toastr: ToastrService, 
    private auth: AuthService, private router: Router) {
      sessionStorage.clear();
  }

  hide = true;
  isLoading = false;
  loginForm!: FormGroup;

  ngOnInit():void{
    this.createForm();
  }

  createForm():void {
    this.loginForm = this.builder.group({
      // id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  proceedLogin(){
    if(this.loginForm.valid) {
      this.auth.proceedLoginUser(this.loginForm.value);
      this.auth.loginResponse$.subscribe(res => {
        if (res.error !== null) this.toastr.warning(res.error?.message);
        if (res.data !== null) {
          this.toastr.success(`Welcome ${res.data.user.name} to Burger Queen`, 'Logged Succesfully');
          this.router.navigate(['']);
        }
      });
    } else {
      this.toastr.warning('Please enter valid data');
    }
  }

}
