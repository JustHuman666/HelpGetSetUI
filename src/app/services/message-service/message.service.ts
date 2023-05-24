import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HELPGETSET_API_URL } from 'src/app/injection/injection-token';

import { GetMessage } from 'src/app/interfaces/chat/get-message';
import { SendMessage } from 'src/app/interfaces/chat/send-message';

@Injectable({
  providedIn: 'root'
})

export class MessageService{

  constructor(private http: HttpClient, 
    @Inject(HELPGETSET_API_URL) private apiUrl: string) { }

    sendNewMessageInChat(messageModel: SendMessage):Observable<any>{
        return this.http.post(`${this.apiUrl}/api/Message`, messageModel);
    }

    deleteMessage(messageId: number):Observable<any>{
        return this.http.delete(`${this.apiUrl}/api/Message/${messageId}`);
    }

    getMessageById(id: number):Observable<GetMessage>{
        return this.http.get<GetMessage>(`${this.apiUrl}/api/Message/${id}`)
    } 

    getAllMessages():Observable<GetMessage[]>{
        return this.http.get<GetMessage[]>(`${this.apiUrl}/api/Message/GetAll`)
    } 
    getChatMessages(id: number):Observable<GetMessage[]>{
        return this.http.get<GetMessage[]>(`${this.apiUrl}/api/Message/MessagesOfChat/${id}`)
    } 
}
