import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UpdateMigrantComponent } from './components/update-migrant/update.migrant.component';
import { ChatMessagesComponent } from './components/chat-messages/chat.messages.component';
import { MessageComponent } from './components/message/message.component';
import { ChatsComponent } from './components/chats/chats.component';
import { IsNotLoggedIn } from './guards/is-not-logged-in';
import { IsLoggedIn } from './guards/is-logged-in';
import { ProfileComponent } from './components/profile/profile.component';
import { UserProfileComponent } from './components/user-profile/user.profile.component';
import { UpdateVolunteerComponent } from './components/update-volunteer/update.volunteer.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent, canActivate: [IsNotLoggedIn]},
  {path: "register", component: RegisterComponent, canActivate: [IsNotLoggedIn]},
  {path: "register-migrant/:id", component: UpdateMigrantComponent, canActivate: [IsNotLoggedIn]},
  {path: "register-volunteer/:id", component: UpdateVolunteerComponent, canActivate: [IsNotLoggedIn]},
  {path: "chats", component: ChatsComponent, canActivate: [IsLoggedIn]},
  {path: "chat-messages/:id", component: ChatMessagesComponent, canActivate: [IsLoggedIn]},
  {path: "message", component: MessageComponent, canActivate: [IsLoggedIn]},
  {path: "user-profile/:id", component: UserProfileComponent, canActivate: [IsLoggedIn]},
  {path: "profile", component: ProfileComponent, canActivate: [IsLoggedIn]},
  // {path: "change-password", component: ChangePasswordComponent, canActivate: [IsLoggedIn]},
  // {path: "friends", component: FriendsComponent, canActivate: [IsLoggedIn]},
  // {path: "friend-profile", component: FriendProfileComponent, canActivate: [IsLoggedIn]},
  // {path: "search", component: SearchComponent, canActivate: [IsLoggedIn]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
