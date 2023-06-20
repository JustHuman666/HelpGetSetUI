import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "src/app/services/user-service/user.service";

import { PostService } from "src/app/services/post-service/post.service";
import { GetPost } from "src/app/interfaces/post/get-post";
import { GetUser } from "src/app/interfaces/user/get-user";
import { GetCountry } from "src/app/interfaces/country/get-country";
import { CountryService } from "src/app/services/country-service/country.service";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'one-post',
    templateUrl: './one.post.component.html',
    styleUrls: ['./one.post.component.css']
})
  

export class OnePostComponent implements OnInit{

    constructor(private userService: UserService,
        private postService: PostService,
        private countryService: CountryService,
        public datepipe: DatePipe,
        private router: Router) {
           
    }
    
    @Input() post!: GetPost;
    author!:  GetUser;
    country!: GetCountry;
    isAuthor!: boolean;

    ngOnInit(): void {
        this.countryService.getCountryById(this.post.countryId).subscribe(
            (country) => {
                this.country = country;
            }
        );
        this.userService.getUserById(this.post.authorId).subscribe(
            (profile) => {
                this.author = profile;
                this.userService.getThisUserProfile().subscribe(
                    (user) => {
                        this.isAuthor = user.id == profile.id;
                    }
                );
            }
        );
    }

    deletePost(){
        if(confirm("Are you sure, you want to delete your post?")){
            this.postService.deletePost(this.post.id).subscribe(
                () => {
                    alert("Post is deleted");
                    window.location.reload();
                }
            )
        }
    }
}
  