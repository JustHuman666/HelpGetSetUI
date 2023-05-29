import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, FormsModule } from '@angular/forms';

import { AuthService } from "src/app/services/auth-service/auth.service";

import { Error } from "src/app/error-handle/error";
import { VolunteerService } from "src/app/services/volunteer-service/volunteer.service";

@Component({
    selector: 'update-volunteer',
    templateUrl: './update.volunteer.component.html',
    styleUrls: ['./update.volunteer.component.css']
})

export class UpdateVolunteerComponent implements OnInit {
  userId!: number;
  choices: string[];

  constructor(
    private volunteerService: VolunteerService, 
    private authService: AuthService,
    private router: Router, 
    private route: ActivatedRoute) {
    this.userId = this.route.snapshot.params['id'];
    this.choices = ["Yes", "No"]
  }

    updateForm!: FormGroup;

    error!: string;

    volunteerId!: number;

    ngOnInit(): void {
      this.error = '';
      this.updateForm = new FormGroup({
        isATranslator: new FormControl(),
        isOrganisation: new FormControl(),
        hasAPlace: new FormControl()
      });
      this.volunteerService.getVolunteerByUserId(this.userId).subscribe(
        (profile) => {
          this.updateForm.setValue({
            isATranslator: this.defineString(profile.isATranslator),
            isOrganisation: this.defineString(profile.isOrganisation),
            hasAPlace: this.defineString(profile.hasAPlace)
          })
        }
      )
    }

    defineString(answer: boolean): string{
      let stringAnswer = "No"
      if(answer){
        stringAnswer = "Yes"
      }
      return stringAnswer;
    }

    update(){
      let choiceDict: {[id: string] : boolean} = {
        "Yes": true,
        "No": false
      }
      this.volunteerService.getVolunteerByUserId(this.userId).subscribe(
        (data) => {
          this.volunteerId = data.id;
          this.volunteerService.updateVolunteer({
            isATranslator: choiceDict[this.updateForm.value.isATranslator],
            isOrganisation: choiceDict[this.updateForm.value.isOrganisation],
            hasAPlace: choiceDict[this.updateForm.value.hasAPlace],
            userId: this.userId,
            id: this.volunteerId
          }).subscribe(
              () => {
                  
                  if (!this.authService.isAuthenticated()){
                    alert("Your volunteer information was successfully updated! You can try to log in");
                    this.router.navigate(['']);
                  }
                  else {
                    alert("Your volunteer information was successfully updated!");
                    this.error = '';
                  }
                },
                (exception) => {
                  this.error = Error.returnErrorMessage(exception);
                }
          );
        }
      );
    }

}
  