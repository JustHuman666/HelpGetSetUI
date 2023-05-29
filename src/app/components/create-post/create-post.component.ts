import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup } from '@angular/forms';

import { UserService } from "src/app/services/user-service/user.service";
import { AuthService } from "src/app/services/auth-service/auth.service";
import { Error } from "src/app/error-handle/error";
import { CountryService } from "src/app/services/country-service/country.service";
import { GetUser } from "src/app/interfaces/user/get-user";
import { LoggedUserProfile } from "src/app/interfaces/user/logged-user-profile";
import { GetCountryVersion } from "src/app/interfaces/country/get-country-version";
import { GetCountry } from "src/app/interfaces/country/get-country";
import { PostService } from "src/app/services/post-service/post.service";

@Component({
    selector: 'create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.css']
})

export class CreatePostComponent implements OnInit {

  postForm!: FormGroup;
  countries!: GetCountry[];
  postError!: string;

  constructor(private userService: UserService,
    private countryService: CountryService,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.postError = '';
    this.postForm = new FormGroup({
      content: new FormControl(),
      countryId: new FormControl()
    })
    this.countryService.getAllCountries().subscribe(
      (data) => {
        this.countries = data;
      }
    )
    
  }

  addNewPost(){
    this.postService.createPost({
      content: this.postForm.value.content,
      countryId: this.postForm.value.countryId
    }).subscribe(
      () => {
        alert("A new post is created!")
        this.router.navigate(["/posts"])
      },
      (exception) => {
        this.postError = exception.message;
      }
    );
  }
}
  