import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { UserService } from "src/app/services/user-service/user.service";

import { GetUser } from "src/app/interfaces/user/get-user";

import { Error } from "src/app/error-handle/error";

@Component({
    selector: 'user-profile',
    templateUrl: './user.profile.component.html',
    styleUrls: ['./user.profile.component.css']
})
  

export class UserProfileComponent implements OnInit{

    constructor(private userService: UserService,
        private route: ActivatedRoute,
        private router: Router) {
           
    }
    ngOnInit(): void {
        this.userId = this.route.snapshot.params['id'];
        
        this.userService.getUserById(this.userId).subscribe(
            (data) => {
                this.foundUser = data;
            }
        );
    }

    foundUser!: GetUser;

    userId!: number;

}
  