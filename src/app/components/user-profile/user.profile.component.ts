import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { UserService } from "src/app/services/user-service/user.service";

import { GetUser } from "src/app/interfaces/user/get-user";

import { DatePipe } from "@angular/common";
import { GetCountry } from "src/app/interfaces/country/get-country";
import { CountryService } from "src/app/services/country-service/country.service";
import { MigrantService } from "src/app/services/migrant-service/migrant.service";
import { VolunteerService } from "src/app/services/volunteer-service/volunteer.service";
import { Volunteer } from "src/app/interfaces/volunteer/volunteer";
import { Migrant } from "src/app/interfaces/migrant/migrant";
import { GetPost } from "src/app/interfaces/post/get-post";
import { PostService } from "src/app/services/post-service/post.service";
import { AuthService } from "src/app/services/auth-service/auth.service";
import { ChatService } from "src/app/services/chat-service/chat.service";
import { LoggedUserProfile } from "src/app/interfaces/user/logged-user-profile";
import { CreateChat } from "src/app/interfaces/chat/create-chat";

@Component({
    selector: 'user-profile',
    templateUrl: './user.profile.component.html',
    styleUrls: ['./user.profile.component.css']
})
  

export class UserProfileComponent implements OnInit{

    constructor(private userService: UserService,
        private authService: AuthService,
        private chatService: ChatService,
        private countryService: CountryService,
        private migrantService: MigrantService,
        private volunteerService: VolunteerService,
        private route: ActivatedRoute,
        private router: Router,
        public datepipe: DatePipe,
        private postService: PostService) {
           
    }
    ngOnInit(): void {
        this.userId = this.route.snapshot.params['id'];
        this.isLoggedIn = this.authService.isAuthenticated();
        this.userService.getUserById(this.userId).subscribe(
            (data) => {
                this.foundUser = data;
                this.countryService.getCountryById(this.foundUser.currentCountryId).subscribe(
                    (data) => {
                        this.currentCountry = data;
                        this.countryService.getCountryById(this.foundUser.originalCountryId).subscribe(
                            (country) => {
                                this.originalCountry = country;
                            }
                        )
                    }
                );
                this.userService.getThisUserProfile().subscribe(
                    (profile) => {
                        this.theUser = profile;
                    }
                );
                this.postService.getPostsByUserId(data.id).subscribe(
                    (posts) => {
                        this.userPosts = posts;
                    }
                );
                this.checkIfExists();
                
            }
        );
        this.checkIfMigrant();
        this.checkIfVolunteer();
       
    }

    isLoggedIn!: boolean;
    foundUser!: GetUser;

    currentCountry!: GetCountry;
    originalCountry!: GetCountry;
    volunteer!: Volunteer;
    migrant!: Migrant;
    isMigrant: boolean = false;
    isVolunteer: boolean = false;

    userPosts: GetPost[] = [];

    userId!: number;

    checkIfMigrant(){
        this.migrantService.getMigrantByUserId(this.userId).subscribe(
            (data) => {
                if(data.id > 0){
                    this.isMigrant = true;
                    this.migrant = data
                }
            }
        );
        this.isMigrant = false;
    }

    checkIfVolunteer(){
        this.volunteerService.getVolunteerByUserId(this.userId).subscribe(
            (data) => {
                if(data.id > 0){
                    this.isVolunteer = true;
                    this.volunteer = data
                }
                
            }
        );
        this.isVolunteer = false;
    }

    theUser!: LoggedUserProfile;
    chatExists!: boolean;
    goToChat(){
        if(this.chatExists){
            this.router.navigate(["/chat-messages", this.chatId]);
        }
        else {
            this.createNewChat();
        }
    }

    chatId!: number;
    checkIfExists(){
        this.chatService.getOwnChats().subscribe(
            (chats) => {
                this.chatExists = false;
                chats.forEach(chat => {
                    if(chat.userIds.includes(this.foundUser.id) && chat.userIds.includes(this.theUser.id)){
                        if(chat.userIds.length == 2){
                            this.chatExists = true;
                            this.chatId = chat.id;
                        }
                    }
                });
            }
        );
    }
    createNewChat(){
        let ids = [this.theUser.id, this.foundUser.id]

        let chatModel: CreateChat = {
            chatName : `${this.theUser.userName} and ${this.foundUser.userName}`,
            userIds: ids
        }
        this.chatService.createChat(chatModel).subscribe(
            (data) => {
                this.chatService.getOwnChats().subscribe(
                    (chats) => {
                        chats.forEach(chat => {
                            if(chat.userIds.includes(this.foundUser.id) && chat.userIds.includes(this.theUser.id)){
                                if(chat.userIds.length == 2){
                                    this.router.navigate(["/chat-messages", chat.id]);
                                }
                            }
                        });
                    }
                );
            }
        );
        
    }

}
  