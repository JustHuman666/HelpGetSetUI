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
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CountriesComponent } from './components/countries/countries.component';
import { CountryVersionComponent } from './components/country-version/country-version.component';
import { CreateCountryVersionComponent } from './components/create-country-version/create-country-version.component';
import { PostsComponent } from './components/posts/post.component';
import { OnePostComponent } from './components/one-post/one.post.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent, canActivate: [IsNotLoggedIn]},
  {path: "register", component: RegisterComponent, canActivate: [IsNotLoggedIn]},
  {path: "update-migrant/:id", component: UpdateMigrantComponent},
  {path: "update-volunteer/:id", component: UpdateVolunteerComponent},
  {path: "chats", component: ChatsComponent, canActivate: [IsLoggedIn]},
  {path: "chat-messages/:id", component: ChatMessagesComponent, canActivate: [IsLoggedIn]},
  {path: "message", component: MessageComponent, canActivate: [IsLoggedIn]},
  {path: "user-profile/:id", component: UserProfileComponent},
  {path: "profile", component: ProfileComponent, canActivate: [IsLoggedIn]},
  {path: "change-password", component: ChangePasswordComponent, canActivate: [IsLoggedIn]},
  {path: "countries", component: CountriesComponent},
  {path: "country-version/:id", component: CountryVersionComponent},
  {path: "create-country-version/:id", component: CreateCountryVersionComponent, canActivate: [IsLoggedIn]},
  {path: "posts", component: PostsComponent},
  {path: "one-post", component: OnePostComponent},
  {path: "create-post", component: CreatePostComponent, canActivate: [IsLoggedIn]},
  {path: "users", component: UsersComponent},
  {path: "one-user", component: OnePostComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
