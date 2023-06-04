import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "src/app/services/user-service/user.service";

import { Error } from "src/app/error-handle/error";
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
    
    @Input() postId!: number;
    Post!: GetPost;
    author!:  GetUser;
    country!: GetCountry;

    ngOnInit(): void {
        this.postService.getPostById(this.postId).subscribe(
            (post) => {
                this.Post = post;
                this.countryService.getCountryById(this.Post.countryId).subscribe(
                    (country) => {
                        this.country = country;
                        this.userService.getUserById(this.Post.authorId).subscribe(
                            (profile) => {
                                this.author = profile;
                                this.checkIfAuthor();
                            }
                        )
                    }
                );
            }
        )
    }

    isAuthor!: boolean;

    checkIfAuthor(){
        this.userService.getThisUserProfile().subscribe(
            (profile) => {
                this.isAuthor = profile.id == this.Post.authorId;
            }
        )
    }

    deletePost(){
        if(confirm("Are you sure, you want to delete your post?")){
            this.postService.deletePost(this.Post.id).subscribe(
                () => {
                    alert("Post is deleted");
                    window.location.reload();
                }
            )
        }
    }
}
  