import { Component } from '@angular/core';
import { JsonService } from '../services/json.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  users:any=[]
  fb:FormGroup=new FormGroup({
    username:new FormControl('', Validators.required),
    password:new FormControl('', Validators.required)
  })
  onLogin(){
   if(this.fb.valid){
    let username=this.fb.controls['username'].value
    let password=this.fb.controls['password'].value
    let flag:boolean=false;
    for(let index=0; index<this.users.length;index++){
      const element=this.users[index];
      if(element.username==username && element.password==password){
        flag=true;
        break;
      }
    }
    if(flag){
      alert('Login Successfull !! ');
      this.router.navigate(['admin'])
    }
    else{
      alert('Login Failed !!')
      this.fb.controls['username'].setValue('')
      this.fb.controls['password'].setValue('')
    }
   }
  }
  constructor ( private router: Router,private service:JsonService){
  service.getUsers().subscribe({
    next:(val:any)=>{
      this.users=val;
      console.log(this.users)
    }
  })
  } 
}
