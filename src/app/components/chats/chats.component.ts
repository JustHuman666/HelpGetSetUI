import { Component, OnInit } from "@angular/core";

import { AuthService } from "src/app/services/auth-service/auth.service";
import { ChatService } from "src/app/services/chat-service/chat.service";

import { CreateChat } from "src/app/interfaces/chat/create-chat";

import { Error } from "src/app/error-handle/error";
import { GetChat } from "src/app/interfaces/chat/get-chat";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: 'chats',
    templateUrl: './chats.component.html',
    styleUrls: ['./chats.component.css']
})

export class ChatsComponent implements OnInit {

    constructor(private authService: AuthService,
        private chatService: ChatService) {}

    
    ngOnInit(): void {
        this.chatsError = '';

        this.chatService.getOwnChats().subscribe(
            (data) => {
                this.loggedUserChats = data;
            },
            (exception) =>{
                this.chatsError = Error.returnErrorMessage(exception);
            }
        );

        this.chatForm = new FormGroup({
            chatName: new FormControl()
        })
        
    }

    loggedUserChats: GetChat[] = [];

    chatsError!: string;

    formError!: string;

    chatForm!: FormGroup;

    deleteChat(id: number){
        if(confirm("Do you really want to delete this chat for all?"))
        {
            this.chatService.deleteChat(id).subscribe(
                (data) => {
                    this.loggedUserChats.forEach((chat, index) => {
                        if(chat.id == id){
                            this.loggedUserChats.splice(index, 1);
                        }
                    });
                },
                (exception) =>{
                    this.chatsError = Error.returnErrorMessage(exception);
                    alert(this.chatsError);
                }
            );
        }
        
    }

    deleteLoggedUserFromChat(id: number){
        if(confirm("Do you really want to quit from this chat?"))
        {
            this.chatService.deleteUserFromChat(id, this.authService.getUserId()).subscribe(
                (data) => {
                    this.loggedUserChats.forEach((chat, index) => {
                        if(chat.id == id){
                            this.loggedUserChats.splice(index, 1);
                        }
                    });
                },
                (exception) =>{
                    this.chatsError = Error.returnErrorMessage(exception);
                    alert(this.chatsError);
                }
            );
        }
        
    }

    clearHistory(id: number){
        if(confirm("Do you really want to clear all messages in this chat?"))
        {
            this.chatService.clearChatHistory(id).subscribe(
                (data) => {
                    alert("The history of this chat was successfully cleared.");
                },
                (exception) =>{
                    this.chatsError = Error.returnErrorMessage(exception);
                    alert(this.chatsError);
                }
            );
        }
        
    }

    createNewChat(){
        let ids = [];
        ids.push(this.authService.getUserId());
        let chatModel: CreateChat = {
            chatName : this.chatForm.value.chatName,
            userIds: ids
        }
        this.chatService.createChat(chatModel).subscribe(
            (data) => {
                alert("The chat was successfully created.");
                window.location.reload();
            },
            (exception) =>{
                this.formError = Error.returnErrorMessage(exception);
                alert(this.formError);
            }
        );
        
    }

}
  