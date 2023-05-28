import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup } from '@angular/forms';

import { Error } from "src/app/error-handle/error";
import { MigrantService } from "src/app/services/migrant-service/migrant.service";
import { AuthService } from "src/app/services/auth-service/auth.service";

@Component({
    selector: 'update-migrant',
    templateUrl: './update.migrant.component.html',
    styleUrls: ['./update.migrant.component.css']
})

export class UpdateMigrantComponent implements OnInit {
  userId!: number;
  housingTypes: string[];
  choices: string[];
  familyStatuses: string[];
    constructor(
      private migrantService: MigrantService, 
      private authService: AuthService,
      private router: Router, 
      private route: ActivatedRoute) {
      this.userId = this.route.snapshot.params['id'];
      this.housingTypes = ["Shelter", "Family", "Rent", "Campus", "None"];
      this.familyStatuses = ["Single", "Married", "Partnership"]
      this.choices = ["Yes", "No"]
    }

    updateForm!: FormGroup;

    error!: string;

    migrantId!: number;

    ngOnInit(): void {
        
        this.error = '';
        this.updateForm = new FormGroup({
          isOfficialRefugee: new FormControl(),
          isForcedMigrant: new FormControl(),
          isCommonMigrant: new FormControl(),
          amountOfChildren: new FormControl(),
          isEmployed: new FormControl(),
          familyStatus: new FormControl(),
          housing: new FormControl()
        });
    }

    update(){
      let choiceDict: {[id: string] : boolean} = {
        "Yes": true,
        "No": false
      }
      this.migrantService.getMigrantByUserId(this.userId).subscribe(
        (data) => {
          this.migrantId = data.id;
        }
      )
      this.migrantService.updateMigrant({
        amountOfChildren: this.updateForm.value.amountOfChildren,
        isOfficialRefugee: choiceDict[this.updateForm.value.isOfficialRefugee],
        isForcedMigrant: choiceDict[this.updateForm.value.isForcedMigrant],
        isCommonMigrant: choiceDict[this.updateForm.value.isCommonMigrant],
        isEmployed: choiceDict[this.updateForm.value.isEmployed],
        housing: this.updateForm.value.housing,
        userId: this.userId,
        familyStatus: this.updateForm.value.familyStatus,
        id: this.migrantId
      }).subscribe(
          () => {
              
              if (!this.authService.isAuthenticated()){
                alert("Your migrant information was successfully updated! You can try to log in");
                this.router.navigate(['']);
              }
              else {
                alert("Your migrant information was successfully updated!");
              }
            },
            (exception) => {
              this.error = Error.returnErrorMessage(exception);
            }
      );
    }

}
  