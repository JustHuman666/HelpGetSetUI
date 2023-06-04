import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "src/app/services/user-service/user.service";
import { AuthService } from "src/app/services/auth-service/auth.service";
import { MessageService } from "src/app/services/message-service/message.service";

import { DatePipe } from "@angular/common";
import { Error } from "src/app/error-handle/error";

import { GetUser } from "src/app/interfaces/user/get-user";
import { GetMessage } from "src/app/interfaces/chat/get-message";

@Component({
    selector: 'message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {

    constructor(private authService: AuthService,
        private userService: UserService,
        private messageService: MessageService,
        public datepipe: DatePipe,
        private router: Router) {}

    messageError!: string;
    
    @Input() Message!: GetMessage;

    userSender!: GetUser;

    sendingTime!: string;

    ngOnInit(): void {
        this.messageError = '';
        this.userService.getUserById(this.Message.senderId).subscribe(
            (data) => {
                this.userSender = data;
            }
        );

        this.sendingTime = this.datepipe.transform(this.Message.sendingTime, 'M/d/yy, h:mm a')!;
    }
    
    isDeleted!: boolean;
    chatId!: number;
    deleteMessage(){
        if(confirm("Are you sure, you want to delete this message?")){
            this.messageService.deleteMessage(this.Message.id).subscribe(
                (data) => {
                    this.isDeleted = true;
                    window.location.reload()
                },
                (exception) => {
                    this.messageError = Error.returnErrorMessage(exception);
                }
            );
        }
        
    }
}
  