import { Component, OnInit } from "@angular/core";
import { Router,  ActivatedRoute } from "@angular/router";

import { UserService } from "src/app/services/user-service/user.service";
import { AuthService } from "src/app/services/auth-service/auth.service";
import { ChatService } from "src/app/services/chat-service/chat.service";
import { MessageService } from "src/app/services/message-service/message.service";

import { GetUser } from "src/app/interfaces/user/get-user";

import { Error } from "src/app/error-handle/error";
import { GetChat } from "src/app/interfaces/chat/get-chat";
import { FormControl, FormGroup } from "@angular/forms";
import { GetMessage } from "src/app/interfaces/chat/get-message";
import { SendMessage } from "src/app/interfaces/chat/send-message";

@Component({
    selector: 'chat-messages',
    templateUrl: './chat.messages.component.html',
    styleUrls: ['./chat.messages.component.css']
})

export class ChatMessagesComponent implements OnInit {

    constructor(private authService: AuthService,
        private chatService: ChatService,
        private messageService: MessageService,
        private userService: UserService,
        private route: ActivatedRoute) {
        }

    chatError!: string;
    usersError!: string;
    userError!: string;
    messagesError!: string;
    messageError!: string;
    thisChatMessages: GetMessage[] = [];
    thisChatUsers: GetUser[] = [];
    text!: FormControl;
    userName!: FormControl;
    thisChatId!: number;
    thisChat!: GetChat;
    
    ngOnInit(): void {

        this.messagesError = '';
        this.usersError = '';
        this.userError = '';
        this.messageError = '';
        this.chatError = '';
        this.text = new FormControl();
        this.userName = new FormControl();
        this.thisChatId = this.route.snapshot.params['id'];
        this.chatError = '';

        this.messageService.getChatMessages(this.thisChatId).subscribe(
            (data) => {
                this.thisChatMessages = data.reverse();
            },
            (exception) => {
                this.messagesError = Error.returnErrorMessage(exception);
            }
        );
        this.chatService.getChatById(this.thisChatId).subscribe(
            (data) => {
                this.thisChat = data;
            },
            (exception) => {
                this.chatError = Error.returnErrorMessage(exception);
            }
        );
        this.chatService.getUsersOfChatById(this.thisChatId).subscribe(
            (data) => {
                this.thisChatUsers = data;
            },
            (exception) => {
                this.usersError = Error.returnErrorMessage(exception);
            }
        );
    }
    sendMessage(){
        let newMessage: SendMessage = {
            text: this.text.value,
            senderId: this.authService.getUserId(),
            chatId: this.thisChatId
        }
        this.messageService.sendNewMessageInChat(newMessage).subscribe(
            (data) => {
                this.thisChatMessages = [data, ...this.thisChatMessages];
                this.text.reset();
            },
            (exception) => {
                this.messageError = Error.returnErrorMessage(exception);
            }
        );
    }

    addNewUser(){
        this.userService.getUserProfileByUserName(this.userName.value).subscribe(
            (user) => {
                this.chatService.addUserInChat(this.thisChat.id, user.id).subscribe(
                    (data) => {
                        alert("User added.");
                        this.thisChatUsers.push(user)
                    }
                );
            },
            (exception) =>{
                if (exception.status == 404){
                    this.userError = Error.returnErrorMessage(exception);
                }
                else {
                    this.userError = "Wrong value";
                }
            }
        );
    }
    
}
  