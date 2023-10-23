import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  forbiddenNames = ['alice','bob'];
  genders = ['male', 'female'];
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required,this.namesCheck.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email],this.emailsCheck),
      }),
      gender: new FormControl('female'),
      hobbies : new FormArray([])
    });
    this.signupForm.valueChanges.subscribe(
      (value) => {
        console.log(value.userData.username);
      }
    )
    /*this.signupForm.statusChanges.subscribe(
      (value) => {
        console.log(value);
      }
    )*/
    this.signupForm.setValue({
      'userData' : {
        'username' : "max",
        'email' : 'mac@gg.com'
      },
      'gender' : 'male',
      'hobbies': []
    })
    this.signupForm.patchValue({
      'userData' : {
        'username' : "anna",
      }
    })
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }
  onAddHobby(){
    const control = new FormControl(null,Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
  getControls(){
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }
  namesCheck(control : FormControl):{[s:string]:boolean}{
    if(this.forbiddenNames.indexOf(control.value) !== -1){
      return {'nameIsForbidden':true}
    }
    return null

  }
  emailsCheck( control : FormControl): Promise<any>|Observable<any>{
    const promise = new Promise<any>(
      (resolve,reject)=>{
          setTimeout(()=>{
            if(control.value === "test@test.com"){
              resolve({'emailIsForbidden' : true})
            }else{
              resolve(null)
            }
          },1500);
      }
    );
    return promise;
  }
}
