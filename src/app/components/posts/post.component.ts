import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

import { UserService } from "src/app/services/user-service/user.service";
import { AuthService } from "src/app/services/auth-service/auth.service";
import { DatePipe } from "@angular/common";
import { GetPost } from "src/app/interfaces/post/get-post";
import { PostService } from "src/app/services/post-service/post.service";
import { LoggedUserProfile } from "src/app/interfaces/user/logged-user-profile";
import { FormControl, FormGroup } from "@angular/forms";
import { GetCountry } from "src/app/interfaces/country/get-country";
import { CountryService } from "src/app/services/country-service/country.service";

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
    this.countryForm = new FormGroup({
      countryId: new FormControl()
    });
    this.volunteerForm = new FormGroup({
      countryId: new FormControl()
    });
    this.migrantForm = new FormGroup({
      countryId: new FormControl()
    });
    this.userService.getThisUserProfile().subscribe(
      (profile) => {
        this.user = profile;
        this.postService.getPostsByUserId(profile.id).subscribe(
          (posts) => {
            this.myPosts = posts;
            this.myPostsError = '';
            this.getDefaultPosts();
            this.getMigrantsPosts();
            this.getVolunteersPosts();
          },
          (exception) => {
            this.myPostsError = "No post found";
          }
        )
      });
    this.countryService.getAllCountries().subscribe(
      (data) => {
        this.countries = data;
      }
    )
  }
  updateAll(){
    this.getDefaultPosts();
    this.getUsersPosts();
    this.getMigrantsPosts();
    this.getVolunteersPosts();
  }

  getUsersPosts(){
    this.userService.getThisUserProfile().subscribe(
      (profile) => {
        this.user = profile;
        this.postService.getPostsByUserId(profile.id).subscribe(
          (posts) => {
            this.myPosts = posts;
            this.myPostsError = '';
          },
          (exception) => {
            this.myPostsError = "No post found for country";
          }
        )
      });
  }

  getDefaultPosts(){
    if(this.isLoggedIn){
      this.postService.getPostsByCountryId(this.user.currentCountryId).subscribe(
        (data) => {
          this.defaultPosts = data;
          this.defaultPostsError = '';
        },
        (exception) => {
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
      );
    }
    else{
      this.postService.getAllPosts().subscribe(
        (data) => {
          this.defaultPosts = data;
          this.defaultPostsError = '';
        },
        (exception) => {
          this.defaultPostsError = "No post found";
        }
      );
    };
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

  volunteerPostsByCountry: GetPost[] = [];
  getVolunteersPostsByCountry(){
    this.postService.getVolunteersPosts().subscribe(
      (data) => {
        data.forEach(post => {
          if(post.countryId == this.volunteerForm.value.countryId){
            this.volunteerPostsByCountry.push(post);
          }
        });
        this.volunteersPosts = this.volunteerPostsByCountry;
        this.volunteerError = '';
      },
      (exception) => {
        this.volunteerError = "No volunteers post is found";
      }
    )
  }

  migrantPostsByCountry: GetPost[] = [];
  getMigrantsPosts(){
    this.postService.getMigrantsPosts().subscribe(
      (data) => {
        this.migrantPosts = data;
        this.migrantError = '';
      },
      (exception) => {
        this.volunteerError = "No volunteers post is found";
      }
    )
  }

  getMigrantsPostsByCountry(){
    this.postService.getMigrantsPosts().subscribe(
      (data) => {
        data.forEach(post => {
          if(post.countryId == this.migrantForm.value.countryId){
            this.migrantPostsByCountry.push(post);
          }
        });
        this.migrantPosts = this.migrantPostsByCountry;
        this.migrantError = '';
      },
      (exception) => {
        this.migrantError = "No volunteers post is found";
      }
    )
  }
}
  