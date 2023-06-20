import { Component, OnInit } from "@angular/core";

import { UserService } from "src/app/services/user-service/user.service";
import { AuthService } from "src/app/services/auth-service/auth.service";
import { DatePipe } from "@angular/common";
import { GetPost } from "src/app/interfaces/post/get-post";
import { PostService } from "src/app/services/post-service/post.service";
import { LoggedUserProfile } from "src/app/interfaces/user/logged-user-profile";
import { FormControl, FormGroup } from "@angular/forms";
import { GetCountry } from "src/app/interfaces/country/get-country";
import { CountryService } from "src/app/services/country-service/country.service";
import { MatTabChangeEvent } from "@angular/material/tabs";

@Component({
    selector: 'posts',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})

export class PostsComponent implements OnInit {

  constructor(private userService: UserService,
    private authService: AuthService,
    private postService: PostService,
    public datepipe: DatePipe,
    private countryService: CountryService) {
  }

  
  isLoggedIn!: boolean;

  defaultPostsError: string = '';
  defaultPosts: GetPost[] = [];

  myPostsError: string = '';
  myPosts: GetPost[] = [];

  countryPosts: GetPost[] = [];
  countryError: string = '';

  volunteersPosts: GetPost[] = [];
  volunteerError: string = '';

  migrantPosts: GetPost[] = [];
  migrantError: string = '';
  
  countries!: GetCountry[];

  countryForm!: FormGroup;
  volunteerForm!: FormGroup;
  migrantForm!: FormGroup;

  user!: LoggedUserProfile;

  ngOnInit(): void {
    this.isLoggedIn =  this.authService.isAuthenticated();
    
    this.countryService.getAllCountries().subscribe(
      (data) => {
        this.countries = data;
      }
    );
    this.countryForm = new FormGroup({
      countryId: new FormControl()
    });
    this.volunteerForm = new FormGroup({
      countryId: new FormControl()
    });
    this.migrantForm = new FormGroup({
      countryId: new FormControl()
    });
    this.getDefaultPosts();
    if (this.isLoggedIn){
      this.userService.getThisUserProfile().subscribe(
        (profile) => {
          this.user = profile;
          this.getUsersPosts();
        }
      );
    }
    this.getMigrantsPosts();
    this.getVolunteersPosts();
  }

  onTabChange(event: MatTabChangeEvent) {
    const selectedIndex = event.index;
    if (selectedIndex == 0){
      this.getDefaultPosts();
    }
    if (!this.isLoggedIn){
      if (selectedIndex == 3){
        this.getMigrantsPosts();
      }
      else if (selectedIndex == 2){
        this.getVolunteersPosts();
      };
    }
    else if (this.isLoggedIn) {
      if (selectedIndex == 1){
        this.getUsersPosts();
      }
      else if (selectedIndex == 4){
        this.getMigrantsPosts();
      }
      else if (selectedIndex == 3){
        this.getVolunteersPosts();
      };
    }
  }

  getUsersPosts(){
    this.myPosts = [];
    this.postService.getPostsByUserId(this.user.id).subscribe(
      (posts) => {
        this.myPosts = posts;
        this.myPostsError = '';
      },
      (exception) => {
        this.myPostsError = "No post found for country";
      }
    );
  }

  // getDefaultPosts(){
  //   if(this.isLoggedIn){
  //     this.postService.getPostsByCountryId(this.user.currentCountryId).subscribe(
  //       (data) => {
  //         this.defaultPosts = data;
  //         this.defaultPostsError = '';
  //       },
  //       (exception) => {
  //         this.postService.getAllPosts().subscribe(
  //           (data) => {
  //             this.defaultPosts = data;
  //             this.defaultPostsError = '';
  //           },
  //           (exception) => {
  //             this.defaultPostsError = "No post found";
  //           }
  //         );
  //       }
  //     );
  //   }
  //   else{
  //     this.postService.getAllPosts().subscribe(
  //       (data) => {
  //         this.defaultPosts = data;
  //         this.defaultPostsError = '';
  //       },
  //       (exception) => {
  //         this.defaultPostsError = "No post found";
  //       }
  //     );
  //   };
  // }

  getDefaultPosts(){
    this.postService.getAllPosts().subscribe(
      (data) => {
        this.defaultPosts = data;
        this.defaultPostsError = '';
      },
      (exception) => {
        this.defaultPostsError = "No post found";
      }
    );
  }

  getPostsByCountry(){
    this.postService.getPostsByCountryId(this.countryForm.value.countryId).subscribe(
      (data) => {
        this.countryPosts = data;
        this.countryError = ''
      },
      (exception) => {
        this.countryError = "No post found for country";
      }
    )
  }

  getVolunteersPosts(){
    this.postService.getVolunteersPosts().subscribe(
      (data) => {
        this.volunteersPosts = data;
        this.volunteerError = '';
      },
      (exception) => {
        this.volunteerError = "No volunteers post is found";
      }
    )
  }

  getVolunteersPostsByCountry(){
    this.postService.getVolunteersPostsByCountry(this.volunteerForm.value.countryId).subscribe(
      (posts) => {
        this.volunteersPosts = posts;
      },
      (exception) => {
        this.volunteersPosts = [];
      }
    );
  }

  getMigrantsPosts(){
    this.postService.getMigrantsPosts().subscribe(
      (data) => {
        this.migrantPosts = data;
        this.migrantError = '';
      },
      (exception) => {
        this.migrantError = "No migrants post is found";
      }
    );
  }

  getMigrantsPostsByCountry(){
    this.postService.getMigrantsPostsByCountry(this.migrantForm.value.countryId).subscribe(
      (posts) => {
        this.migrantPosts = posts;
      },
      (exception) => {
        this.migrantPosts = [];
      }
    );
  }
}
  