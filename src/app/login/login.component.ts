import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthentificationService} from '../services/authentification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  userFormGroup! : FormGroup;
  errorMessage : any;

  constructor(private fb:FormBuilder,private AuthenServices:AuthentificationService,private route:Router) {
  }
  ngOnInit(): void {
  this.userFormGroup = this.fb.group({
    username : this.fb.control(''),
    password : this.fb.control(''),
  })
  }
  handelLogin() {
    let username = this.userFormGroup.value.username;
    let password = this.userFormGroup.value.password;
    this.AuthenServices.login(username,password).subscribe({
      next:(appUser)=>{
        this.AuthenServices.authenticatedUser(appUser).subscribe({
          next:(data)=>{
            this.route.navigateByUrl('/admin')
        }
        })
      },
      error:(err)=>{
      this.errorMessage = err
      }
    })

  }
}
