import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgStyle } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { JsonService } from '../services/json.service';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgStyle, ReactiveFormsModule, NgFor,CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  show:boolean=false;
  show1:boolean=false;
  title:string="Add Customer"
  editCustomerId:string=""
  customerArr:any=[]
  fb=new FormGroup({
    name:new FormControl('', Validators.required),
    email:new FormControl('', Validators.required),
    mobile:new FormControl('', Validators.required),
    address:new FormControl('', Validators.required),
    pincode:new FormControl('', Validators.required),
    date:new FormControl('', Validators.required),
    categories:new FormControl('', Validators.required),
    height:new FormControl('', Validators.required),
    width:new FormControl('', Validators.required),
    neck:new FormControl('', Validators.required),
    bottom:new FormControl('', Validators.required),
    sleves:new FormControl('', Validators.required),
    shoulder:new FormControl('', Validators.required),
    qty:new FormControl('', Validators.required),
    amount:new FormControl('', Validators.required)
  })
  constructor(private router:Router,private service:JsonService){
    if(localStorage.getItem('token')==null){
      router.navigate(['admin'])
    }
    this.getCustomerList();
  }
  logout(){
    this.router.navigate(['/login'])
  }
  clearForm(){
    this.fb.controls['name'].setValue('')
    this.fb.controls['email'].setValue('')
    this.fb.controls['mobile'].setValue('')
    this.fb.controls['address'].setValue('')
    this.fb.controls['pincode'].setValue('')
    this.fb.controls['date'].setValue('')
    this.fb.controls['categories'].setValue('')
    this.fb.controls['height'].setValue('')
    this.fb.controls['width'].setValue('')
    this.fb.controls['neck'].setValue('')
    this.fb.controls['bottom'].setValue('')
    this.fb.controls['sleves'].setValue('')
    this.fb.controls['shoulder'].setValue('')
    this.fb.controls['qty'].setValue('')
    this.fb.controls['amount'].setValue('')
  }
  getCustomerList(){
    this.service.getCustomer().subscribe({
      next:(res:any)=>{
        this.customerArr=res;
        console.log(this.customerArr)
      },error(err){
        console.log(err)
      },
    })
  }
 addCustomer(){
  if(this.fb.valid){
    if(this.title=="Add Customer"){
      this.service.addCustomer(this.fb.value).subscribe({
        next:()=>{
          alert('Customer Deatils Added Successfully !!')
          this.clearForm();
          setTimeout(()=>{
            this.show=!this.show
          },1500)
          this.getCustomerList();
        },error:(err:any)=>{
          alert(err)
        }
      })
    }else{
      this.service.updateCustomer(this.editCustomerId,this.fb.value).subscribe({
        next:()=>{
          alert("Customer Details Updated Successfully !!")
          this.clearForm();
          setTimeout(()=>{
            this.show=!this.show
          },1500)
          this.getCustomerList()
        },error(err){
          alert(err)
        },
      })
    }
  }else{
    alert("All Values Requuired !!")
  }
 }
 deleteCustomer(id:any){
  this.service.deleteCustomer(id).subscribe({
    next:()=>{
      alert('Customer Deleted Sucessfully !!')
    },error(err){
      alert(err)
    }
  })
 }
 editCustomer(id:any){
  this.show=!this.show
  this.title="Edit Customer"
  this.editCustomerId=id
  for(let index=0; index<this.customerArr.length; index++){
    const element=this.customerArr[index];
    
    if(element.id==id){
      this.fb.controls['name'].setValue(element.name);
      this.fb.controls['email'].setValue(element.email);
      this.fb.controls['mobile'].setValue(element.mobile);
      this.fb.controls['address'].setValue(element.address);
      this.fb.controls['pincode'].setValue(element.pincode);
      this.fb.controls['date'].setValue(element.date);
      this.fb.controls['categories'].setValue(element.categories);
      this.fb.controls['height'].setValue(element.height);
      this.fb.controls['width'].setValue(element.width);
      this.fb.controls['neck'].setValue(element.neck);
      this.fb.controls['bottom'].setValue(element.bottom);
      this.fb.controls['sleves'].setValue(element.sleves);
      this.fb.controls['shoulder'].setValue(element.shoulder);
      this.fb.controls['qty'].setValue(element.qty);
      this.fb.controls['amount'].setValue(element.amount);
    }
  }
 }
 showForm(){
  this.show=!this.show
  this.title="Add Customer"
 }

}
