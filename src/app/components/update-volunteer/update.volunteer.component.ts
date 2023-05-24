import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from "src/app/services/auth-service/auth.service";

import { Error } from "src/app/error-handle/error";

@Component({
    selector: 'update-volunteer',
    templateUrl: './update.volunteer.component.html',
    styleUrls: ['./update.volunteer.component.css']
})

export class UpdateVolunteerComponent implements OnInit {

  currentDate: string;
  genders: string[];

    constructor(private authService: AuthService, private router: Router) {
      let today = new Date();
      this.currentDate = today.toISOString().split('T')[0];
      this.genders = ["Female", "Male", "Other"]
    }

    registerForm!: FormGroup;

    error!: string;

    ngOnInit(): void {
        
        this.error = '';
        this.registerForm = new FormGroup({
          userName: new FormControl(),
          firstName: new FormControl(),
          lastName: new FormControl(),
          phoneNumber: new FormControl(),
          gender: new FormControl(),
          birthday: new FormControl(),
          password: new FormControl()
        });
    }

    register(){
        this.authService.register(this.registerForm.value).subscribe(
            () => {
                alert("Your account was successfully created! Now try to log in.");
                this.router.navigate(['']);
              },
              (exception) => {
                this.error = Error.returnErrorMessage(exception);
                
              }
        );
    }

}
  